// class for teams
// will hold stats objects

class Player {
    constructor(key, firstName, lastName, position, rating, value) {
        this.key = key,
        this.firstName = nfirstNameme;
        this.lastName = lastName;
        this.age = age;
        this.position = position,
        this.rating = rating,
        this.value = value,
        this.stats = {
            goals: 0,
            yellowCards: 0,
            redCards: 0,
            games: 0
        }
    }

    //takes how many goals to add
    addGoals(goals) {
        return this.stats.goals + goals;
    }

    //takes how many goals to add
    addYellow() {
        this.stats.yellowCards++;
    }

    //takes how many goals to add
    addRed() {
        this.stats.redCards++;
    }

    //takes how many goals to add
    addGoals() {
        this.stats.games++;
    }

    //increase a players rating by a value
    increaseRating(value) {
        return this.rating + value;
    }

    //increase a players value by a value
    increaseRating(value) {
        return this.value + value;
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