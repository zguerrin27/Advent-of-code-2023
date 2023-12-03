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


console.log(partOne(games))

// ============================ PART TWO ===============================

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
