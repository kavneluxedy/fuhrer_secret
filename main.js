// ! ************************** Variables Declarations ********************************************
var joueurs = new Array();
var arrTeam = new Array(10);
var turn;
var isGameFinished = false;
var currentCandidate = false;
// **************************** Constructor Declaration *****************************************
class JOUEURS { // Declaration of constructor, geter, seter
    constructor(id, htmlId, role, team) {
        (this.id = id), (this.htmlId = htmlId), (this.role = role), (this.team = team), (this.vote = null);
    }
    getId() {
        return this.id;
    }
    getHtmlId() { // int
        return this.htmlId;
    };
    getRole() {
        return this.role;
    }
    getTeam() {
        return this.team;
    }
    getVote() {
        return this.vote;
    }
    setId(id) {
        this.id = id;
    }
    setRole(role) {
        this.role = role;
    }
    setTeam(team) {
        this.team = team;
    }
    setVote(vote) {
        this.vote = vote;
    }
    setHtmlId(htmlId) {
        this.htmlId = htmlId;
    }
}
// ! **********************************************************************************************
function shuffleTeam() { // Randomize the card wrapper, the number of players is 10 (nbLiberals + nbFascists + You-Know-Who)
    let nbLiberals = 6;
    let nbFascists = 3;
    for (let i = 0; i < 10; i++) {
        let rdm = Math.floor(Math.random() * (10 - i) + 1); //Draw a rdm number and defines the arrTeamTab Role
        // console.log("RANDOM :" + rdm); // Debug
        if (rdm <= nbLiberals) {
            arrTeam[i] = "liberals";
            nbLiberals--;
        } else {
            if (rdm > nbLiberals && rdm <= nbLiberals + nbFascists) {
                arrTeam[i] = "fasciste";
                nbFascists--;
            } else {
                arrTeam[i] = "Hitler";
            }
        }
    }
    // console.log(arrTeam); // Debug
}
// ! **********************************************************************************************
function electChanceler() { // start of every turn (election) 
    let eligibility = false;

    // 1. In DOM, display eligibility people.
    // 2. if Click on non-eligible, nothing else election=>startVote()

    for (let i = 0; i < 10; i++) {
        if (joueurs[i].getRole() != "ExPresident" && joueurs[i].getRole() != "ExChanceler" && joueurs[i].getRole() != "President") {
            document.getElementById(joueurs[i].getHtmlId()).style.backgroundColor = "yellowgreen"; // Color if isEligible
        } else {

            document.getElementById(joueurs[i].getHtmlId()).style.backgroundColor = "orange"; // Color isNot
        }
    }


    // console.log(getIdPresident()); // Debug
}
// ! **********************************************************************************************
function init() { // Attribute role at each players
    shuffleTeam();
    let rdm = Math.floor((Math.random() * 10)); // Around an integer between 1 and 10
    // console.log(rdm); // Debug

    for (let i = 0; i < 10; i++) {
        if (rdm == i) {
            joueurs[i] = new JOUEURS(i + 1, i + 1, "President", arrTeam[i]); // i = ID of Each players
        } else {
            joueurs[i] = new JOUEURS(i + 1, i + 1, "Elector", arrTeam[i]);
        }
        // console.log(joueurs[i]); // Debug
    }
    console.log(joueurs); // Debug Display Full Array Players
}
// ! **********************************************************************************************
function getIdPresident() { // Return President's id
    var id = 0;
    let i = 0;
    do {
        id = joueurs[i].getId();
        i++;
    } while (joueurs[i - 1].getRole() != "President");

    return id;
}
// ! **********************************************************************************************
function main() {
    init();
    // while (isGameFinished == false) {
    //     // console.log("Finished");


    //     isGameFinished = true;
    // }

    electChanceler();

}
// ! **********************************************************************************************
function color(id) {

    for (let i = 0; i < joueurs.length; i++) {

        let colorCurrentEligible = document.getElementById(joueurs[i].getHtmlId()).style.backgroundColor;

        if (joueurs[i].getHtmlId() == id && colorCurrentEligible == "blue" && currentCandidate == false) {

            document.getElementById(joueurs[i].getHtmlId()).style.backgroundColor = "yellow";


            console.log(currentCandidate);
            currentCandidate = true;
            console.log(currentCandidate);
        }
    }
    console.log(id);
}
// ! **********************************************************************************************