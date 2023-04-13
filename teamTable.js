
const teamView = (team) => {
    
    let teamPlayers = sortPlayerArray(players, team);

    if (document.getElementById('teamBody')) {
        let teamBody = document.getElementById('teamBody');
        teamBody.remove();
        teamBody.removeEventListener('click',(event) => tableRowSelect(event, team));
    };
    const table = document.getElementById('teamTable')
    let teamBody = document.createElement('tbody');
    teamBody.setAttribute("id", "teamBody");
    table.append(teamBody);

    teamPlayers.forEach(item => {
        let tr = document.createElement('tr');
        tr.setAttribute('id', item.name.replace(/\s/g, ""));
        teamBody.append(tr);
        const playerName = document.createElement('td');
        playerName.innerText = item.name;
        tr.append(playerName);
        const playerPos = document.createElement('td');
        playerPos.innerText = item.position;
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

    teamBody.addEventListener('click',(event) => tableRowSelect(event, team));
}

const tableRowSelect = (event, team) => {
    let oldSelected = document.querySelector('.selected');
    let selected = document.getElementById(event.target.parentElement.id);
    let selectedTag = event.target.parentElement.localName;
    let selectedID = event.target.parentElement.id;

    if (oldSelected && selected !== oldSelected && selectedTag === "tr" && selectedID !== "tableHeader") {
        let teamPlayers = sortPlayerArray(players, team);
        const nonTeamPlayers = players.filter(data => data.club !== team).sort((a,b) => {
            let fa = a.position,
                fb = b.position;
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0
        });
        let newPos = teamPlayers.find(item => item.name.replace(/\s/g, "") === selected.id).position;
        let oldPos = teamPlayers.find(item => item.name.replace(/\s/g, "") === oldSelected.id).position;
        let newIndex = teamPlayers.map(item => item.name.replace(/\s/g, "")).indexOf(selected.id);
        let oldIndex = teamPlayers.map(item => item.name.replace(/\s/g, "")).indexOf(oldSelected.id);
        teamPlayers[newIndex].position = oldPos;
        teamPlayers[oldIndex].position = newPos;
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
        let fa = teamOrder.indexOf(a.position),
            fb = teamOrder.indexOf(b.position);
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0
    })
}
    