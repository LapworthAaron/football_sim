

const startBtn = document.getElementById('start-game');
startBtn.addEventListener("click", () => toggle('landing-page','team-selection'));

toggle = (current,newpage) => {
    let current_ = document.getElementById(current);
    current_.classList.add('hide'); //add a class to the element
    let newpage_ = document.getElementById(newpage);
    newpage_.classList.remove('hide');
}

document.getElementById("league-dropdown").onchange = (e) => {
    league = e.srcElement.value;
    let teamDrop = document.getElementById("team-dropdown");
    if (league === "epl" ) {
        teamDrop.innerHTML = '';
        const team = document.createElement('option');
        team.setAttribute("value","arsenal");
        team.innerText = 'Arsenal';
        teamDrop.append(team);
    }
};

const teamBtn = document.getElementById("teamBtn");
teamBtn.addEventListener("click", () => selectTeam());

selectTeam = () => {
    let teamDrop = document.getElementById("team-dropdown");
    let team = "";
    if (teamDrop != "") {
        team = teamDrop.value;
        toggle('team-selection','main-menu');
        let teamName = document.getElementById('team-name');
        teamName.innerText = team;
    };
}

const teamPageBtn = document.getElementById("teamPageBtn");
teamPageBtn.addEventListener("click", () => toggle('main-menu','team-page'));
const leaguePageBtn = document.getElementById("leaguePageBtn");
leaguePageBtn.addEventListener("click", () => toggle('main-menu','league-page'));
const transferPageBtn = document.getElementById("transferPageBtn");
transferPageBtn.addEventListener("click", () => toggle('main-menu','transfer-page'));
const schedulePageBtn = document.getElementById("schedulePageBtn");
schedulePageBtn.addEventListener("click", () => toggle('main-menu','schedule-page'));
const historyPageBtn = document.getElementById("historyPageBtn");
historyPageBtn.addEventListener("click", () => toggle('main-menu','history-page'));