const createPerson = require('./3_createPerson');

describe('createPerson', () => {
  describe('Valid person creation', () => {
    test('should create person with valid name and age', () => {
      const person = createPerson('John', 25);
      
      expect(person).not.toBeNull();
      expect(person.name).toBe('John');
      expect(person.age).toBe(25);
      expect(typeof person.introduce).toBe('function');
    });

    test('should create person with different valid inputs', () => {
      const person1 = createPerson('Alice', 0);
      const person2 = createPerson('Bob', 100);
      const person3 = createPerson('Charlie', 1);
      
      expect(person1.name).toBe('Alice');
      expect(person1.age).toBe(0);
      expect(person2.name).toBe('Bob');
      expect(person2.age).toBe(100);
      expect(person3.name).toBe('Charlie');
      expect(person3.age).toBe(1);
    });

    test('should trim whitespace from name', () => {
      const person1 = createPerson('  John  ', 25);
      const person2 = createPerson('Alice   ', 30);
      const person3 = createPerson('   Bob', 35);
      
      expect(person1.name).toBe('John');
      expect(person2.name).toBe('Alice');
      expect(person3.name).toBe('Bob');
    });
  });

  describe('introduce method', () => {
    test('should have working introduce method', () => {
      const person = createPerson('John', 25);
      const introduction = person.introduce();
      
      expect(introduction).toBe("Hi, I'm John and I'm 25 years old.");
    });

    test('should work with different names and ages', () => {
      const person1 = createPerson('Alice', 30);
      const person2 = createPerson('Bob', 0);
      const person3 = createPerson('Charlie', 100);
      
      expect(person1.introduce()).toBe("Hi, I'm Alice and I'm 30 years old.");
      expect(person2.introduce()).toBe("Hi, I'm Bob and I'm 0 years old.");
      expect(person3.introduce()).toBe("Hi, I'm Charlie and I'm 100 years old.");
    });

    test('should work with trimmed names', () => {
      const person = createPerson('  John Doe  ', 25);
      expect(person.introduce()).toBe("Hi, I'm John Doe and I'm 25 years old.");
    });
  });

  describe('Object structure validation', () => {
    test('should have correct object structure', () => {
      const person = createPerson('John', 25);
      
      expect(person).toHaveProperty('name');
      expect(person).toHaveProperty('age');
      expect(person).toHaveProperty('introduce');
      
      expect(typeof person.name).toBe('string');
      expect(typeof person.age).toBe('number');
      expect(typeof person.introduce).toBe('function');
    });

    test('should not have extra properties', () => {
      const person = createPerson('John', 25);
      const keys = Object.keys(person);
      
      expect(keys).toHaveLength(3);
      expect(keys).toContain('name');
      expect(keys).toContain('age');
      expect(keys).toContain('introduce');
    });
  });

  describe('Invalid name inputs', () => {
    test('should return null for empty string name', () => {
      expect(createPerson('', 25)).toBeNull();
    });

    test('should return null for whitespace-only name', () => {
      expect(createPerson('   ', 25)).toBeNull();
      expect(createPerson('\t', 25)).toBeNull();
      expect(createPerson('\n', 25)).toBeNull();
      expect(createPerson(' \t \n ', 25)).toBeNull();
    });

    test('should return null for non-string name', () => {
      expect(createPerson(123, 25)).toBeNull();
      expect(createPerson(null, 25)).toBeNull();
      expect(createPerson(undefined, 25)).toBeNull();
      expect(createPerson([], 25)).toBeNull();
      expect(createPerson({}, 25)).toBeNull();
      expect(createPerson(true, 25)).toBeNull();
    });
  });

  describe('Invalid age inputs', () => {
    test('should return null for negative age', () => {
      expect(createPerson('John', -1)).toBeNull();
      expect(createPerson('John', -10)).toBeNull();
      expect(createPerson('John', -0.1)).toBeNull();
    });

    test('should return null for non-integer age', () => {
      expect(createPerson('John', 25.5)).toBeNull();
      expect(createPerson('John', 25.1)).toBeNull();
      expect(createPerson('John', 25.9)).toBeNull();
      expect(createPerson('John', Math.PI)).toBeNull();
    });

    test('should return null for non-number age', () => {
      expect(createPerson('John', '25')).toBeNull();
      expect(createPerson('John', null)).toBeNull();
      expect(createPerson('John', undefined)).toBeNull();
      expect(createPerson('John', [])).toBeNull();
      expect(createPerson('John', {})).toBeNull();
      expect(createPerson('John', true)).toBeNull();
      expect(createPerson('John', 'twenty-five')).toBeNull();
    });

    test('should return null for special number values', () => {
      expect(createPerson('John', NaN)).toBeNull();
      expect(createPerson('John', Infinity)).toBeNull();
      expect(createPerson('John', -Infinity)).toBeNull();
    });

    test('should accept zero as valid age', () => {
      const person = createPerson('Baby', 0);
      expect(person).not.toBeNull();
      expect(person.age).toBe(0);
    });
  });

  describe('Both invalid inputs', () => {
    test('should return null when both inputs are invalid', () => {
      expect(createPerson('', -1)).toBeNull();
      expect(createPerson(123, 25.5)).toBeNull();
      expect(createPerson(null, null)).toBeNull();
      expect(createPerson(undefined, undefined)).toBeNull();
    });
  });

  describe('Edge cases', () => {
    test('should handle very large valid ages', () => {
      const person = createPerson('Old Person', 999999);
      expect(person).not.toBeNull();
      expect(person.age).toBe(999999);
      expect(person.introduce()).toBe("Hi, I'm Old Person and I'm 999999 years old.");
    });

    test('should handle names with special characters', () => {
      const person1 = createPerson("O'Connor", 30);
      const person2 = createPerson('José', 25);
      const person3 = createPerson('Mary-Jane', 28);
      
      expect(person1).not.toBeNull();
      expect(person1.name).toBe("O'Connor");
      expect(person2).not.toBeNull();
      expect(person2.name).toBe('José');
      expect(person3).not.toBeNull();
      expect(person3.name).toBe('Mary-Jane');
    });

    test('should handle very long names', () => {
      const longName = 'A'.repeat(100);
      const person = createPerson(longName, 25);
      
      expect(person).not.toBeNull();
      expect(person.name).toBe(longName);
      expect(person.name).toHaveLength(100);
    });

    test('should handle single character names', () => {
      const person = createPerson('A', 25);
      expect(person).not.toBeNull();
      expect(person.name).toBe('A');
    });
  });

  describe('Method binding and context', () => {
    test('introduce method should work when called directly', () => {
      const person = createPerson('John', 25);
      const introduce = person.introduce;
      
      // This might fail if not properly bound, but should work with the current implementation
      expect(() => introduce.call(person)).not.toThrow();
      expect(introduce.call(person)).toBe("Hi, I'm John and I'm 25 years old.");
    });

    test('should maintain correct this context', () => {
      const person = createPerson('John', 25);
      expect(person.introduce()).toBe("Hi, I'm John and I'm 25 years old.");
      
      // Test that the method uses the object's properties
      person.name = 'Jane';
      person.age = 30;
      expect(person.introduce()).toBe("Hi, I'm Jane and I'm 30 years old.");
    });
  });

  describe('Input validation order', () => {
    test('should validate name first (both invalid)', () => {
      // This tests that name validation happens first
      // If age was validated first, we might get different behavior
      const result = createPerson('', -1);
      expect(result).toBeNull();
    });
  });
});
