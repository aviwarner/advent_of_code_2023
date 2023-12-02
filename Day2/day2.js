/* 
You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).

For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.

Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games? 
*/

// 12 red cubes, 13 green cubes, and 14 blue cubes


const fs = require('fs');

const source = process.argv[2]
if (!process.argv[2]) return console.log('Hey you need to add a source!')

const stream = fs.createReadStream(source, 'utf8');

let gameIdSum = 0;

stream.on('data', chunk => {
    const lines = chunk.split('\n');
    lines.forEach(l => {
        // part1
        // gameIdSum += isGamePossible(l)

        // part2
        gameIdSum += calcMinGamePower(l)

    })
});

stream.on('end', () => {
    console.log('Sum of all calibration values is: ', gameIdSum);
});

const isGamePossible = line => {
    let isPossible = true
    const gameId = line.split(":")[0].split(" ")[1]
    const games = line.split(':')[1].split(';')

    games.forEach(game => {
        const splitGame = game.split(',')
        splitGame.forEach(die => {
            const num = parseInt(die.trim().split(" ")[0])

            if (die.indexOf('red') > -1 && isPossible) {
                if (num > 12) isPossible = false;
            } else if (die.indexOf('green') > -1 && isPossible) {
                if (num > 13) isPossible = false;
            } else if (isPossible) {
                if (num > 14) isPossible = false;
            }
        })
    })

    return isPossible ? parseInt(gameId) : 0;
}


/* 
As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?

Again consider the example games from earlier:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
Game 4 required at least 14 red, 3 green, and 15 blue cubes.
Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
*/
const calcMinGamePower = line => {
    let minRed = null;
    let minGreen = null;
    let minBlue = null;

    const games = line.split(':')[1].split(';')

    games.forEach(game => {
        const splitGame = game.split(',')
        splitGame.forEach(die => {
            const num = parseInt(die.trim().split(" ")[0])

            if (die.indexOf('red') > -1) {
                minRed = Math.max(minRed, num)
            } else if (die.indexOf('green') > -1) {
                minGreen = Math.max(minGreen, num)
            } else {
                minBlue = Math.max(minBlue, num)
            }
        })
    })
    // console.log('line ', line)
    // console.log('mins: red::', minRed, ' green::', minGreen, ' blue::', minBlue)

    return (minRed || 1) * (minGreen || 1) * (minBlue || 1)
}