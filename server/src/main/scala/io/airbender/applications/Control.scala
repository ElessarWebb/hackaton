package io.airbender.applications

import akka.actor._

import io.airbender.model._
import io.airbender.protocol._

class Control extends Actor {

  val application: Option[ActorRef] = None

  def receive = {
    case ControlMessage(playerId, msg) => println(s"Received message from $playerId")
  }
}
