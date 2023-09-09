import express from "express"
var router = express.Router()

import todosController from "../controllers/todosController.js"

router.get("/", todosController.index)
router.post("/addTodo", todosController.addTodo)
router.post("/toggleTodo/:id", todosController.toggleTodo)
router.post("/deleteTodo/:id", todosController.deleteTodo)

export default router
