import express from "express"
import path from "path"
import injectMiddleware from "./src/middleware/index.js"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "./src/views"))
app.set("view engine", "pug")

// inject middleware
injectMiddleware(app)

export default app
