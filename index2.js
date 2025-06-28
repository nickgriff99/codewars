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
