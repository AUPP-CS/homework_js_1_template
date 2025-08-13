const { fizzbuzz } = require('./2_fizzbuzz');

describe('fizzbuzz', () => {
  describe('Basic functionality', () => {
    test('should return correct fizzbuzz sequence for 1 to 15', () => {
      const expected = [
        1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 
        11, 'fizz', 13, 14, 'fizzbuzz'
      ];
      expect(fizzbuzz(1, 15)).toEqual(expected);
    });

    test('should return correct fizzbuzz sequence for 1 to 30', () => {
      const result = fizzbuzz(1, 30);
      expect(result).toHaveLength(30);
      expect(result[2]).toBe('fizz');    // 3
      expect(result[4]).toBe('buzz');    // 5
      expect(result[14]).toBe('fizzbuzz'); // 15
      expect(result[29]).toBe('fizzbuzz'); // 30
    });
  });

  describe('Fizz rules (divisible by 3)', () => {
    test('should return "fizz" for numbers divisible by 3 but not 5', () => {
      expect(fizzbuzz(3, 3)).toEqual(['fizz']);
      expect(fizzbuzz(6, 6)).toEqual(['fizz']);
      expect(fizzbuzz(9, 9)).toEqual(['fizz']);
      expect(fizzbuzz(12, 12)).toEqual(['fizz']);
    });

    test('should identify all fizz numbers in a range', () => {
      const result = fizzbuzz(1, 14);
      const fizzPositions = [3, 6, 9, 12]; // 1-indexed positions
      fizzPositions.forEach(pos => {
        expect(result[pos - 1]).toBe('fizz');
      });
    });
  });

  describe('Buzz rules (divisible by 5)', () => {
    test('should return "buzz" for numbers divisible by 5 but not 3', () => {
      expect(fizzbuzz(5, 5)).toEqual(['buzz']);
      expect(fizzbuzz(10, 10)).toEqual(['buzz']);
      expect(fizzbuzz(20, 20)).toEqual(['buzz']);
      expect(fizzbuzz(25, 25)).toEqual(['buzz']);
    });

    test('should identify all buzz numbers in a range', () => {
      const result = fizzbuzz(1, 14);
      const buzzPositions = [5, 10]; // 1-indexed positions
      buzzPositions.forEach(pos => {
        expect(result[pos - 1]).toBe('buzz');
      });
    });
  });

  describe('Fizzbuzz rules (divisible by both 3 and 5)', () => {
    test('should return "fizzbuzz" for numbers divisible by both 3 and 5', () => {
      expect(fizzbuzz(15, 15)).toEqual(['fizzbuzz']);
      expect(fizzbuzz(30, 30)).toEqual(['fizzbuzz']);
      expect(fizzbuzz(45, 45)).toEqual(['fizzbuzz']);
      expect(fizzbuzz(60, 60)).toEqual(['fizzbuzz']);
    });

    test('should prioritize fizzbuzz over fizz or buzz', () => {
      // 15 is divisible by both 3 and 5, should be fizzbuzz, not fizz or buzz
      const result = fizzbuzz(14, 16);
      expect(result[1]).toBe('fizzbuzz'); // position 1 is number 15
    });
  });

  describe('Regular numbers', () => {
    test('should return the number itself when not divisible by 3 or 5', () => {
      expect(fizzbuzz(1, 1)).toEqual([1]);
      expect(fizzbuzz(2, 2)).toEqual([2]);
      expect(fizzbuzz(4, 4)).toEqual([4]);
      expect(fizzbuzz(7, 7)).toEqual([7]);
      expect(fizzbuzz(8, 8)).toEqual([8]);
    });

    test('should handle prime numbers correctly', () => {
      const primes = [2, 7, 11, 13, 17, 19, 23, 29, 31];
      primes.forEach(prime => {
        if (prime % 3 !== 0 && prime % 5 !== 0) {
          expect(fizzbuzz(prime, prime)).toEqual([prime]);
        }
      });
    });
  });

  describe('Different ranges', () => {
    test('should handle single number ranges', () => {
      expect(fizzbuzz(1, 1)).toEqual([1]);
      expect(fizzbuzz(3, 3)).toEqual(['fizz']);
      expect(fizzbuzz(5, 5)).toEqual(['buzz']);
      expect(fizzbuzz(15, 15)).toEqual(['fizzbuzz']);
    });

    test('should handle small ranges', () => {
      expect(fizzbuzz(1, 3)).toEqual([1, 2, 'fizz']);
      expect(fizzbuzz(4, 6)).toEqual([4, 'buzz', 'fizz']);
      expect(fizzbuzz(13, 17)).toEqual([13, 14, 'fizzbuzz', 16, 17]);
    });

    test('should handle ranges not starting from 1', () => {
      expect(fizzbuzz(10, 15)).toEqual(['buzz', 11, 'fizz', 13, 14, 'fizzbuzz']);
      expect(fizzbuzz(20, 25)).toEqual(['buzz', 'fizz', 22, 23, 'fizz', 'buzz']);
    });

    test('should handle larger ranges', () => {
      const result = fizzbuzz(1, 100);
      expect(result).toHaveLength(100);
      
      // Check some specific positions
      expect(result[2]).toBe('fizz');     // 3
      expect(result[4]).toBe('buzz');     // 5
      expect(result[14]).toBe('fizzbuzz'); // 15
      expect(result[29]).toBe('fizzbuzz'); // 30
      expect(result[44]).toBe('fizzbuzz'); // 45
      expect(result[59]).toBe('fizzbuzz'); // 60
      expect(result[99]).toBe('buzz');    // 100
    });
  });

  describe('Edge cases', () => {
    test('should handle when start equals end', () => {
      expect(fizzbuzz(7, 7)).toEqual([7]);
      expect(fizzbuzz(15, 15)).toEqual(['fizzbuzz']);
    });

    test('should handle ranges with negative numbers', () => {
      expect(fizzbuzz(-3, 3)).toEqual(['fizz', -2, -1, 'fizzbuzz', 1, 2, 'fizz']);
      expect(fizzbuzz(-15, -13)).toEqual(['fizzbuzz', -14, -13]);
    });

    test('should handle zero in range', () => {
      expect(fizzbuzz(-2, 2)).toEqual([-2, -1, 'fizzbuzz', 1, 2]);
      expect(fizzbuzz(0, 0)).toEqual(['fizzbuzz']); // 0 is divisible by both 3 and 5
    });

    test('should return empty array when start > end', () => {
      expect(fizzbuzz(5, 3)).toEqual([]);
      expect(fizzbuzz(10, 1)).toEqual([]);
    });
  });

  describe('Type validation', () => {
    test('should maintain correct types in output', () => {
      const result = fizzbuzz(1, 5);
      expect(typeof result[0]).toBe('number');  // 1
      expect(typeof result[1]).toBe('number');  // 2
      expect(typeof result[2]).toBe('string');  // 'fizz'
      expect(typeof result[3]).toBe('number');  // 4
      expect(typeof result[4]).toBe('string');  // 'buzz'
    });

    test('should return array', () => {
      expect(Array.isArray(fizzbuzz(1, 10))).toBe(true);
      expect(Array.isArray(fizzbuzz(5, 3))).toBe(true); // even for empty result
    });
  });

  describe('Performance cases', () => {
    test('should handle moderately large ranges efficiently', () => {
      const start = Date.now();
      const result = fizzbuzz(1, 1000);
      const end = Date.now();
      
      expect(result).toHaveLength(1000);
      expect(end - start).toBeLessThan(100); // Should complete within 100ms
    });
  });
});
