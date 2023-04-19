const seasonGenerator = () => {
    const leagueArr = ["epl","champ","efl1","efl2"];

    leagueArr.forEach(item => eachLeague(item))
};

const eachLeague = (leagueName) => {
    const league = teams.filter(item => item.league === leagueName).sort(function(a, b){return 0.5 - Math.random()});
    
    let newLeague = league;
    let LeagueFixtureArr = [];
    for (let round = 1; round < league.length; round++) {
        for (let i = 0; i < league.length / 2; i++) {
            LeagueFixtureArr.push({
                "round": round,
                "home": newLeague[i].team,
                "away": newLeague[(league.length - 1) - i].team
            });
        };
        toggleTeamPos(newLeague);
    };

    const reverse = LeagueFixtureArr.map(item => {
        return {"round":item.round + 19, "home":item.away, "away":item.home};
    });

    fixtures.push(...LeagueFixtureArr);
    fixtures.push(...reverse);
}

const toggleTeamPos = (teamArray) => {
    const staticTeam = teamArray.shift();
    const lastTeam = teamArray.pop();
    teamArray.unshift(lastTeam);
    teamArray.unshift(staticTeam);
    return teamArray;
}

const showSchedule = (team) => {
    let roundCounter = round;
    let temp = fixtures.filter(item => 
        item.round === roundCounter && (item.home === team || item.away === team));
    console.log(temp);

    let schedulePage = document.getElementById("schedule-page");
    let roundHeading = document.createElement('h2');
    roundHeading.setAttribute('id', 'roundHeading');
    roundHeading.innerText = `Week: ${temp[0].round}`;
    schedulePage.append(roundHeading);
    let homeTeam = document.createElement('h3');
    homeTeam.setAttribute('id', 'homeTeam');
    homeTeam.innerText = temp[0].home;
    schedulePage.append(homeTeam);
    let awayTeam = document.createElement('h3');
    awayTeam.setAttribute('id', 'awayTeam');
    awayTeam.innerText = temp[0].away;
    schedulePage.append(awayTeam);
}
