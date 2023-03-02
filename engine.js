const home = [
    {pos : "gk", name: "kepa",
          score: 600},
    {pos : "def", name: "james",
            score: 700},
    {pos : "def", name: "silva",
            score: 654},
    {pos : "def", name: "chilwell",
            score: 544},
    {pos : "def", name: "fofana",
            score: 691},
    {pos : "mid", name: "ziyech",
            score: 510},
    {pos : "mid", name: "pulisic",
            score: 495},
    {pos : "mid", name: "kanté",
            score: 789},
    {pos : "mid", name: "mount",
            score: 632},
    {pos : "att", name: "sterling",
            score: 801},
    {pos : "att", name: "felix",
            score: 650}
];

const away = [
    {pos : "gk", name: "ederson",
          score: 721},
    {pos : "def", name: "walker",
            score: 700},
    {pos : "def", name: "dias",
            score: 723},
    {pos : "def", name: "ake",
            score: 620},
    {pos : "def", name: "laporte",
            score: 691},
    {pos : "mid", name: "grealish",
            score: 680},
    {pos : "mid", ame: "silva",
            score: 756},
    {pos : "mid", name: "de bruyne",
            score: 950},
    {pos : "mid", name: "foden",
            score: 810},
    {pos : "att", name: "haaland",
            score: 801},
    {pos : "att", name: "alvarez",
            score: 690}
]

const playerVolume = [
    {players: 0, lower: 0,
         upper: 0.05},
    {players: 1, lower: 0.050000000000000001,
         upper: 0.15},
    {players: 2, lower: 0.150000000000000001,
         upper: 0.3},
    {players: 3, lower: 0.30000000000000001,
        upper: 0.45},
    {players: 4, lower: 0.450000000000000001,
        upper: 0.645},
    {players: 5, lower: 0.6450000000000000001,
        upper: 0.804},
    {players: 6, lower: 0.8040000000000000001,
        upper: 0.904},
    {players: 7, lower: 0.9040000000000000001,
        upper: 0.954},
    {players: 8, lower: 0.9540000000000000001,
        upper: 0.974},
    {players: 9, lower: 0.9740000000000000001,
        upper: 0.989},
    {players: 10, lower: 0.9890000000000000001,
        upper: 0.999},
    {players: 11, lower: 0.9990000000000000001,
         upper: 1}
]

randomNum = (skew) => {
    let u = Math.random();
    let v = Math.random();
    num = Math.pow(u, 1-skew) + (v/3);
    return num;
}

// get volume of players for each attack play
playerVol = () => {
    let rand = Math.random();
    let players = 0;
    playerVolume.forEach(number => {
        if (number.lower <= rand && number.upper >= rand) {
            players = number.players;
        }
    })
    return players;
}

// pick players involved in the attack play
pickPlayers = (num,arr,team) => {
    let tempHome = [...arr];
    let maxArray = 11;
    let chosen = [];
    for (let i = 0; i < num; i++) {
        let tempRand = Math.floor(Math.random() * (maxArray - 1) + 1);
        chosen.push(tempHome[tempRand]);
        tempHome.splice(tempRand,1);
        maxArray--;
    }
    if(team === "def") {
        chosen.push(tempHome[0]);
    }
    return chosen;
}

// get total score for attack play
getTotal = (arr) => {
    let total = 0;
    arr.forEach(number => {
        total += number.score;
    })
    return total;
}

// decide if goal - if att score is 10% more than def score
score = (att, def, team) => {
    let lastScored = "";
    if (att > def * 1.55) {
        lastScored = team;
        return "GOAL";
        
    } else {
        return "NO GOAL";
    };
}

const fs = require("fs");
//chances based on midfield score
chancesGenerator = (team,num) => {
    const teamMid = team.filter(item => item.pos === "mid");
    const teamScore = getTotal(teamMid) / teamMid.length / 1000;
    // let tempArr = [];
    // for (let i = 0; i<=1000; i++) {
    //     tempArr.push(Math.floor(randomNum(teamScore) * 10));
    // }
    // fs.writeFile("_"+num+".csv", JSON.stringify(tempArr), (err) =>
    // err ? console.error(err) : console.log('Success!'));
    return Math.floor(randomNum(teamScore) * 10)
}

// chances times and object
chances = (chances) => {
    let chancesArr = [];
    for(let i=1; i <= chances; i++) {
        let temp = {time: Math.floor(Math.random() * (90 - 0) + 1),
                    goal: "",
                    scorer: ""};
        chancesArr.push(temp);
    }
    // sort array by time and return
    return chancesArr.sort((a,b) => a.time - b.time);
}

attackPlay = (attTeam, defTeam, chancesObj) => {
    chancesObj.forEach(item => {
        // get how many players attack and defend for each play
        const attPlayers = playerVol();
        const defPlayers = playerVol();
        // pick players involved in the attack play
        const attChosen = pickPlayers(attPlayers, attTeam, "att");
        const defChosen = pickPlayers(defPlayers, defTeam, "def");
        // get total score for attack play
        const attTotal = getTotal(attChosen);
        const defTotal = getTotal(defChosen);
        // decide if goal
        const goalQ = score(attTotal, defTotal, attTeam);
        // set goal value in game chance object
        item.goal = goalQ;
        // assign scorer for game chance from players picked for attacked
        if(goalQ === "GOAL") {
            item.scorer = attChosen[Math.floor(Math.random()*(attChosen.length - 1))];
        }
    })
    return chancesObj;
}

runGame = (homeObj, awayObj) => {
    var count = 0;
    var interval = setInterval(function(){
        if (count === 90){
            clearInterval(interval); // Stopping the counter when reaching 91.
            return ;
        }
        homeObj.forEach(item => {
            if (item.time === count && item.goal ==="GOAL") {
                console.log(`${count} - ${JSON.stringify(item.goal)} - ${JSON.stringify(item.scorer.name)}`)
            }
        });
        awayObj.forEach(item => {
            if (item.time === count && item.goal ==="GOAL") {
                console.log(`${count} - ${JSON.stringify(item.goal)} - ${JSON.stringify(item.scorer.name)}`)
            }
        });
        count++;
    }, 100);
}

// GAME
// get home and away teams objects
game = (homeT, awayT) => {
    // calculate game chances
    const homeChances = chancesGenerator(homeT,1);
    const awayChances = chancesGenerator(awayT,2);
    // calculate times for shots for each team (create object)
    let homeGameChance = chances(homeChances);
    let awayGameChance = chances(awayChances);
    // set attack bonus for home team
    const attBns = 100;
    // set defense bonuse for home team
    const defBns = 50;
    // set attack bonus on last 5 games

    // For each attack play, check for goal
    const homeChanceObj = attackPlay(homeT, awayT, homeGameChance);
    const awayChanceObj = attackPlay(awayT, homeT, awayGameChance);

    runGame(homeChanceObj, awayChanceObj);

    return {homeChanceObj, awayChanceObj};

    
}

const temp = game(home, away);
console.log(temp);

// Randomly generate yellow and red cards for each team