// Schema: { _id: int, name: string, completed: bool }
import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const getTodos = async () => {
	const db = await _getDb()
	return await db.collection("todos").find().toArray()
}

const addTodo = async (todoName) => {
	const newTodo = {
		name: todoName,
		completed: false,
	}

	const db = await _getDb()
	return await db.collection("todos").insertOne(newTodo)
}

const toggleTodo = async (todoId) => {
	const db = await _getDb()
	console.log(todoId)
	console.log(typeof todoId)
	const todo = await db.collection("todos").findOne({ _id: new ObjectId(todoId) })
	return await db
		.collection("todos")
		.updateOne({ _id: new ObjectId(todoId) }, { $set: { completed: !todo.completed } })
}

const deleteTodo = async (todoId) => {
	const db = await _getDb()
	return await db.collection("todos").deleteOne({ _id: new ObjectId(todoId) })
}

const _getDb = async () => {
	return mongoose.connection.db
}

const todoDatabase = {
	getTodos,
	addTodo,
	toggleTodo,
	deleteTodo,
}

export default todoDatabase
