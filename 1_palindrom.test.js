const { isPalindrome } = require('./1_palindrom');

describe('isPalindrome', () => {
  describe('Basic palindromes', () => {
    test('should return true for simple palindromes', () => {
      expect(isPalindrome('racecar')).toBe(true);
      expect(isPalindrome('level')).toBe(true);
      expect(isPalindrome('mom')).toBe(true);
      expect(isPalindrome('dad')).toBe(true);
      expect(isPalindrome('noon')).toBe(true);
    });
  });

  describe('Non-palindromes', () => {
    test('should return false for non-palindromes', () => {
      expect(isPalindrome('hello')).toBe(false);
      expect(isPalindrome('world')).toBe(false);
      expect(isPalindrome('javascript')).toBe(false);
      expect(isPalindrome('programming')).toBe(false);
    });
  });

  describe('Case insensitive palindromes', () => {
    test('should handle mixed case correctly', () => {
      expect(isPalindrome('Racecar')).toBe(true);
      expect(isPalindrome('MoM')).toBe(true);
      expect(isPalindrome('LeVeL')).toBe(true);
      expect(isPalindrome('RACECAR')).toBe(true);
    });

    test('should return false for mixed case non-palindromes', () => {
      expect(isPalindrome('Hello')).toBe(false);
      expect(isPalindrome('WoRlD')).toBe(false);
    });
  });

  describe('Palindromes with spaces and punctuation', () => {
    test('should ignore spaces and punctuation', () => {
      expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
      expect(isPalindrome('Was it a car or a cat I saw')).toBe(true);
      expect(isPalindrome('Madam, I\'m Adam')).toBe(true);
      expect(isPalindrome('Never odd or even')).toBe(true);
      expect(isPalindrome('Do geese see God?')).toBe(true);
    });

    test('should return false when not palindromes after cleaning', () => {
      expect(isPalindrome('race a car')).toBe(false);
      expect(isPalindrome('hello, world!')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      expect(isPalindrome('')).toBe(true);
    });

    test('should handle single character', () => {
      expect(isPalindrome('a')).toBe(true);
      expect(isPalindrome('A')).toBe(true);
      expect(isPalindrome('1')).toBe(true);
    });

    test('should handle two identical characters', () => {
      expect(isPalindrome('aa')).toBe(true);
      expect(isPalindrome('AA')).toBe(true);
      expect(isPalindrome('11')).toBe(true);
    });

    test('should handle two different characters', () => {
      expect(isPalindrome('ab')).toBe(false);
      expect(isPalindrome('AB')).toBe(false);
      expect(isPalindrome('12')).toBe(false);
    });
  });

  describe('Numbers and mixed alphanumeric', () => {
    test('should handle numeric palindromes', () => {
      expect(isPalindrome('12321')).toBe(true);
      expect(isPalindrome('1001')).toBe(true);
      expect(isPalindrome('7337')).toBe(true);
    });

    test('should handle mixed alphanumeric palindromes', () => {
      expect(isPalindrome('A1B2B1A')).toBe(true);
      expect(isPalindrome('race a e-car')).toBe(true);
      expect(isPalindrome('Able was I, ere I saw Elba')).toBe(true);
    });

    test('should return false for non-palindromic numbers', () => {
      expect(isPalindrome('12345')).toBe(false);
      expect(isPalindrome('987654')).toBe(false);
    });
  });

  describe('Special characters only', () => {
    test('should treat strings with only special characters as palindromes', () => {
      expect(isPalindrome('!@#$%')).toBe(true);
      expect(isPalindrome('.,;:')).toBe(true);
      expect(isPalindrome('   ')).toBe(true);
      expect(isPalindrome('!@#@!')).toBe(true);
    });
  });

  describe('Long palindromes', () => {
    test('should handle longer palindromic sentences', () => {
      expect(isPalindrome('Mr. Owl ate my metal worm')).toBe(true);
      expect(isPalindrome('Was it a rat I saw?')).toBe(true);
      expect(isPalindrome('Step on no pets')).toBe(true);
    });
  });
});