// Algo 1

// A 5-day JSON weather forecast which consist of 5 arrays. Each of the 5 arrays includes 8 numbers which represent 3-hourly temperature forecast for a given day.

// Output:
// An array which includes the most frequent number (temperature) from each of the 5 arrays (days). In case there is a tie, return the value present later in a given array (day).

// Example
// For input:

// { "temperature": [
//     [15,17,19,21,21,21,20,16],
//     [16,17,22,22,22,22,20,16],
//     [12,17,19,20,20,20,20,18],
//     [14,15,19,19,20,22,18,17],
//     [15,17,24,24,24,20,20,20]
//   ]
// }
// The ouput should be [21,22,20,19,20]:

// [15,17,19,21,21,21,20,16]: 21 is the most frequent in 1st array
// [16,17,22,22,22,22,20,16]: 22 is the most frequent in 2nd array
// [12,17,19,20,20,20,20,18]: 20 is the most frequent in 3rd array
// [14,15,19,19,20,22,18,17]: 19 is the most frequent in 4th array
// [15,17,24,24,24,20,20,20]: 24 and 20 appear 3 times each in 5th array so 20 is included in the output as the last 20 appears later than the last 24.

function getMostFrequent(json) {
  const temperatureArrays = json.temperature;
  const results = [];
  for (let day of temperatureArrays) {
    const frequency = {};
    for (let i = 0; i < day.length; i++) {
      const temp = day[i];
      if (!frequency[temp]) {
        frequency[temp] = { count: 0, lastIndex: 0}
      }
      frequency[temp].count += 1;
      frequency[temp].lastIndex = i;
    }
    let maxCount = 0;
    let resultTemp = null;
    let latestIndex = -1;
    for (let temp in frequency) {
      const { count, lastIndex } = frequency[temp];
      if (count > maxCount || (count === maxCount && lastIndex > latestIndex)) {
        maxCount = count;
        resultTemp = Number(temp);
        latestIndex = lastIndex;
      }
    }
    results.push(resultTemp);
  }
  return results;
}

// Algo 2

// Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.
// Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case

function countBits(n) {
  return n.toString(2).split('').filter(bit => bit === '1').length;
}

// Algo 3

// The principle is pretty simple:

// Given a integer (n)
// Find the next palindromic number after (excluding) n
// Implement this in the function nextPalin

// However, due to some constraints, the implementation is not:

// 0 < n < 10^1000
// 0 < t < 0.175s
// A.K.A
// n is between 1 and 1001 digits
// total time for all test cases should be less than 0.175s (175ms)
// This means that you cannot do:

// function nextPalin(n) {
//   while (!isPalin(n)) n += 1n; // isPalin(n) is defined elsewhere
//   return n;
// }
// For example:

// 12345 -> 12421
// 11 -> 22
// 134 -> 141
// 9876543219123456789 -> 9876543220223456789
// There are 322 test cases (excluding time constraint, which is not included in assertion), so optimization is very important

function nextPalin(number) {
  number = typeof number === "string" ? number : number.toString();
  if (/^9+$/.test(number)) {
    return BigInt("1" + "0".repeat(number.length - 1) + "1");
  }
  const len = number.length;
  const half = Math.floor(len / 2);
  let left = number.slice(0, half);
  let middle = len % 2 === 0 ? "" : number[half];
  function mirror(l, m) {
    return l + m + l.split('').reverse().join('');
  }
  let mirrored = mirror(left, middle);
  if (mirrored > number) return BigInt(mirrored);
  let increment = (BigInt(left + middle) + 1n).toString();
  while (increment.length < left.length + middle.length) increment = "0" + increment;
  let newLeft, newMiddle;
  if (middle) {
    newLeft = increment.slice(0, -1);
    newMiddle = increment.slice(-1);
  } else {
    newLeft = increment;
    newMiddle = "";
  }
  return BigInt(mirror(newLeft, newMiddle));
}

// Algo 4

// Write a function that will take in any array and reverse it.

// Sounds simple doesn't it?

// NOTES:

// Array should be reversed in place! (no need to return it)
// Usual builtins have been deactivated. Don't count on them.
// You'll have to do it fast enough, so think about performances

