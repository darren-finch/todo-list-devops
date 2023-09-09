// This is a fake database that simulates something like a REST API.
// This is separate from the repository because I want to mock the
// database in my tests so I don't have to wait for the 1 second delay.
// In a real application, you would not have this file and instead
// would have a real database.

// Schema: { id: int, name: string, completed: bool }
const todos = []

// Returns a promise that resolves to the current array of todos
const getTodos = async () => {
	// Add a 1 second delay to simulate a slow database
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(todos)
		}, 1000)
	})
}

// Returns a promise that resolves to the id of the todo that was added if successful
const addTodo = async (todoName) => {
	// Add a 1 second delay to simulate a slow database
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			todos.push({
				id: todos.length + 1,
				name: todoName,
				completed: false,
			})
			resolve(todos.length)
		}, 1000)
	})
}

// Returns a promise that resolves to true if the todo was toggled successfully
const toggleTodo = async (todoId) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const todo = todos.find((todo) => todo.id == todoId)
			todo.completed = !todo.completed

			resolve(true)
		}, 1000)
	})
}

// Returns a promise that resolves to true if the todo was deleted successfully
const deleteTodo = async (todoId) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const todoIndex = todos.findIndex((todo) => todo.id == todoId)
			todos.splice(todoIndex, 1)

			resolve(true)
		}, 1000)
	})
}

const database = {
	getTodos,
	addTodo,
	toggleTodo,
	deleteTodo,
}

export default database
