package io.airbender

import java.util.UUID

package object protocol {
  type KeyCode = String
  type PlayerId = String

  case class Player(id: UUID, nickname: String)

  sealed trait ControlMessage
  case class KeyPress(keyCode: KeyCode) extends ControlMessage
  case class Identify(username: String) extends ControlMessage

  object ControlMessage

  sealed trait ControlResponse
  case class Identified(playerId: PlayerId) extends ControlResponse
  case class ControlFailure(message: String) extends ControlResponse
}
