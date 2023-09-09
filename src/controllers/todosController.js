import asyncHandler from "express-async-handler"

import todoRepository from "../services/todoRepository.js"

const index = asyncHandler(async (req, res, next) => {
	const todos = await todoRepository.getTodos()
	res.render("index", { title: "Todos", todos: todos })
})

const addTodo = asyncHandler(async (req, res, next) => {
	const todoName = req.body.todoName
	await todoRepository.addTodo(todoName)
	res.redirect("/")
})

const toggleTodo = asyncHandler(async (req, res, next) => {
	const todoId = req.params.id
	await todoRepository.toggleTodo(todoId)
	res.redirect("/")
})

const deleteTodo = asyncHandler(async (req, res, next) => {
	const todoId = req.params.id
	await todoRepository.deleteTodo(todoId)
	res.redirect("/")
})

const controller = {
	index,
	addTodo,
	toggleTodo,
	deleteTodo,
}

export default controller
