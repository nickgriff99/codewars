// Algo 1

// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23
// Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in.
// Additionally, if the number is negative, return 0.
// Note: If the number is a multiple of both 3 and 5, only count it once.

function solution(number) {
  if (number < 0) return 0;
  let sum = 0;
  for (let i = 0; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }  return sum;
}

// Algo 2

// You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.
// Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:
// [] -->  "no one likes this"
// ["Peter"] -->  "Peter likes this"
// ["Jacob", "Alex"] -->  "Jacob and Alex like this"
// ["Max", "John", "Mark"] -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"] -->  "Alex, Jacob and 2 others like this"
// Note: For 4 or more names, the number in "and 2 others" simply increases.

function likes(names) {
  if (names.length === 0) return "no one likes this";
  if (names.length === 1) return `${names[0]} likes this`;
  if (names.length === 2) return `${names[0]} and ${names[1]} like this`;
  if (names.length === 3) return `${names[0]}, ${names[1]} and ${names[2]} like this`;
  return `${names[0]}, ${names[1]} and ${names.length - 2} others like this`;
}

// Algo 3

// Given an array of integers, find the one that appears an odd number of times.
// There will always be only one integer that appears an odd number of times.
// Examples
// [7] should return 7, because it occurs 1 time (which is odd).
// [0] should return 0, because it occurs 1 time (which is odd).
// [1,1,2] should return 2, because it occurs 1 time (which is odd).
// [0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
// [1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).

function findOdd(A) {
  return A.reduce((acc, num) => acc ^ num, 0)
}

// Algo 4

// Take 2 strings s1 and s2 including only letters from a to z. Return a new sorted string (alphabetical ascending), the longest possible, containing distinct letters - each taken only once - coming from s1 or s2.

function longest (s1, s2) {
  return Array.from(new Set(s1 + s2)).sort().join('');
}

// Algo 5

// Implement a function that computes the difference between two lists. The function should remove all occurrences of elements from the first list (a) that are present in the second list (b). The order of elements in the first list should be preserved in the result.

function arrayDiff(a, b) {
  return a.filter(element => !b.includes(element));
}

// Algo 6

// Write a function that accepts an array of 10 integers (between 0 and 9) that returns a string of those numbers in the form of a phone number.

function createPhoneNumber(numbers) {
  let format = "(xxx) xxx-xxxx";
  for (var i = 0; i < numbers.length; i++) {
    format = format.replace('x', numbers[i]);
  }
  return format;
}

// Algo 7

// Write a function that takes in a string of one or more words, and returns the same string, but with all words that have five or more letters reversed. Strings passed in will consist of only letters and spaces. Spaces will be included only when more than one word is present.

function spinWords(string) {
  return string.split(' ').map(w => w.length >= 5 ? w.split('').reverse().join('') : w).join(' ');
}

// Algo 8

// Complete the solution so that it splits the string into pairs of two characters. If the string contains an odd number of characters then it should replace the missing second character of the final pair with an underscore ('_').

function solution(str) {
  const pairs = [];
  for (let i = 0; i < str.length; i += 2) {
    if (i + 1 < str.length) {
      pairs.push(str[i] + str[i + 1]);
    } else {
      pairs.push(str[i] + '_');
    }
  }
  return pairs;
}

// Algo 9

// Given [n], take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

function digitalRoot(n) {
  return n < 10 ? n : digitalRoot(n.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0)); 
}

// Algo 10

// There is an array with some numbers. All numbers are equal except for one. Try to find it!
// findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
// findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
// It’s guaranteed that array contains at least 3 numbers.
// The tests contain some very huge arrays, so think about performance.

function findUniq(arr) {
  const numCount = {};
  for (const num of arr) {
    numCount[num] = (numCount[num] || 0) + 1;
  }
  for (const num in numCount) {
    if (numCount[num] === 1) {
      return parseFloat(num);
    }
  }
}

// Algo 11

// Build a pyramid-shaped tower, as an array/list of strings, given a positive integer number of floors. A tower block is represented with "*" character.

function towerBuilder(nFloors) {
  const tower = [];
  for (let i = 0; i < nFloors; i++) {
    const space = ' '.repeat(nFloors - i - 1);
    const star = '*'.repeat(2 * i + 1);
    tower.push(space + star + space);
  }
  return tower;
}

