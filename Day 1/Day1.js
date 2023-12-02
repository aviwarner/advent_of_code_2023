/* 
The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
*/

const fs = require('fs');

const source = process.argv[2]
if (!process.argv[2]) return console.log('Hey you need to add a source!')

const stream = fs.createReadStream(source, 'utf8');

let sum = 0;

// pt 1
// stream.on('data', chunk => {
//     const lines = chunk.split('\n');
//     lines.forEach(l => {
//         sum += findCalibrationValue(l)
//     })
// });

// pt 2
stream.on('data', chunk => {
    const lines = chunk.split('\n');
    lines.forEach(l => {
        sum += findCalibrationValuePt2(l)
    })
});

stream.on('end', () => {
    console.log('Sum of all calibration values is: ', sum);
});


const findCalibrationValue = string => {
    let l = 0
    let r = string.length - 1

    let leftValue = null
    let rightValue = null

    while (!leftValue) {
        if (parseInt(string[l])) {
            leftValue = string[l]
        } else {
            l++
        }
    }

    while (!rightValue) {
        if (parseInt(string[r])) {
            rightValue = string[r]
        } else {
            r--
        }
    }

    return parseInt(leftValue + rightValue)
}

const DIGITS = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const THREE_DIGIT_NUMS = ['one', 'two', 'six']
const FOUR_DIGIT_NUMS = ['four', 'five', 'nine']
const FIVE_DIGIT_NUMS = ['three', 'seven', 'eight']

const findCalibrationValuePt2 = string => {
    let l = 0
    let r = string.length - 1

    let leftValue = null
    let rightValue = null

    while (!leftValue) {
        if (parseInt(string[l])) {
            leftValue = string[l]
        } else if (THREE_DIGIT_NUMS.indexOf(string.slice(l, l + 3)) > -1) {
            leftValue = DIGITS[string.slice(l, l + 3)]
        } else if (FOUR_DIGIT_NUMS.indexOf(string.slice(l, l + 4)) > -1) {
            leftValue = DIGITS[string.slice(l, l + 4)]
        } else if (FIVE_DIGIT_NUMS.indexOf(string.slice(l, l + 5)) > -1) {
            leftValue = DIGITS[string.slice(l, l + 5)]
        } else {
            l++
        }
    }

    while (!rightValue) {
        if (parseInt(string[r])) {
            rightValue = string[r]
        } else if (THREE_DIGIT_NUMS.indexOf(string.slice(r, r + 3)) > -1) {
            rightValue = DIGITS[string.slice(r, r + 3)]
        } else if (FOUR_DIGIT_NUMS.indexOf(string.slice(r, r + 4)) > -1) {
            rightValue = DIGITS[string.slice(r, r + 4)]
        } else if (FIVE_DIGIT_NUMS.indexOf(string.slice(r, r + 5)) > -1) {
            rightValue = DIGITS[string.slice(r, r + 5)]
        } else {
            r--
        }
    }

    // console.log('leftValue, ', leftValue)
    // console.log('rightValue, ', rightValue)

    return parseInt(leftValue + rightValue)
}