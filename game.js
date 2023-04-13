let home = [];
let away = [];

// loadGameData = (team) => {
loadGameData = (homeTeam, awayTeam) => {
    // if team === temp[0].home ? : ; //for colouring scorers
    home.push(players.filter(item => item.club === homeTeam && item.position !== "S"));
    away.push(players.filter(item => item.club === awayTeam && item.position !== "S"));
    if (homeTeam === teamSelected || awayTeam === teamSelected) {
        document.getElementById("homeTeam").innerText = homeTeam;
        document.getElementById("awayTeam").innerText = awayTeam;
    }
}

runGame = (homeObj, awayObj) => {
    var count = 0;
    document.removeEventListener("click", resetGameScreen());
    var interval = setInterval(function(){
        let time = document.getElementById("time");
        if (count != 0) {
            time.innerText++;
        }
        if (count === 90){
            time.innerText = ("Full Time");
            document.getElementById("nextResultsBtn").classList.remove("hide");
            clearInterval(interval); // Stopping the counter when reaching 91.
        }
        homeObj.forEach(item => {
            if (item.time === count && item.goal ==="GOAL") {
                let homeScore = document.getElementById("homeScore");
                homeScore.innerText++;
                let homeScorer = document.getElementById("homeScorer");
                homeScorer.innerText += `${count} - ${item.scorer.name} \n`;
            }
        });
        awayObj.forEach(item => {
            if (item.time === count && item.goal ==="GOAL") {
                let awayScore = document.getElementById("awayScore");
                awayScore.innerText++;
                let awayScorer = document.getElementById("awayScorer");
                awayScorer.innerText += `${count} - ${item.scorer.name} \n`;
            }
        });
        count++;
    }, 100);

    const nextResultsBtn = document.getElementById("nextResultsBtn");
    nextResultsBtn.addEventListener("click", () => resetGameScreen());
}

let gameObj = [];
let results = [];

const startGame = document.getElementById("startGame");
startGame.addEventListener("click", () => {
    gameObj = [];
    results = []; //remove this later, adding round
    startGame.classList.add("hide");
    for (let i = 0; i < home.length; i++) {
        gameObj.push(game(home[i][0].club, home[i], away[i][0].club, away[i]));
    };
    gameObj.forEach(item => {
        if (item.homeName === teamSelected || item.awayName === teamSelected) {
            runGame(item.homeChanceObj, item.awayChanceObj);
            const homeScore = item.homeChanceObj.filter(row => row.goal === "GOAL").length;
            const awayScore = item.awayChanceObj.filter(row => row.goal === "GOAL").length;
            summariseResults(item.homeName, homeScore, item.awayName, awayScore);
            results.push({"home": item.homeName, "homeScore": homeScore, "awayScore": awayScore, "away": item.awayName});
        } else {
            const homeScore = item.homeChanceObj.filter(row => row.goal === "GOAL").length;
            const awayScore = item.awayChanceObj.filter(row => row.goal === "GOAL").length;
            summariseResults(item.homeName, homeScore, item.awayName, awayScore);
            results.push({"home": item.homeName, "homeScore": homeScore, "awayScore": awayScore, "away": item.awayName});
        }
    });
});

const summariseResults = (home, homeScore, away, awayScore) => {
    const homeIndex = teams.findIndex(element => {
        if (element.team === home) {
            return true;
        }
    });
    const awayIndex = teams.findIndex(element => {
        if (element.team === away) {
            return true;
        }
    });

    teams[homeIndex].addScores(homeScore, awayScore);
    teams[awayIndex].addScores(awayScore, homeScore);

    if (homeScore > awayScore) {
        teams[homeIndex].addGame("wins");
        teams[awayIndex].addGame("losses");
    } else if (homeScore === awayScore) {
        teams[homeIndex].addGame("draws");
        teams[awayIndex].addGame("draws");
    } else {
        teams[homeIndex].addGame("losses");
        teams[awayIndex].addGame("wins");
    }
}

const resetGameScreen = () => {
    document.getElementById("homeScore").innerText = "0";
    document.getElementById("homeScorer").innerText = "";
    document.getElementById("awayScore").innerText = "0";
    document.getElementById("awayScorer").innerText = "";
    document.getElementById("time").innerText = "0";
}