// Algo 12

// Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.

function duplicateCount(text) {
  let lowerText = text.toLowerCase();
  let charCount = {};
  for (const char of text.toLowerCase()) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  return Object.values(charCount).filter(count => count > 1).length;
};

// Algo 13

// The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

function duplicateEncode(word) {
  var lowerWord = word.toLowerCase();
  var result = '';
  for (var i = 0; i < word.length; i++) {
    if (lowerWord.lastIndexOf(lowerWord[i]) === lowerWord.indexOf(lowerWord[i])) {
      result += '(';
    } else {
      result += ')';
    }
  }
  return result;
}

// Algo 14

// Write an algorithm that will identify valid IPv4 addresses in dot-decimal format. IPs should be considered valid if they consist of four octets, with values between 0 and 255, inclusive.

function isValidIP(str) {
  const octet = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
  const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);
  return regex.test(str);
}

// Algo 15

// You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.

function findOutlier(integers) {
  const even = integers.filter(num => num % 2 === 0);
  const odd = integers.filter(num => num % 2 !== 0);
  return even.length === 1 ? even[0] : odd[0];
}

// Algo 16

// A Narcissistic Number (or Armstrong Number) is a positive number which is the sum of its own digits, each raised to the power of the number of digits in a given base. In this Kata, we will restrict ourselves to decimal (base 10).
// For example, take 153 (3 digits), which is narcissistic:
//     1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
// and 1652 (4 digits), which isn't:
//     1^4 + 6^4 + 5^4 + 2^4 = 1 + 1296 + 625 + 16 = 1938
// The Challenge:
// Your code must return true or false (not 'true' and 'false') depending upon whether the given number is a Narcissistic number in base 10.
// This may be True and False in your language, e.g. PHP.
// Error checking for text strings or other invalid inputs is not required, only valid positive non-zero integers will be passed into the function.

function narcissistic(value) {
  const digits = value.toString().split('').map(Number);
  const numDigits = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, numDigits), 0);
  return sum === value;
}

// Algo 17

// Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.
// For example:
// uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
// uniqueInOrder([1,2,2,3,3])       == [1,2,3]

var uniqueInOrder = function(iterable) {
  const result = [];
  let lastElement = null;
  for (const element of iterable) {
    if (element !== lastElement) {
      result.push(element);
      lastElement = element;
    }
  }
  return result;
}

// Algo 18

// Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.

// You will always get an valid array. And it will be always exactly one letter be missing. The length of the array will always be at least 2.
// The array will always contain letters in only one case.
// Example:
// ['a','b','c','d','f'] -> 'e'
// ['O','Q','R','S'] -> 'P'
// (Use the English alphabet with 26 letters!)

function findMissingLetter(array) {
  const isUpperCase = array[0] === array[0].toUpperCase();
  const alphabet = isUpperCase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
  const starting = alphabet.indexOf(array[0]);
  for (let i = 0; i < array.length; i++) {
    const expected = alphabet[starting + i];
    if (array[i] !== expected) {
      return expected;
    }
  }
}

// Algo 19

// You will be given a number and you will need to return it as a string in Expanded Form. For example:
//    12 --> "10 + 2"
//    45 --> "40 + 5"
// 70304 --> "70000 + 300 + 4"
// NOTE: All numbers will be whole numbers greater than 0.

function expandedForm(num) {
  return num
    .toString()
    .split('')
    .map((digit, index, arr) => digit * Math.pow(10, arr.length - index - 1))
    .filter(Boolean)
    .join(' + ');
}

// Algo 20

// Write a function that accepts a string, and returns the same string with all even indexed characters in each word upper cased, and all odd indexed characters in each word lower cased. The indexing just explained is zero based, so the zero-ith index is even, therefore that character should be upper cased and you need to start over for each word.
// The passed in string will only consist of alphabetical characters and spaces(' '). Spaces will only be present if there are multiple words. Words will be separated by a single space(' ').
// Examples:
// "String" => "StRiNg"
// "Weird string case" => "WeIrD StRiNg CaSe"

function toWeirdCase(string) {
  return string.split(' ')
    .map(word => 
      word.split('')
        .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('')
    )
    .join(' ');
}

