name := "hackaton-server"

version := "1.0"

scalaVersion := "2.12.1"

val akkaV = "2.4.16"
val akkaHttpV = "10.0.1"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % akkaV,
  "com.typesafe.akka" %% "akka-http-core" % akkaHttpV,
  "com.sksamuel.avro4s" %% "avro4s-core" % "1.6.3"
)
