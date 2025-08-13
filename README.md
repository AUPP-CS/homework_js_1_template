# JavaScript Homework 1 - Exercise Instructions

## Exercise 1: Palindrome Function - 1pt

### Objective
Write a function `isPalindrome` that determines whether a given string is a palindrome (reads the same forwards and backwards).

### Requirements
1. **Function signature**: `isPalindrome(str)`
2. **Input**: A string of any length
3. **Output**: Boolean (`true` if palindrome, `false` otherwise)

### Rules
- The function should be **case-insensitive** (e.g., "Racecar" should return `true`)
- The function should **ignore spaces, punctuation, and special characters** (e.g., "A man, a plan, a canal: Panama" should return `true`)
- Only alphanumeric characters (letters and numbers) should be considered
- Empty string should return `true`
- Single character should return `true`

### Examples
```javascript
isPalindrome("racecar")           // → true
isPalindrome("hello")             // → false
isPalindrome("Racecar")           // → true
isPalindrome("A man a plan a canal Panama") // → true
isPalindrome("race a car")        // → false
isPalindrome("Was it a car or a cat I saw") // → true
isPalindrome("")                  // → true
isPalindrome("a")                 // → true
```

### Implementation Tips
1. Convert the string to lowercase
2. Remove all non-alphanumeric characters using regex: `/[^a-z0-9]/g`
3. Compare the cleaned string with its reverse

---

## Exercise 2: FizzBuzz Function - 1pt

### Objective
Write a function `fizzbuzz` that generates a FizzBuzz sequence for a given range of numbers.

### Requirements
1. **Function signature**: `fizzbuzz(start, end)`
2. **Input**: Two integers representing the start and end of the range (inclusive)
3. **Output**: Array containing the FizzBuzz sequence

### Rules
- For numbers divisible by **3**: return `"fizz"`
- For numbers divisible by **5**: return `"buzz"`
- For numbers divisible by **both 3 and 5**: return `"fizzbuzz"`
- For all other numbers: return the **number itself**
- The range is **inclusive** (includes both start and end)
- If `start > end`, return an empty array

### Examples
```javascript
fizzbuzz(1, 15)
// → [1, 2, "fizz", 4, "buzz", "fizz", 7, 8, "fizz", "buzz", 11, "fizz", 13, 14, "fizzbuzz"]

fizzbuzz(10, 15)
// → ["buzz", 11, "fizz", 13, 14, "fizzbuzz"]

fizzbuzz(3, 3)
// → ["fizz"]

fizzbuzz(15, 15)
// → ["fizzbuzz"]

fizzbuzz(5, 3)
// → []
```

### Implementation Tips
1. Create an empty result array
2. Loop from `start` to `end` (inclusive)
3. For each number, check divisibility in the correct order:
   - First check if divisible by both 3 and 5 (15)
   - Then check if divisible by 3
   - Then check if divisible by 5
   - Otherwise, use the number itself
4. Push the result to the array

---

## Exercise 3: Create Person Function - 2pts

### Objective
Write a function `createPerson` that creates a person object with input validation.

### Requirements
1. **Function signature**: `createPerson(name, age)`
2. **Input**: name (string), age (number)
3. **Output**: Person object with properties and methods, or `null` if invalid input

### Rules
- **name** must be a non-empty string (after trimming whitespace)
- **age** must be a non-negative integer (whole number ≥ 0)
- Return `null` for any invalid input
- Automatically trim whitespace from name
- Person object should have: `name`, `age`, and `introduce()` method
- `introduce()` method should return: `"Hi, I'm [name] and I'm [age] years old."`

### Examples
```javascript
createPerson("John", 25)
// → { name: "John", age: 25, introduce: function }

createPerson("  Alice  ", 30).name  // → "Alice" (trimmed)
createPerson("Alice", 30).introduce()  // → "Hi, I'm Alice and I'm 30 years old."

// Invalid inputs return null:
createPerson("", 25)        // → null (empty name)
createPerson("John", -5)    // → null (negative age)
createPerson("John", 25.5)  // → null (non-integer age)
createPerson(123, 25)       // → null (name not string)
```

### Implementation Tips
1. Validate inputs first - check type and constraints
2. Return `null` immediately if any input is invalid
3. Trim the name using `name.trim()`
4. Use `Number.isInteger()` to check for whole numbers
5. Create object with `name`, `age`, and `introduce` properties
6. Use `this.name` and `this.age` in the introduce method

---

## Exercise 4: Create Playlist Function - 2pts

### Objective
Write a function `createPlaylist` that creates a playlist object with song management capabilities.

### Requirements
1. **Function signature**: `createPlaylist(name)`
2. **Input**: name (string)
3. **Output**: Playlist object with properties and methods, or `null` if invalid input

### Rules
- **name** must be a non-empty string (after trimming whitespace)
- Return `null` for any invalid input
- Automatically trim whitespace from name
- Playlist object should have: `name`, `songs` (array), `addSong()` method, `getSongCount()` method
- `addSong(song)` should add valid songs to the songs array and return `true`/`false`
- `getSongCount()` should return the number of songs in the playlist
- Only non-empty string songs should be added (after trimming)
- Songs should be trimmed before adding to the array
- Duplicate song names are allowed

