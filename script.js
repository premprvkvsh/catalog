const fs = require('fs');

//decode the value based on its base
function decodeBaseValue(base, value) {
    return parseInt(value, base);
}

// Lagrange Interpolation
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= -xj / (xi - xj);
            }
        }

        constantTerm += yi * li;
    }

    return constantTerm;
}

// constant term 
function findSecretConstant(jsonData) {
    let n = jsonData.keys.n;
    let k = jsonData.keys.k;

    let points = [];

    // Iterate over each key in the object
    Object.keys(jsonData).forEach(key => {
        if (key !== 'keys') {
            let base = parseInt(jsonData[key].base);
            let value = jsonData[key].value;
            let x = parseInt(key);  // 'key' is the x-value
            let y = decodeBaseValue(base, value);  // Decode the y-value
            points.push({ x, y });
        }
    });

    points.sort((a, b) => a.x - b.x);  // Sort points by x-value

    return lagrangeInterpolation(points, k);
}

// Main function
function processTestCases(testCases) {
    testCases.forEach((testCase, index) => {
        let result = findSecretConstant(testCase);
        console.log(`The constant term (c) for test case ${index + 1} is: ${result}`);
    });
}

// output
const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));

const testCases = [testCase1, testCase2];

processTestCases(testCases);