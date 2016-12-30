name := "hackaton-server"

version := "1.0"

scalaVersion := "2.11.8"

val akkaV = "2.4.16"
val akkaHttpV = "10.0.1"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % akkaV,
  "com.typesafe.akka" %% "akka-http-core" % akkaHttpV,

  "io.circe" %% "circe-generic" % "0.6.1",
  "io.circe" %% "circe-parser" % "0.6.1"
)


addCompilerPlugin("org.scalamacros" % "paradise" % "2.1.0" cross CrossVersion.full)