### Examples
```javascript
const playlist = createPlaylist("My Playlist");
// → { name: "My Playlist", songs: [], addSong: function, getSongCount: function }

playlist.addSong("Song 1");     // → true (song added)
playlist.addSong("Song 2");     // → true (song added)
playlist.addSong("");           // → false (empty song not added)
playlist.addSong(123);          // → false (non-string not added)

playlist.getSongCount();        // → 2
playlist.songs;                 // → ["Song 1", "Song 2"]

// Invalid inputs return null:
createPlaylist("");             // → null (empty name)
createPlaylist("   ");          // → null (whitespace-only name)
createPlaylist(123);            // → null (name not string)
```

### Implementation Tips
1. Validate input - name must be non-empty string after trimming
2. Return `null` immediately if input is invalid
3. Trim the name using `name.trim()`
4. Initialize `songs` as an empty array `[]`
5. In `addSong()`, validate song is non-empty string, trim it, and push to songs array
6. `getSongCount()` should return `this.songs.length`
7. Return `true` from `addSong()` if song was added, `false` otherwise

---

## Exercise 5: Create Task Manager Function (Async) - 4pts

### Objective
Write an async function `createTaskManager` that creates a task manager object with validation using Promises.

### Requirements
1. **Function signature**: `createTaskManager(name)`
2. **Input**: name (string)
3. **Output**: Promise that resolves to TaskManager object or rejects with Error

### Rules
- **name** must be a non-empty string (after trimming whitespace)
- Function should return a Promise
- Promise should **reject** with Error for invalid input
- Promise should **resolve** with TaskManager object for valid input
- Simulate async validation with 100ms delay using `setTimeout`
- TaskManager object should have: `name`, `tasks` (array), `addTask()` method, `getTasks()` method
- `addTask(task)` should add valid tasks and return `true`/`false`
- `getTasks()` should return a **copy** of tasks array (to prevent external mutation)
- Only non-empty string tasks should be added (after trimming)
- Tasks should be trimmed before adding to the array

### Examples
```javascript
// Valid usage with async/await
const taskManager = await createTaskManager("My Tasks");
// → { name: "My Tasks", tasks: [], addTask: function, getTasks: function }

taskManager.addTask("Task 1");      // → true (task added)
taskManager.addTask("Task 2");      // → true (task added)
taskManager.addTask("");           // → false (empty task not added)

taskManager.getTasks();            // → ["Task 1", "Task 2"] (returns copy)

// Invalid inputs reject the Promise
await createTaskManager("");        // → Promise rejects with Error
await createTaskManager(123);       // → Promise rejects with Error

// Using .then/.catch
createTaskManager("Valid Name")
  .then(taskManager => { /* use taskManager */ })
  .catch(error => { /* handle error */ });
```

### Implementation Tips
1. Return a new Promise that takes `(resolve, reject)` parameters
2. Use `setTimeout(() => { ... }, 100)` to simulate async behavior
3. Inside setTimeout, validate input - name must be non-empty string after trimming
4. Call `reject(new Error('Invalid name: must be a non-empty string'))` for invalid input
5. **Important**: Add `return;` after rejecting to prevent further execution
6. Call `resolve()` with the TaskManager object for valid input
7. In `getTasks()`, use spread operator `[...this.tasks]` to return a copy

---

## File Structure
Your project should have the following structure:
```
hw_js_1/
├── 1_palindrom.js              # Palindrome function implementation
├── 1_palindrom.test.js         # Palindrome tests
├── 2_fizzbuzz.js              # FizzBuzz function implementation
├── 2_fizzbuzz.test.js         # FizzBuzz tests
├── 3_createPerson.js          # CreatePerson function implementation
├── 3_createPerson.test.js     # CreatePerson tests
├── 4_createPlaylist.js        # CreatePlaylist function implementation
├── 4_createPlaylist.test.js   # CreatePlaylist tests
├── 5_createTaskManager.js     # CreateTaskManager function implementation (async)
├── 5_createTaskManager.test.js # CreateTaskManager tests
├── package.json               # NPM configuration
└── README.md                 # This file
```

## Testing
All functions should be thoroughly tested using Jest:

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npx jest 1_palindrom.test.js
npx jest 2_fizzbuzz.test.js
npx jest 3_createPerson.test.js
npx jest 4_createPlaylist.test.js
npx jest 5_createTaskManager.test.js

# Run tests with verbose output
npx jest --verbose

# Run tests in watch mode (for development)
npx jest --watch
```

### Test Coverage Expected
Each function should be tested for:
- **Basic functionality**: Normal expected cases
- **Edge cases**: Empty inputs, single values, boundary conditions
- **Invalid inputs**: Wrong types, out-of-range values
- **Type validation**: Ensuring correct return types
- **Object structure**: For object-creating functions, verify properties and methods
- **Method functionality**: Test all object methods work correctly
- **Input validation**: Test that invalid inputs are properly rejected
- **Async behavior**: For createTaskManager, test Promise resolution/rejection and timing

## Submission Requirements
1. All functions must be properly exported using `module.exports`
2. All tests must pass (should see "120 passed" when running all tests)
3. Code should be clean, readable, and well-commented
4. Follow JavaScript best practices and conventions
5. Include proper input validation where specified
6. Object methods should work correctly and maintain proper context
7. Async function should properly handle Promise resolution and rejection


## Getting Started
1. Initialize your project: `npm init -y`
2. Install Jest: `npm install --save-dev jest`
3. Update package.json test script: `"test": "jest"`
4. Implement the functions according to specifications
5. Write comprehensive tests
6. Run tests to ensure everything works: `npm test`
