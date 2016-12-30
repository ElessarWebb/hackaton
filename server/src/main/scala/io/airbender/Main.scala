package io.airbender

import akka.NotUsed
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.ws.{ BinaryMessage, Message, TextMessage, UpgradeToWebSocket }
import akka.http.scaladsl.model.{ HttpMethods, HttpRequest, HttpResponse, Uri }
import akka.stream._
import akka.stream.scaladsl._

import scala.io.StdIn

trait ControllerSocketService {

  def controllerService[T](implicit m: Materializer): Flow[Message, Message, NotUsed] =
    Flow[Message]
      .mapConcat {
        // we match but don't actually consume the text message here,
        // rather we simply stream it back as the tail of the response
        // this means we might start sending the response even before the
        // end of the incoming message has been received
        case tm: TextMessage =>
          // ignore binary messages but drain content to avoid the stream being clogged
          tm.textStream.runWith(Sink.ignore)
          // tm.textStream map decode[ControlMessage] runForeach println
          Nil

        case bm: BinaryMessage =>
          // ignore binary messages but drain content to avoid the stream being clogged
          bm.dataStream.runWith(Sink.ignore)
          Nil
      }

  def requestHandler(path: String, service: Flow[Message, Message, NotUsed])
                    (implicit m: Materializer): HttpRequest => HttpResponse = {

    // match websocket requests at path
    case req @ HttpRequest(HttpMethods.GET, Uri.Path(requestPath), _, _, _) if requestPath == path =>
      req.header[UpgradeToWebSocket] match {
        case Some(upgrade) => upgrade.handleMessages(service)
        case None          => HttpResponse(400, entity = "Not a valid websocket request!")
      }

    // 404! for everything else
    case r: HttpRequest =>
      r.discardEntityBytes() // important to drain incoming HTTP Entity stream
      HttpResponse(404, entity = "Unknown resource!")
  }

}

object Main extends App with ControllerSocketService {

  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

  private val interface = "0.0.0.0"
  private val port = 8080

  private val binding =
    Http().bindAndHandleSync(
      requestHandler("/commands", controllerService),
      interface, port
    )

  // message server start
  println(
    s"""Server online at http://$interface:$port/
       |Press RETURN to stop..."
     """.stripMargin)

  // wait for input
  StdIn.readLine()

  // shut it down
  import system.dispatcher
  binding
    .flatMap(_.unbind()) // trigger unbinding from the port
    .onComplete(_ => system.terminate()) // and shutdown when done

}
