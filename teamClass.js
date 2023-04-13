// class for teams
//holds past season performance

class Team {
    constructor(id, league, team, season) {
        this.id = id,
        this.league = league;
        this.team = team;
        this.season = season,
        this.wins = 0,
        this.draws = 0,
        this.losses = 0,
        this.games = 0,
        this.scored = 0,
        this.conceded = 0
        this.pastSeasons = [];
    }

    //increments a win, draw or loss to the current season
    addGame(gameType) {
        this[gameType]++;
        this.games++;
    }

    //add goals scored and conceded from games
    addscores(scored, conceded) {
        this.scored += scored;
        this.conceded += conceded;
    }

}
