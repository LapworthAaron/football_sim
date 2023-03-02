

const startBtn = document.getElementById('start-game');
startBtn.addEventListener("click", () => startGame());

startGame = () => {
    let landingPage = document.getElementById('landing-page');
    landingPage.classList.add('hide'); //add a class to the element
    let teamSelection = document.getElementById('team-selection');
    teamSelection.classList.remove('hide');
}
