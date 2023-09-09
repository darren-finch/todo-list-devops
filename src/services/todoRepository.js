import database from "../data/todoDatabase.js"

const getTodos = async () => {
	return database.getTodos()
}
const addTodo = async (todoName) => {
	if (!todoName) throw new Error("Todo name is required")

	return database.addTodo(todoName)
}
const toggleTodo = async (todoId) => {
	return database.toggleTodo(todoId)
}
const deleteTodo = async (todoId) => {
	return database.deleteTodo(todoId)
}

const repository = {
	getTodos,
	addTodo,
	toggleTodo,
	deleteTodo,
}

export default repository
