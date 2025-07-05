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

console.log(validPhoneNumber("(123) 456-7890"))
