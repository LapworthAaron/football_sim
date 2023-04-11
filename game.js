// const home = [
//     {pos : "gk", name: "kepa",
//           score: 600},
//     {pos : "def", name: "james",
//             score: 700},
//     {pos : "def", name: "silva",
//             score: 654},
//     {pos : "def", name: "chilwell",
//             score: 544},
//     {pos : "def", name: "fofana",
//             score: 691},
//     {pos : "mid", name: "ziyech",
//             score: 510},
//     {pos : "mid", name: "pulisic",
//             score: 495},
//     {pos : "mid", name: "kanté",
//             score: 789},
//     {pos : "mid", name: "mount",
//             score: 632},
//     {pos : "att", name: "sterling",
//             score: 801},
//     {pos : "att", name: "felix",
//             score: 650}
// ];

// const away = [
//     {pos : "gk", name: "ederson",
//           score: 721},
//     {pos : "def", name: "walker",
//             score: 700},
//     {pos : "def", name: "dias",
//             score: 723},
//     {pos : "def", name: "ake",
//             score: 620},
//     {pos : "def", name: "laporte",
//             score: 691},
//     {pos : "mid", name: "grealish",
//             score: 680},
//     {pos : "mid", name: "silva",
//             score: 756},
//     {pos : "mid", name: "de bruyne",
//             score: 950},
//     {pos : "mid", name: "foden",
//             score: 810},
//     {pos : "att", name: "haaland",
//             score: 801},
//     {pos : "att", name: "alvarez",
//             score: 690}
// ]

let home = [];
let away = [];

loadGameData = (team) => {
    let roundCounter = round;
    let temp = fixtures.filter(item => 
        item.round === roundCounter && (item.home === team || item.away === team));
    // if team === temp[0].home ? : ;
    home = players.filter(item => item.club === temp[0].home && item.pos !== "S");
    away = players.filter(item => item.club === temp[0].away && item.pos !== "S");
    console.log(home);
    console.log(away);
    document.getElementById("homeTeam").innerText = temp[0].home;
    document.getElementById("awayTeam").innerText = temp[0].away;
}

runGame = (homeObj, awayObj) => {
    var count = 0;
    var interval = setInterval(function(){
        let time = document.getElementById("time");
        if (count != 0) {
            time.innerText++;
        }
        if (count === 90){
            console.log("Full Time");
            time.innerText = ("Full Time");
            clearInterval(interval); // Stopping the counter when reaching 91.
        }
        homeObj.forEach(item => {
            if (item.time === count && item.goal ==="GOAL") {
                console.log(`${count} - ${JSON.stringify(item.goal)} - ${JSON.stringify(item.scorer.name)}`);
                let homeScore = document.getElementById("homeScore");
                homeScore.innerText++;
                let homeScorer = document.getElementById("homeScorer");
                homeScorer.innerText += `${count} - ${item.scorer.name} \n`;
            }
        });
        awayObj.forEach(item => {
            if (item.time === count && item.goal ==="GOAL") {
                console.log(`${count} - ${JSON.stringify(item.goal)} - ${JSON.stringify(item.scorer.name)}`);
                let awayScore = document.getElementById("awayScore");
                awayScore.innerText++;
                let awayScorer = document.getElementById("awayScorer");
                awayScorer.innerText += `${count} - ${item.scorer.name} \n`;
            }
        });
        count++;
    }, 100);

    const nextMainBtn = document.getElementById("nextMainBtn");
    nextMainBtn.classList.remove("hide");
    nextMainBtn.addEventListener("click", () => {
        document.getElementById("homeScore").innerText = "0";
        document.getElementById("homeScorer").innerText = "";
        document.getElementById("awayScore").innerText = "0";
        document.getElementById("awayScorer").innerText = "";
        document.getElementById("time").innerText = "0";
    });
}

let gameObj = {};

const startGame = document.getElementById("startGame");
startGame.addEventListener("click", () => {
    startGame.classList.add("hide");
    gameObj = game(home, away);
    console.log(gameObj);
    runGame(gameObj.homeChanceObj, gameObj.awayChanceObj);
});