function reverse(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let temporary = arr[left];
    arr[left] = arr[right];
    arr[right] = temporary;
    left++;
    right--;
  }
}

// Algo 5

// Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case). The next words should be always capitalized.

// Examples
// "the-stealth-warrior" gets converted to "theStealthWarrior"

// "The_Stealth_Warrior" gets converted to "TheStealthWarrior"

// "The_Stealth-Warrior" gets converted to "TheStealthWarrior"

function toCamelCase(str) {
  let words = str.split(/[-_]/);
  return words
    .map((word, index) => {
    if (index === 0) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

// Algo 6

// Your task is to construct a building which will be a pile of n cubes. The cube at the bottom will have a volume of 
// n^3, the cube above will have volume of (n - 1)^3 and so on until the top which will have a volume of 1^3

// You are given the total volume m of the building. Being given m can you find the number n of cubes you will have to build?

// The parameter of the function findNb (find_nb, find-nb, findNb, ...) will be an integer m and you have to return the integer n such as
// n^3 + (n - 1)^3 + (n - 2)^3 + ... + 1^3 = m if such an n exists or -1 if there is no such n.

// examples: 

// findNb(1071225) --> 45

// findNb(91716553919377) --> -1

function findNb(m) {
  let sum = 0;
  let n = 0;
  while (sum < m) {
    n += 1;
    sum += Math.pow(n, 3);
    if (sum === m) {
      return n;
    }
  }
  return -1;
}

// Algo 7

// Define a function that takes an integer argument and returns a logical value true or false depending on if the integer is a prime.

// Per Wikipedia, a prime number ( or a prime ) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

// Requirements
// You can assume you will be given an integer input.
// You can not assume that the integer will be only positive. You may be given negative numbers as well ( or 0 ).
// NOTE on performance: There are no fancy optimizations required, but still the most trivial solutions might time out. Numbers go up to 2^31 ( or similar, depending on language ). Looping all the way up to n, or n/2, will be too slow.
// Example
// is_prime(1)  /* false */
// is_prime(2)  /* true  */
// is_prime(-1) /* false */

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Algo 8

// Write a method (or function, depending on the language) that converts a string to camelCase, that is, all words must have their first letter capitalized and spaces must be removed.

// Examples (input --> output):
// "hello case" --> "HelloCase"
// "camel case word" --> "CamelCaseWord"
// Don't forget to rate this kata! Thanks :)

String.prototype.camelCased = function() {
  return this.trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join("");
}

// Algo 9

// Write a function that accepts a string, and returns true if it is in the form of a phone number.
// Assume that any integer from 0-9 in any of the spots will produce a valid phone number.

// Only worry about the following format:
// (123) 456-7890 (don't forget the space after the close parentheses)

// Examples:

// "(123) 456-7890"  => true
// "(1111)555 2345"  => false
// "(098) 123 4567"  => false

function validPhoneNumber(phoneNumber) {
  if (phoneNumber.length !== 14) return false;
  if (
    phoneNumber[0] !== "(" ||
    phoneNumber[4] !== ")" ||
    phoneNumber[5] !== " " ||
    phoneNumber[9] !== "-"
  ) {
    return false;
  }
  for (let i of [1, 2, 3, 6, 7, 8, 10, 11, 12, 13]) {
    if (phoneNumber[i] < "0" || phoneNumber[i] > "9") return false;
  }
  return true;
}

// Algo 10

// Given an array of integers of any length, return an array that has 1 added to the value represented by the array.

// If the array is invalid (empty, or contains negative integers or integers with more than 1 digit), return nil (or your language's equivalent).

// Examples
// Valid arrays

// [4, 3, 2, 5] would return [4, 3, 2, 6] (4325 + 1 = 4326)
// [1, 2, 3, 9] would return [1, 2, 4, 0] (1239 + 1 = 1240)
// [9, 9, 9, 9] would return [1, 0, 0, 0, 0] (9999 + 1 = 10000)
// [0, 1, 3, 7] would return [0, 1, 3, 8] (0137 + 1 = 0138)
// Invalid arrays

// [] is invalid because it is empty
// [1, -9] is invalid because -9 is not a non-negative integer
// [1, 2, 33] is invalid because 33 is not a single-digit integer

function upArray(arr) {
  if (arr.length === 0) return null;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0 || arr[i] > 9) {
      return null;
    }
  }
  let result = arr.slice();
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] < 9) {
      result[i]++;
      return result;
    }
    result[i] = 0;
  }
  result.unshift(1);
  return result;
}

