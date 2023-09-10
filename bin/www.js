#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app.js"
import debugLib from "debug"
const debug = debugLib("code-stuff:server")
import http from "http"
import dotenv from "dotenv"
import mongoose from "mongoose"

/**
 * Load environment variables from .env file.
 */
if (process.env.NODE_ENV !== "production") {
	dotenv.config()
}

/**
 * Set port of express app.
 */

var port = normalizePort("3000")
app.set("port", port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Initialize database.
 */
const dbURI = `${process.env.MONGO_SERVER}/${process.env.MONGO_DB_NAME}`
mongoose.connect(dbURI, {
	socketTimeoutMS: 5000,
	connectTimeoutMS: 5000,
	serverSelectionTimeoutMS: 5000,
	waitQueueTimeoutMS: 5000,
})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== "listen") {
		throw error
	}

	var bind = typeof port === "string" ? "Pipe " + port : "Port " + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges")
			process.exit(1)
			break
		case "EADDRINUSE":
			console.error(bind + " is already in use")
			process.exit(1)
			break
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address()
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
	debug("Listening on " + bind)
}
