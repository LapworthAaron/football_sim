let home = [];
let away = [];

// loadGameData = (team) => {
loadGameData = (homeTeam, awayTeam) => {
    // let temp = fixtures.filter(item => 
    //     item.round === roundCounter && (item.home === team || item.away === team));
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
    nextResultsBtn.addEventListener("click", () => {
        document.getElementById("homeScore").innerText = "0";
        document.getElementById("homeScorer").innerText = "";
        document.getElementById("awayScore").innerText = "0";
        document.getElementById("awayScorer").innerText = "";
        document.getElementById("time").innerText = "0";
    });
}

let gameObj = [];

const startGame = document.getElementById("startGame");
startGame.addEventListener("click", () => {
    gameObj = [];
    startGame.classList.add("hide");
    for (let i = 0; i < home.length; i++) {
        gameObj.push(game(home[i][0].club, home[i], away[i][0].club, away[i]));
    }
    console.log(gameObj);
    gameObj.forEach(item => {
        // console.log(item.homeChanceObj);
        if (item.homeName === teamSelected || item.awayName === teamSelected) {
            runGame(item.homeChanceObj, item.awayChanceObj);
            // console.log(item.homeChanceObj);
            item.homeChanceObj.filter(row => row.goal === "GOAL");
            item.awayChanceObj.filter(row => row.goal === "GOAL");
        } else {

        }
        
    })

    // runGame(gameObj.homeChanceObj, gameObj.awayChanceObj);
});