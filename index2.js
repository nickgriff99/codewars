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

// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.

// Examples
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

function pigIt(str) {
  const pig = str.split(" ");
  const pigLat = pig.map(word => {
    if (/^[!?.;:,]$/.test(word)) {
      return word;
    }
    if (word.length > 0) {
      const firstLetter = word[0];
      const restOfWord = word.slice(1);
      return restOfWord + firstLetter + "ay";
    }
    return word;
  })
  return pigLat.join(" ");
}
