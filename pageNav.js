let players = [];
let teams = [];
let teamSelected = "";
let fixtures = [];
let round = 1;

fetch("./playerList.json")
    .then(response => {
        return response.json();
    })
    .then(data => players = data);

fetch("./teams.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        teams = data;
    });

const startBtn = document.getElementById('start-game');
startBtn.addEventListener("click", () => toggle('landing-page','team-selection'));



const toggle = (current,newpage) => {
    let current_ = document.getElementById(current);
    current_.classList.add('hide'); //add a class to the element
    let newpage_ = document.getElementById(newpage);
    newpage_.classList.remove('hide');
}

document.getElementById("league-dropdown").onchange = (e) => {
    const league = e.srcElement.value;
    let teamDrop = document.getElementById("team-dropdown");
    //remove all children of team dropdown
    while (teamDrop.firstChild) {
        teamDrop.removeChild(teamDrop.lastChild);
    }
    //get team list from array of objs and sort
    const teamList = teams.filter(data => data.league == league).sort((a,b) => {
        let fa = a.team,
            fb = b.team;
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0
    });
    teamList.forEach(item => {
        const team = document.createElement('option');
        team.setAttribute("value",item.team);
        team.innerText = item.team;
        teamDrop.append(team);
    })
};

const teamBtn = document.getElementById("teamBtn");
teamBtn.addEventListener("click", () => selectTeam());

selectTeam = () => {
    let teamDrop = document.getElementById("team-dropdown");
    if (teamDrop != "") {
        teamSelected = teamDrop.value;
        toggle('team-selection','main-menu');
        let teamName = document.getElementById('team-name');
        teamName.innerText = teamSelected;
        seasonGenerator();
    };
}

const teamPageBtn = document.getElementById("teamPageBtn");
teamPageBtn.addEventListener("click", () => {
    toggle('main-menu','team-page');
    teamView(teamSelected);
});
const leaguePageBtn = document.getElementById("leaguePageBtn");
leaguePageBtn.addEventListener("click", () => toggle('main-menu','league-page'));

const transferPageBtn = document.getElementById("transferPageBtn");
transferPageBtn.addEventListener("click", () => toggle('main-menu','transfer-page'));

const schedulePageBtn = document.getElementById("schedulePageBtn");
schedulePageBtn.addEventListener("click", () => {
    toggle('main-menu','schedule-page');
    showSchedule(teamSelected);
});
const historyPageBtn = document.getElementById("historyPageBtn");
historyPageBtn.addEventListener("click", () => toggle('main-menu','history-page'));

const nextGameBtn = document.getElementById("nextGameBtn");
nextGameBtn.addEventListener("click", () => {
    toggle('main-menu','game-screen');
    loadGameData(teamSelected);
});

const teamMainBtn = document.getElementById("teamMainBtn");
teamMainBtn.addEventListener("click", () => toggle('team-page','main-menu'));

const leagueMainBtn = document.getElementById("leagueMainBtn");
leagueMainBtn.addEventListener("click", () => toggle('league-page','main-menu'));

const transferMainBtn = document.getElementById("transferMainBtn");
transferMainBtn.addEventListener("click", () => toggle('transfer-page','main-menu'));

const scheduleMainBtn = document.getElementById("scheduleMainBtn");
scheduleMainBtn.addEventListener("click", () => toggle('schedule-page','main-menu'));

const historyMainBtn = document.getElementById("historyMainBtn");
historyMainBtn.addEventListener("click", () => toggle('history-page','main-menu'));

const nextMainBtn = document.getElementById("nextMainBtn");
nextMainBtn.addEventListener("click", () => {
    toggle('game-screen','main-menu');
    document.getElementById("startGame").classList.remove("hide");
    document.getElementById("nextMainBtn").classList.add("hide");
});