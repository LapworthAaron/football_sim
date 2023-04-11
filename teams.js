// class for teams
// will hold player objects
// class teams


const teamView = (team) => {
    
    let teamPlayers = sortPlayerArray(players, team);

    if (document.getElementById("table")) {
        table = document.getElementById("table");
        table.remove();
        table.removeEventListener('click',(event) => tableRowSelect(event, team));
    }

    if (document.getElementById('teamTable')) {
        let teamTable = document.getElementById('teamTable');
        teamTable.remove();
    };
    let teamPage = document.getElementById("team-page");
    let table = document.createElement('table');
    table.setAttribute('id', 'teamTable');
    teamPage.append(table);
    let tr = document.createElement('tr');
    tr.setAttribute('id', 'tableHeader');
    table.append(tr);
    let name = document.createElement('th');
    name.innerText = "Name";
    tr.append(name);
    let pos = document.createElement('th');
    pos.innerText = "Pos";
    tr.append(pos);
    let rating = document.createElement('th');
    rating.innerText = "Rating";
    tr.append(rating);
    let value = document.createElement('th');
    value.innerText = "Value";
    tr.append(value);
    let wage = document.createElement('th');
    wage.innerText = "Wage";
    tr.append(wage);

    teamPlayers.forEach(item => {
        let tr = document.createElement('tr');
        tr.setAttribute('id', item.name.replace(/\s/g, ""));
        table.append(tr);
        const playerName = document.createElement('td');
        playerName.innerText = item.name;
        tr.append(playerName);
        const playerPos = document.createElement('td');
        playerPos.innerText = item.pos;
        tr.append(playerPos);
        const playerRating = document.createElement('td');
        playerRating.innerText = item.rating;
        tr.append(playerRating);
        if (item.value.toString().length >= 7) {
            value = `£${item.value/1000000}m`;
        } else if (item.value.toString().length >= 4) {
            value = `£${item.value/1000}k`;
        } else {
            value = item.value
        };
        const playerValue = document.createElement('td');
        playerValue.innerText = value;
        tr.append(playerValue);
        if (item.wage.toString().length >= 7) {
            wage = `£${item.wage/1000000}m`;
        } else if (item.wage.toString().length >= 4) {
            wage = `£${item.wage/1000}k`;
        } else {
            wage = item.wage
        };
        const playerWage = document.createElement('td');
        playerWage.innerText = wage;
        tr.append(playerWage);
    });

    table.addEventListener('click',(event) => tableRowSelect(event, team));
}

const tableRowSelect = (event, team) => {
    let oldSelected = document.querySelector('.selected');
    let selected = document.getElementById(event.target.parentElement.id);
    let selectedTag = event.target.parentElement.localName;
    let selectedID = event.target.parentElement.id;

    if (oldSelected && selected !== oldSelected && selectedTag === "tr" && selectedID !== "tableHeader") {
        let teamPlayers = sortPlayerArray(players, team);
        const nonTeamPlayers = players.filter(data => data.club !== team).sort((a,b) => {
            let fa = a.pos,
                fb = b.pos;
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0
        });
        let newPos = teamPlayers.find(item => item.name.replace(/\s/g, "") === selected.id).pos;
        let oldPos = teamPlayers.find(item => item.name.replace(/\s/g, "") === oldSelected.id).pos;
        let newIndex = teamPlayers.map(item => item.name.replace(/\s/g, "")).indexOf(selected.id);
        let oldIndex = teamPlayers.map(item => item.name.replace(/\s/g, "")).indexOf(oldSelected.id);
        teamPlayers[newIndex].pos = oldPos;
        teamPlayers[oldIndex].pos = newPos;
        let tempObj = teamPlayers[newIndex];
        teamPlayers[newIndex] = teamPlayers[oldIndex];
        teamPlayers[oldIndex] = tempObj;
        players = teamPlayers.concat(nonTeamPlayers);
        oldSelected.classList.remove('selected');
        teamView(team);
    } else if (selectedTag === "tr" && selectedID !== "tableHeader") {
        selected.classList.add('selected');
    }
}

const sortPlayerArray = (array, team) => {
    return array.filter(data => data.club === team).sort((a,b) => {
        const teamOrder = ['G','D','M','F','S'];
        let fa = teamOrder.indexOf(a.pos),
            fb = teamOrder.indexOf(b.pos);
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0
    })
}
    