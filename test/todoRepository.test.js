import { jest } from "@jest/globals"

jest.unstable_mockModule("../src/data/todoDatabase", () => {
	return {
		getTodos: jest.fn(),
		addTodo: jest.fn(),
		toggleTodo: jest.fn(),
		deleteTodo: jest.fn(),
	}
})

const SUT = (await import("../src/services/todoRepository")).default
const database = (await import("../src/data/todoDatabase")).default

beforeEach(() => {
	jest.clearAllMocks()
})

test("getTodos returns all todos", () => {
	// Arrange
	const todos = [
		{
			id: 1,
			name: "Todo 1",
			completed: false,
		},
		{
			id: 2,
			name: "Todo 2",
			completed: false,
		},
	]
	database.getTodos.mockResolvedValue(todos)

	// Act
	SUT.getTodos().then((result) => {
		// Assert
		expect(result).toEqual(todos)
	})
})

test("addTodo, given a non-empty todo name, returns the id of the new todo from the database", () => {
	// Arrange
	const todoName = "Todo 1"
	const todoId = 1
	database.addTodo.mockResolvedValue(todoId)

	// Act
	SUT.addTodo(todoName).then((result) => {
		// Assert
		expect(result).toEqual(todoId)
		expect(database.addTodo).toHaveBeenCalledWith(todoName)
		expect(database.addTodo).toHaveBeenCalledTimes(1)
	})
})

test("addTodo, given an empty todo name, throws an error", () => {
	// Arrange
	const todoName = ""

	// Act
	SUT.addTodo(todoName).catch((error) => {
		// Assert
		expect(error.message).toEqual("Todo name is required")
		// expect(database.addTodo).not.toHaveBeenCalled()
	})
})

test("toggleTodo, given a todo id, toggles the todo and returns whether the database operation was successful", () => {
	// Arrange
	const todoId = 1
	database.toggleTodo.mockResolvedValue(true)

	// Act
	SUT.toggleTodo(todoId).then((result) => {
		// Assert
		expect(result).toEqual(true)
		expect(database.toggleTodo).toHaveBeenCalledWith(todoId)
		expect(database.toggleTodo).toHaveBeenCalledTimes(1)
	})
})

test("deleteTodo, given a todo id, deletes the todo and returns whether the database operation was successful", () => {
	// Arrange
	const todoId = 1
	database.deleteTodo.mockResolvedValue(true)

	// Act
	SUT.deleteTodo(todoId).then((result) => {
		// Assert
		expect(result).toEqual(true)
		expect(database.deleteTodo).toHaveBeenCalledWith(todoId)
		expect(database.deleteTodo).toHaveBeenCalledTimes(1)
	})
})
