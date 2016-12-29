package io.airbender

import java.util.UUID

package object commands {
  case class Player(id: UUID, name: String)

  sealed trait Command
  case object Up extends Command
  case object Down extends Command
  case object Left extends Command
  case object Right extends Command

  case class CommandMessage(
    command: Command,
    playerUuid: String
  )
}
