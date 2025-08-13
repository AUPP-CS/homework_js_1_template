const createTaskManager = require('./5_createTaskManager');

describe('createTaskManager', () => {
  describe('Valid task manager creation', () => {
    test('should create task manager with valid name', async () => {
      const taskManager = await createTaskManager('My Tasks');
      
      expect(taskManager).toBeDefined();
      expect(taskManager.name).toBe('My Tasks');
      expect(Array.isArray(taskManager.tasks)).toBe(true);
      expect(taskManager.tasks).toHaveLength(0);
      expect(typeof taskManager.addTask).toBe('function');
      expect(typeof taskManager.getTasks).toBe('function');
    });

    test('should create task manager with different valid names', async () => {
      const taskManager1 = await createTaskManager('Work Tasks');
      const taskManager2 = await createTaskManager('Personal Tasks');
      const taskManager3 = await createTaskManager('Project Alpha');
      
      expect(taskManager1.name).toBe('Work Tasks');
      expect(taskManager2.name).toBe('Personal Tasks');
      expect(taskManager3.name).toBe('Project Alpha');
      
      // All should have empty tasks arrays initially
      expect(taskManager1.tasks).toHaveLength(0);
      expect(taskManager2.tasks).toHaveLength(0);
      expect(taskManager3.tasks).toHaveLength(0);
    });

    test('should trim whitespace from task manager name', async () => {
      const taskManager1 = await createTaskManager('  My Tasks  ');
      const taskManager2 = await createTaskManager('Work Tasks   ');
      const taskManager3 = await createTaskManager('   Personal');
      
      expect(taskManager1.name).toBe('My Tasks');
      expect(taskManager2.name).toBe('Work Tasks');
      expect(taskManager3.name).toBe('Personal');
    });

    test('should have async behavior with delay', async () => {
      const start = Date.now();
      const taskManager = await createTaskManager('Timed Test');
      const end = Date.now();
      
      expect(taskManager).toBeDefined();
      expect(end - start).toBeGreaterThanOrEqual(90); // Allow some tolerance
      expect(end - start).toBeLessThan(200); // But not too long
    });
  });

  describe('Promise behavior', () => {
    test('should return a Promise', () => {
      const result = createTaskManager('Test');
      expect(result).toBeInstanceOf(Promise);
    });

    test('should resolve Promise for valid input', async () => {
      await expect(createTaskManager('Valid Name')).resolves.toBeDefined();
    });

    test('should reject Promise for invalid inputs', async () => {
      await expect(createTaskManager('')).rejects.toThrow();
      await expect(createTaskManager('   ')).rejects.toThrow();
      await expect(createTaskManager(123)).rejects.toThrow();
      await expect(createTaskManager(null)).rejects.toThrow();
      await expect(createTaskManager(undefined)).rejects.toThrow();
    });

    test('should reject with proper Error message', async () => {
      await expect(createTaskManager('')).rejects.toThrow('Invalid name: must be a non-empty string');
      await expect(createTaskManager(123)).rejects.toThrow('Invalid name: must be a non-empty string');
    });
  });

  describe('Object structure validation', () => {
    test('should have correct object structure', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager).toHaveProperty('name');
      expect(taskManager).toHaveProperty('tasks');
      expect(taskManager).toHaveProperty('addTask');
      expect(taskManager).toHaveProperty('getTasks');
      
      expect(typeof taskManager.name).toBe('string');
      expect(Array.isArray(taskManager.tasks)).toBe(true);
      expect(typeof taskManager.addTask).toBe('function');
      expect(typeof taskManager.getTasks).toBe('function');
    });

    test('should not have extra properties', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      const keys = Object.keys(taskManager);
      
      expect(keys).toHaveLength(4);
      expect(keys).toContain('name');
      expect(keys).toContain('tasks');
      expect(keys).toContain('addTask');
      expect(keys).toContain('getTasks');
    });
  });

  describe('addTask method', () => {
    test('should add valid tasks and return true', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager.addTask('Task 1')).toBe(true);
      expect(taskManager.addTask('Task 2')).toBe(true);
      expect(taskManager.addTask('Task 3')).toBe(true);
      
      expect(taskManager.tasks).toHaveLength(3);
      expect(taskManager.tasks).toContain('Task 1');
      expect(taskManager.tasks).toContain('Task 2');
      expect(taskManager.tasks).toContain('Task 3');
    });

    test('should maintain task order', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      taskManager.addTask('First Task');
      taskManager.addTask('Second Task');
      taskManager.addTask('Third Task');
      
      expect(taskManager.tasks[0]).toBe('First Task');
      expect(taskManager.tasks[1]).toBe('Second Task');
      expect(taskManager.tasks[2]).toBe('Third Task');
    });

    test('should trim whitespace from tasks', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      taskManager.addTask('  Task 1  ');
      taskManager.addTask('Task 2   ');
      taskManager.addTask('   Task 3');
      
      expect(taskManager.tasks[0]).toBe('Task 1');
      expect(taskManager.tasks[1]).toBe('Task 2');
      expect(taskManager.tasks[2]).toBe('Task 3');
    });

    test('should allow duplicate task names', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager.addTask('Important Task')).toBe(true);
      expect(taskManager.addTask('Important Task')).toBe(true);
      
      expect(taskManager.tasks).toHaveLength(2);
      expect(taskManager.tasks[0]).toBe('Important Task');
      expect(taskManager.tasks[1]).toBe('Important Task');
    });

    test('should reject empty string tasks', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager.addTask('')).toBe(false);
      expect(taskManager.tasks).toHaveLength(0);
    });

    test('should reject whitespace-only tasks', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager.addTask('   ')).toBe(false);
      expect(taskManager.addTask('\t')).toBe(false);
      expect(taskManager.addTask('\n')).toBe(false);
      expect(taskManager.addTask(' \t \n ')).toBe(false);
      
      expect(taskManager.tasks).toHaveLength(0);
    });

    test('should reject non-string tasks', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager.addTask(123)).toBe(false);
      expect(taskManager.addTask(null)).toBe(false);
      expect(taskManager.addTask(undefined)).toBe(false);
      expect(taskManager.addTask([])).toBe(false);
      expect(taskManager.addTask({})).toBe(false);
      expect(taskManager.addTask(true)).toBe(false);
      
      expect(taskManager.tasks).toHaveLength(0);
    });
  });

  describe('getTasks method', () => {
    test('should return empty array for new task manager', async () => {
      const taskManager = await createTaskManager('Empty Tasks');
      const tasks = taskManager.getTasks();
      
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks).toHaveLength(0);
    });

    test('should return copy of tasks array', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      taskManager.addTask('Task 1');
      taskManager.addTask('Task 2');
      
      const tasks = taskManager.getTasks();
      expect(tasks).toEqual(['Task 1', 'Task 2']);
      expect(tasks).not.toBe(taskManager.tasks); // Should be a different array instance
    });

    test('should prevent external mutation of tasks', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      taskManager.addTask('Original Task');
      
      const tasks = taskManager.getTasks();
      tasks.push('External Task'); // Try to mutate the returned array
      
      // Original tasks array should be unchanged
      expect(taskManager.tasks).toEqual(['Original Task']);
      expect(taskManager.getTasks()).toEqual(['Original Task']);
    });

    test('should return updated tasks after additions', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager.getTasks()).toHaveLength(0);
      
      taskManager.addTask('Task 1');
      expect(taskManager.getTasks()).toEqual(['Task 1']);
      
      taskManager.addTask('Task 2');
      expect(taskManager.getTasks()).toEqual(['Task 1', 'Task 2']);
      
      taskManager.addTask('Task 3');
      expect(taskManager.getTasks()).toEqual(['Task 1', 'Task 2', 'Task 3']);
    });
  });

  describe('Invalid task manager creation', () => {
    test('should reject empty string name', async () => {
      await expect(createTaskManager('')).rejects.toThrow();
    });

    test('should reject whitespace-only name', async () => {
      await expect(createTaskManager('   ')).rejects.toThrow();
      await expect(createTaskManager('\t')).rejects.toThrow();
      await expect(createTaskManager('\n')).rejects.toThrow();
      await expect(createTaskManager(' \t \n ')).rejects.toThrow();
    });

    test('should reject non-string name', async () => {
      await expect(createTaskManager(123)).rejects.toThrow();
      await expect(createTaskManager(null)).rejects.toThrow();
      await expect(createTaskManager(undefined)).rejects.toThrow();
      await expect(createTaskManager([])).rejects.toThrow();
      await expect(createTaskManager({})).rejects.toThrow();
      await expect(createTaskManager(true)).rejects.toThrow();
    });
  });

  describe('Edge cases', () => {
    test('should handle very long task manager names', async () => {
      const longName = 'A'.repeat(100);
      const taskManager = await createTaskManager(longName);
      
      expect(taskManager).toBeDefined();
      expect(taskManager.name).toBe(longName);
      expect(taskManager.name).toHaveLength(100);
    });

    test('should handle single character names', async () => {
      const taskManager = await createTaskManager('A');
      expect(taskManager).toBeDefined();
      expect(taskManager.name).toBe('A');
    });

    test('should handle names with special characters', async () => {
      const taskManager1 = await createTaskManager("Work & Personal");
      const taskManager2 = await createTaskManager('Project-X');
      const taskManager3 = await createTaskManager('Tasks (Important)');
      
      expect(taskManager1).toBeDefined();
      expect(taskManager1.name).toBe("Work & Personal");
      expect(taskManager2).toBeDefined();
      expect(taskManager2.name).toBe('Project-X');
      expect(taskManager3).toBeDefined();
      expect(taskManager3.name).toBe('Tasks (Important)');
    });

    test('should handle very long task names', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      const longTask = 'B'.repeat(200);
      
      expect(taskManager.addTask(longTask)).toBe(true);
      expect(taskManager.tasks[0]).toBe(longTask);
      expect(taskManager.tasks[0]).toHaveLength(200);
    });

    test('should handle tasks with special characters', async () => {
      const taskManager = await createTaskManager('Test Tasks');
      
      expect(taskManager.addTask("Don't forget to call")).toBe(true);
      expect(taskManager.addTask('Review & approve')).toBe(true);
      expect(taskManager.addTask('Task #1')).toBe(true);
      
      const tasks = taskManager.getTasks();
      expect(tasks).toContain("Don't forget to call");
      expect(tasks).toContain('Review & approve');
      expect(tasks).toContain('Task #1');
    });
  });

  describe('Method integration and async behavior', () => {
    test('should work correctly with mixed valid and invalid operations', async () => {
      const taskManager = await createTaskManager('Mixed Test');
      
      expect(taskManager.addTask('Task 1')).toBe(true);
      expect(taskManager.getTasks()).toHaveLength(1);
      
      expect(taskManager.addTask('')).toBe(false);  // Invalid
      expect(taskManager.getTasks()).toHaveLength(1);   // Should remain 1
      
      expect(taskManager.addTask('Task 2')).toBe(true);
      expect(taskManager.getTasks()).toHaveLength(2);
      
      expect(taskManager.addTask(null)).toBe(false);  // Invalid
      expect(taskManager.getTasks()).toHaveLength(2);     // Should remain 2
      
      expect(taskManager.getTasks()).toEqual(['Task 1', 'Task 2']);
    });

    test('should maintain state across multiple async operations', async () => {
      const taskManager1 = await createTaskManager('Manager 1');
      const taskManager2 = await createTaskManager('Manager 2');
      
      taskManager1.addTask('Task A');
      taskManager2.addTask('Task X');
      
      expect(taskManager1.getTasks()).toEqual(['Task A']);
      expect(taskManager2.getTasks()).toEqual(['Task X']);
      
      // Each manager should maintain its own state
      expect(taskManager1.name).toBe('Manager 1');
      expect(taskManager2.name).toBe('Manager 2');
    });

    test('should handle concurrent creation', async () => {
      const promises = [
        createTaskManager('Manager A'),
        createTaskManager('Manager B'),
        createTaskManager('Manager C')
      ];
      
      const taskManagers = await Promise.all(promises);
      
      expect(taskManagers).toHaveLength(3);
      expect(taskManagers[0].name).toBe('Manager A');
      expect(taskManagers[1].name).toBe('Manager B');
      expect(taskManagers[2].name).toBe('Manager C');
    });
  });

  describe('Method context and binding', () => {
    test('should maintain correct this context for methods', async () => {
      const taskManager = await createTaskManager('Context Test');
      
      // Test that methods work when called directly
      expect(taskManager.getTasks()).toHaveLength(0);
      
      taskManager.addTask('Test Task');
      expect(taskManager.getTasks()).toHaveLength(1);
      
      // Test context preservation with method references
      const addTaskRef = taskManager.addTask;
      const getTasksRef = taskManager.getTasks;
      
      expect(() => addTaskRef.call(taskManager, 'Another Task')).not.toThrow();
      expect(() => getTasksRef.call(taskManager)).not.toThrow();
      
      expect(addTaskRef.call(taskManager, 'Third Task')).toBe(true);
      expect(getTasksRef.call(taskManager)).toHaveLength(3);
    });
  });
});
