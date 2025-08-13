/**
 * Exercise 5: Create Task Manager Function (Async)
 * 
 * Objective: Write an async function that creates a task manager object with validation
 * 
 * Requirements:
 * - Function signature: createTaskManager(name)
 * - Input: name (string)
 * - Output: Promise that resolves to TaskManager object or rejects with Error
 * 
 * Rules:
 * - name must be a non-empty string (after trimming)
 * - Function should return a Promise
 * - Promise should reject with Error for invalid input
 * - Promise should resolve with TaskManager object for valid input
 * - Simulate async validation with 100ms delay
 * - TaskManager object should have: name, tasks (array), addTask() method, getTasks() method
 * - addTask(task) should add valid tasks and return true/false
 * - getTasks() should return a copy of tasks array (to prevent external mutation)
 * - Only non-empty string tasks should be added (after trimming)
 * 
 * Examples:
 * await createTaskManager("My Tasks") → { name: "My Tasks", tasks: [], addTask: function, getTasks: function }
 * taskManager.addTask("Task 1") → true
 * taskManager.getTasks() → ["Task 1"] (copy of array)
 * createTaskManager("") → Promise rejects with Error
 * createTaskManager(123) → Promise rejects with Error
 */

function createTaskManager(name) {
}

module.exports = createTaskManager;