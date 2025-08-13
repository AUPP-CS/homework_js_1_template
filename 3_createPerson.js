/**
 * Exercise 3: Create Person Function
 * 
 * Objective: Write a function that creates a person object with validation
 * 
 * Requirements:
 * - Function signature: createPerson(name, age)
 * - Input: name (string), age (number)
 * - Output: Person object with name, age, and introduce method, or null if invalid
 * 
 * Rules:
 * - name must be a non-empty string (after trimming)
 * - age must be a non-negative integer
 * - Return null for any invalid input
 * - Trim whitespace from name
 * - Person object should have: name, age, and introduce() method
 * - introduce() should return: "Hi, I'm [name] and I'm [age] years old."
 * 
 * Examples:
 * createPerson("John", 25) → { name: "John", age: 25, introduce: function }
 * createPerson("  Alice  ", 30) → { name: "Alice", age: 30, introduce: function }
 * createPerson("", 25) → null
 * createPerson("John", -5) → null
 * createPerson("John", 25.5) → null
 * createPerson(123, 25) → null
 */

function createPerson(name, age) {
  
}

module.exports = createPerson;