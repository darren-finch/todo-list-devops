import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"

import indexRouter from "../routes/index.js"

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function injectMiddleware(app) {
	// set up services
	app.use(logger("dev"))
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser())

	// set up static files
	app.use(express.static(path.join(...__dirname.split(path.sep).splice(__dirname.length - 2), "public")))

	// set up routes
	app.use("/", indexRouter)

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		next(createError(404))
	})

	// error handler
	app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get("env") === "development" ? err : {}

		// render the error page
		res.status(err.status || 500)
		res.render("error")
	})
}
