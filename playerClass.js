// class for players
// will hold stats objects

class Player {
    constructor(id, name, age, club, position, rating, value, wage, joined, until) {
        this.id = id,
        this.name = name;
        this.age = age;
        this.club = club;
        this.position = position,
        this.rating = rating,
        this.value = value,
        this.wage = wage,
        this.joined = joined,
        this.until = until
        this.stats = {
            goals: 0,
            yellowCards: 0,
            redCards: 0,
            games: 0
        }
    }

    //takes how many goals to add
    addGoals(goals) {
        this.stats.goals += goals;
    }

    //takes how many goals to add
    addYellow() {
        this.stats.yellowCards++;
    }

    //takes how many goals to add
    addRed() {
        this.stats.redCards++;
    }

    //takes how many games to add
    addGames() {
        this.stats.games++;
    }

    //increase a players rating by a value
    increaseRating(value) {
        this.rating += value;
    }

    //increase a players value by a value
    increaseRating(value) {
        this.value += value;
    }

    //takes how many goals to add
    increaseAge() {
        this.age++;
    }

}

// const temp = new Player("aaron","mid",500,1500000);
// temp.addYellow();
// console.log(temp);

// fetch("./playerList.json")
// .then(response => {
//    return response.json();
// })
// .then(data => console.log(data));

// const players = temp.map(item => {
//     new Player(item.key, item.firstName, item.lastName, item.position, Math.random() * (1000 - 1), Math.random() * (1000 - 1))
//     }
// )

// console.log(players);