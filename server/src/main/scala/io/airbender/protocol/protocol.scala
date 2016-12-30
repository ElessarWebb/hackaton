package io.airbender

import io.circe._
import io.circe.syntax._
import io.circe.generic._

import io.airbender.model._
import io.airbender.applications._

package protocol {
  @JsonCodec case class Bar(i: Int, s: String)
  sealed trait ClientMessage
  case class KeyPress(keyCode: KeyCode) extends ClientMessage
  case class Identify(username: String) extends ClientMessage

  case class ControlMessage(playerId: String, msg: ClientMessage)

  sealed trait ControlResponse
  case class Identified(playerId: PlayerID) extends ControlResponse
  case class ClientError(message: String) extends ControlResponse
}

package object protocol {
  type KeyCode = String
}
