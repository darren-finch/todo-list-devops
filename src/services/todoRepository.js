import todoDatabase from "../data/todoDatabase.js"

const getTodos = async () => {
	return todoDatabase.getTodos()
}
const addTodo = async (todoName) => {
	if (!todoName) throw new Error("Todo name is required")

	return todoDatabase.addTodo(todoName)
}
const toggleTodo = async (todoId) => {
	return todoDatabase.toggleTodo(todoId)
}
const deleteTodo = async (todoId) => {
	return todoDatabase.deleteTodo(todoId)
}

const todoRepository = {
	getTodos,
	addTodo,
	toggleTodo,
	deleteTodo,
}

export default todoRepository
