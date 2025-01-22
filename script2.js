// const fs = require('fs');

// // Function to decode values based on base
// function decodeValue(base, value) {
//     return parseInt(value, base);
// }

// // Function to calculate mean of an array
// function calculateMean(arr) {
//     const sum = arr.reduce((acc, val) => acc + val, 0);
//     return sum / arr.length;
// }

// // Function to calculate standard deviation of an array
// function calculateStandardDeviation(arr, mean) {
//     const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
//     return Math.sqrt(variance);
// }

// // Function to detect outliers
// function detectOutliers(points) {
//     const yValues = points.map(point => point.y);

//     // Calculate mean and standard deviation
//     const mean = calculateMean(yValues);
//     const stdDev = calculateStandardDeviation(yValues, mean);

//     // Flag values that are more than 2 standard deviations from the mean
//     const threshold = 2;
//     return points.filter(point => Math.abs(point.y - mean) > threshold * stdDev);
// }

// // Function to parse JSON file and process the data
// function findOutliersFromFile(filename) {
//     fs.readFile(filename, 'utf8', (err, data) => {
//         if (err) {
//             console.error("Error reading file:", err);
//             return;
//         }

//         const jsonData = JSON.parse(data);
//         const { n, k } = jsonData.keys;

//         let points = [];

//         // Parse and decode each point
//         Object.keys(jsonData).forEach(key => {
//             if (key !== 'keys') {
//                 const base = parseInt(jsonData[key].base);
//                 const value = jsonData[key].value;
//                 const x = parseInt(key); // x is the key of the object
//                 const y = decodeValue(base, value); // y is the decoded value

//                 points.push({ x, y });
//             }
//         });

//         // Detect outliers
//         const outliers = detectOutliers(points);

//         console.log("Outliers found:", outliers);
//     });
// }

// // Run the function with the given file
// findOutliersFromFile('testcase2.json');