// Algo 11

// Write a function that given an integer n >= 0, returns an array of n ascending length subarrays, all filled with 1s.

// 0 => [ ]
// 1 => [ [1] ]
// 2 => [ [1], [1, 1] ]
// 3 => [ [1], [1, 1], [1, 1, 1] ]

function pyramid(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(Array(i).fill(1));
  }
  return result;
}

// Algo 12

// Write a function that, given a depth n, returns n top rows of Pascal's Triangle flattened into a one-dimensional list/array.

// Example:
// n = 1: [1]
// n = 2: [1,  1, 1]
// n = 4: [1,  1, 1,  1, 2, 1,  1, 3, 3, 1]
// Note
// Beware of overflow. Requested terms of a triangle are guaranteed to fit into the returned type, but depending on selected method of calculations, intermediate values can be larger.

function pascalsTriangle(n) {
  let result = [];
  let previous = [];
  for (let row = 0; row < n; row++) {
    if (row === 0) {
      previous = [1];
    } else {
      previous = [1, ...previous.map((_, i, arr) => arr[i] + (arr[i + 1] || 0)).slice(0, -1), 1];
    }
    result.push(previous.slice());
  }
  return result.flat();
}

// Algo 13

// Assume "#" is like a backspace in string. This means that string "a#bc#d" actually is "bd"

// Your task is to process a string with "#" symbols.

// Examples
// "abc#d##c"      ==>  "ac"
// "abc##d######"  ==>  ""
// "#######"       ==>  ""
// ""              ==>  ""

function cleanString(s) {
  const arr = [];
  for (let char of s) {
    if (char === "#") {
      arr.pop();
    } else {
      arr.push(char);
    }
  }
  return arr.join('');
}

// Algo 14

// Middle Earth is about to go to war. The forces of good will have many battles with the forces of evil. Different races will certainly be involved. Each race has a certain worth when battling against others. On the side of good we have the following races, with their associated worth:

// Hobbits: 1
// Men: 2
// Elves: 3
// Dwarves: 3
// Eagles: 4
// Wizards: 10
// On the side of evil we have:

// Orcs: 1
// Men: 2
// Wargs: 2
// Goblins: 2
// Uruk Hai: 3
// Trolls: 5
// Wizards: 10
// Although weather, location, supplies and valor play a part in any battle, if you add up the worth of the side of good and compare it with the worth of the side of evil, the side with the larger worth will tend to win.

// Thus, given the count of each of the races on the side of good, followed by the count of each of the races on the side of evil, determine which side wins.

// Input:
// The function will be given two parameters. Each parameter will be a string of multiple integers separated by a single space. Each string will contain the count of each race on the side of good and evil.

// The first parameter will contain the count of each race on the side of good in the following order:

// Hobbits, Men, Elves, Dwarves, Eagles, Wizards.
// The second parameter will contain the count of each race on the side of evil in the following order:

// Orcs, Men, Wargs, Goblins, Uruk Hai, Trolls, Wizards.
// All values are non-negative integers. The resulting sum of the worth for each side will not exceed the limit of a 32-bit integer.

// Output:
// Return "Battle Result: Good triumphs over Evil" if good wins, "Battle Result: Evil eradicates all trace of Good" if evil wins, or "Battle Result: No victor on this battle field" if it ends in a tie.

