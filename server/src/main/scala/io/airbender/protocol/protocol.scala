package io.airbender

import io.circe._
import io.circe.syntax._
import io.circe.generic._

import io.airbender.model._
import io.airbender.applications._

package protocol {
  @JsonCodec sealed trait ClientMessage
  case class KeyPress(keyCode: KeyCode) extends ClientMessage
  case class Identify(username: PlayerID) extends ClientMessage
  object ClientMessage

  @JsonCodec case class ControlMessage(playerId: String, msg: ClientMessage)

  @JsonCodec sealed trait ControlResponse
  case class Identified(playerId: PlayerID) extends ControlResponse
  case class ClientError(message: String) extends ControlResponse
  object ControlResponse
}

package object protocol {
  type KeyCode = String
}
