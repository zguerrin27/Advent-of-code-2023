const fs = require('fs');

const games = fs.readFileSync("./input.txt", 'utf-8').split('\n')

// ============================ PART ONE ===============================

const partOne = (games) => {
    const redMax = 12;
    const greenMax = 13;
    const blueMax = 14;

    let total = 0
    games.forEach((game, _) => {
        total += processGame(game)
    });
    return total;
    
    function processGame(game){
        const splitGame = game.split(":")
        const gameNum = parseInt(splitGame.shift().match(/\d+/g)[0])
        const gameSections = splitGame[0].split(';')

        let numberOfSectionsThatPass = 0;

        gameSections.forEach((section, _) => {
            const segments = section.split(',')

            let sectionRedCount = 0
            let sectionGreenCount = 0
            let sectionBlueCount = 0

            segments.forEach((seg, _) => {
                const count = parseInt(seg.match(/\d+/g)[0])
                const color = seg.match(/red|green|blue/g)[0]

                if(color === 'red'){
                    sectionRedCount += count;
                }
                if(color === 'green'){
                    sectionGreenCount += count;
                }
                if(color === 'blue'){
                    sectionBlueCount += count;
                }
            });

            if(sectionRedCount <= redMax && sectionGreenCount <= greenMax && sectionBlueCount <= blueMax){
                numberOfSectionsThatPass += 1
            } else {
                numberOfSectionsThatPass += 0
            }
            
        });
        
        if(numberOfSectionsThatPass === gameSections.length){
            return gameNum;
        } else {
            return 0;
        }
    };
};


// console.log(partOne(games))

// ============================ PART TWO ===============================



/**
 * 
 * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
 * Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
 * Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
 * Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
 * Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
 * 
 * loop through each section and keep track of each color in a map
 * if the current color exsits only keep the largest num
 * else enter the color and number
 * find product of each number
 * return product
 * keep a running total
 * 
 */

const partTwo = (games) => {

    let total = 0
    games.forEach((game, _) => {
        total += processGame(game)
    });
    return total;
    
    function processGame(game){
        const splitGame = game.split(":")
        const gameNum = parseInt(splitGame.shift().match(/\d+/g)[0])
        const gameSections = splitGame[0].split(';')

        let dict = {
            'red': 0,
            'green': 0,
            'blue': 0,
        };

        gameSections.forEach((section, _) => {
            const segments = section.split(',')

            segments.forEach((seg, _) => {
                const count = parseInt(seg.match(/\d+/g)[0])
                const color = seg.match(/red|green|blue/g)[0]

                if(dict[color] < count){
                    dict[color] = count
                }
            });
        });

        return Object.values(dict).reduce((a, b) => a * b);
    };
};

console.log(partTwo(games))