package io.airbender

import akka.NotUsed
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.ws.{ BinaryMessage, Message, TextMessage, UpgradeToWebSocket }
import akka.http.scaladsl.model.{ HttpMethods, HttpRequest, HttpResponse, Uri }
import akka.stream.scaladsl.{ Flow, Sink }
import akka.stream.{ ActorMaterializer, Materializer }

import scala.io.StdIn

object CommandSocketService extends App {
  def commandWebSocketService(implicit m: Materializer): Flow[Message, BinaryMessage, NotUsed] =
    Flow[Message]
      .mapConcat {
        // we match but don't actually consume the text message here,
        // rather we simply stream it back as the tail of the response
        // this means we might start sending the response even before the
        // end of the incoming message has been received
        case bm: BinaryMessage =>
          println("MSG!", bm)
          List(bm)
        case tm: TextMessage =>
          println("Text:", tm)
          // ignore binary messages but drain content to avoid the stream being clogged
          tm.textStream.runWith(Sink.ignore)
          Nil
      }

  def requestHandler(path: String, service: Flow[Message, BinaryMessage, NotUsed])(implicit m: Materializer): HttpRequest => HttpResponse = {
    case req @ HttpRequest(HttpMethods.GET, Uri.Path(requestPath), _, _, _) if requestPath == path =>
      req.header[UpgradeToWebSocket] match {
        case Some(upgrade) => upgrade.handleMessages(service)
        case None          => HttpResponse(400, entity = "Not a valid websocket request!")
      }
    case r: HttpRequest =>
      r.discardEntityBytes() // important to drain incoming HTTP Entity stream
      HttpResponse(404, entity = "Unknown resource!")
  }

  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

  private val interface = "0.0.0.0"
  private val port = 8080
  val bindingFuture =
    Http().bindAndHandleSync(
      requestHandler("/commands", commandWebSocketService),
      interface, port
    )

  println(
    s"""Server online at http://$interface:$port/
       |Press RETURN to stop..."
     """.stripMargin)

  StdIn.readLine()

  import system.dispatcher // for the future transformations
  bindingFuture
    .flatMap(_.unbind()) // trigger unbinding from the port
    .onComplete(_ => system.terminate()) // and shutdown when done
}