function goodVsEvil(good, evil) {
  const goodWorth = [1, 2, 3, 3, 4, 10];
  const evilWorth = [1, 2, 2, 2, 3, 5, 10];
  const goodCount = good.split(' ').map(Number);
  const evilCount = evil.split(' ').map(Number);
  const goodTotal = goodCount.reduce((sum, count, i) => sum + count * goodWorth[i], 0);
  const evilTotal = evilCount.reduce((sum, count, i) => sum + count * evilWorth[i], 0);
  if (goodTotal > evilTotal) return "Battle Result: Good triumphs over Evil";
  if (evilTotal > goodTotal) return "Battle Result: Evil eradicates all trace of Good";
  return "Battle Result: No victor on this battle field";
}

// Algo 15

// Return the century of the input year. The input will always be a 4 digit string, so there is no need for validation.

// Examples
// "1999" --> "20th"
// "2011" --> "21st"
// "2154" --> "22nd"
// "2259" --> "23rd"
// "1124" --> "12th"
// "2000" --> "20th"

function whatCentury(year) {
  const century = Math.ceil(Number(year) / 100);
  const lastTwo = century % 100;
  let suffix = "th";
  if (lastTwo < 11 || lastTwo > 13) {
    switch (century % 10) {
      case 1: suffix = "st"; break;
      case 2: suffix = "nd"; break;
      case 3: suffix = "rd"; break;
    }
  }
  return century + suffix;
}

// Algo 16

// I love Fibonacci numbers in general, but I must admit I love some more than others.

// I would like for you to write me a function that, when given a number n (n >= 1 ), returns the nth number in the Fibonacci Sequence.

// For example:

//    nthFibo(4) == 2
// Because 2 is the 4th number in the Fibonacci Sequence.

// For reference, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two.

function nthFibo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 3; i <= n; i++) {
    let next = a + b;
    a = b;
    b = next;
  }
  return b;
}

// Algo 17

// In this kata you are given a string for example:

// "example(unwanted thing)example"
// Your task is to remove everything inside the parentheses as well as the parentheses themselves.

// The example above would return:

// "exampleexample"
// Notes
// Other than parentheses only letters and spaces can occur in the string. Don't worry about other brackets like "[]" and "{}" as these will never appear.
// There can be multiple parentheses.
// The parentheses can be nested.

function removeParenthesis(s) {
  let result = [];
  let level = 0;
  for (let char of s) {
    if (char === '(') {
      level++;
    } else if (char === ')') {
      level--;
    } else if (level === 0) {
      result += char;
    }
  }
  return result;
}

// ALgo 18

// You are given an input string.

// For each symbol in the string if it's the first character occurrence, replace it with a '1', else replace it with the amount of times you've already seen it.

// Examples:
// input   =  "Hello, World!"
// result  =  "1112111121311"

// input   =  "aaaaaaaaaaaa"
// result  =  "123456789101112"
// There might be some non-ascii characters in the string.

// Take note of performance

function numericals(s) {
  let counts = {};
  let result = [];
  for (let char of s) {
    counts[char] = (counts[char] || 0) + 1;
    result.push(counts[char]);
  }
  return result.join('');
}

// Algo 19

// The function 'fibonacci' should return an array of fibonacci numbers. The function takes a number as an argument to decide how many no. of elements to produce. If the argument is less than or equal to 0 then return empty array

// Example:

// fibonacci(4) // should return  [0,1,1,2]
// fibonacci(-1) // should return []

function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  let result = [0, 1];
  while (result.length < n) {
    result.push(result[result.length - 1] + result[result.length - 2]);
  }
  return result;
}

// Algo 20

// Complete the method so that it formats the words into a single comma separated value. The last word should be separated by the word 'and' instead of a comma. The method takes in an array of strings and returns a single formatted string.

// Note:

// Empty string values should be ignored.
// Empty arrays or null/nil/None values being passed into the method should result in an empty string being returned.
// Example: (Input --> output)

// ['ninja', 'samurai', 'ronin'] --> "ninja, samurai and ronin"
// ['ninja', '', 'ronin'] --> "ninja and ronin"
// [] -->""

function formatWords(words) {
  return words && (words = words.filter(Boolean)).length
    ? words.length === 1
      ? words[0]
      : words.slice(0, -1).join(', ') + ' and ' + words.slice(-1)
    : '';
}

console.log(formatWords(['ninja', 'samurai', 'ronin']))
