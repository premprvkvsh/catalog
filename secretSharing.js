const fs = require('fs');


function decodeValue(base, value) {
  return parseInt(value, base);
}


function lagrangeInterpolation(points) {
  let constant = 0;

  for (let i = 0; i < points.length; i++) {
    const [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const [xj] = points[j];
        term *= (0 - xj) / (xi - xj);
      }
    }
    constant += term;
  }

  return Math.round(constant);
}


function solvePolynomial(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const n = data.keys.n;
  const k = data.keys.k;


  const points = [];
  for (const key in data) {
    if (key !== "keys") {
      const x = parseInt(key);
      const base = parseInt(data[key].base);
      const y = decodeValue(base, data[key].value);
      points.push([x, y]);
    }
  }


  const selectedPoints = points.slice(0, k);


  return lagrangeInterpolation(selectedPoints);
}


const file1 = './testcase1.json';
const file2 = './testcase2.json';


const result1 = solvePolynomial(file1);
const result2 = solvePolynomial(file2);


console.log(`Constant term for testcase 1: ${result1}`);
console.log(`Constant term for testcase 2: ${result2}`);
