const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf-8').split("\n");

// ================= PART ONE ====================

var totalPartOne = 0
lines.forEach((item, _) => {
    totalPartOne += getLineTotalPartOne(item)
});
console.log(`Part One: ${totalPartOne}`)

function getLineTotalPartOne(line) {
    const numbers = line.match(/\d/g);
    return parseInt([numbers[0], numbers[numbers.length - 1]].join(""))
}

// ================= PART TWO ====================

var totalPartTwo = 0
lines.forEach((item, _) => {
    totalPartTwo += getLineTotalPartTwo(item)
});
console.log(`Part Two: ${totalPartTwo}`)

function getLineTotalPartTwo(line) {
    const r = new RegExp(`(?=(\\d|one|two|three|four|five|six|seven|eight|nine))`, 'g')
    const numbers = [...line.matchAll(r)]

    const dict = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
    };

    let num1;
    let num2;

    if (numbers[0][1] in dict) {
        num1 = dict[numbers[0][1]];
    } else {
        num1 = numbers[0][1];
    }

    if (numbers[numbers.length - 1][1] in dict) {
        num2 = dict[numbers[numbers.length - 1][1]];
    } else {
        num2 = numbers[numbers.length - 1][1];
    }

    return parseInt([num1, num2].join(""))
}
