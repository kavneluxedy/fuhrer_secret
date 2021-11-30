// ? ATTENTION AU VERIFICATION DANS LES BOUCLES PETIT MALIN !!!
// ! ATTENTION AU VERIFICATION DANS LES BOUCLES PETIT MALIN !!!
// * ATTENTION AU VERIFICATION DANS LES BOUCLES PETIT MALIN !!!
// ! ****************************************************************************************************************************************************************************
// ! ************************** Variables Declarations ********************************************
// ! ****************************************************************************************************************************************************************************
var joueurs = new Array();
var arrTeam = new Array(10);
var turn;
var isGameFinished = false;
var currentCandidate = false;
var timer = 0; // !
var clock;
var clock2;
var countYes = 0;
// *****************************************************************************************************************************************************************************
// **************************** Constructor Declaration ********************************************
// *****************************************************************************************************************************************************************************
class JOUEURS {
    // Declaration of constructor, geter, seter
    constructor(id, htmlId, role, team, vote) {
        (this.id = id),
        (this.htmlId = htmlId),
        (this.role = role),
        (this.team = team),
        (this.vote = null); // ? ** Ceci est fucking normal ???
    }
    getId() {
        return this.id;
    }
    getHtmlId() {
        // int
        return this.htmlId;
    }
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
} // ! ****************************************************************************************************************************************************************************
function shuffleTeam() {
    // Randomize the card wrapper, the number of players is 10 (nbLiberals + nbFascists + You-Know-Who)
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
} // ! ****************************************************************************************************************************************************************************
function electChanceler() {
    // start of every turn (election)
    let eligibility = false;
    // 1. In DOM, display eligibility people.
    // 2. if Click on non-eligible, nothing else election=>startVote()
    for (let i = 0; i < 10; i++) {
        // is Eligible Loop
        if (
            joueurs[i].getRole() != "ExPresident" &&
            joueurs[i].getRole() != "ExChanceler" &&
            joueurs[i].getRole() != "President"
        ) {
            document.getElementById(joueurs[i].getHtmlId()).style.backgroundColor =
                "yellowgreen"; // Color if isEligible
        } else {
            document.getElementById(joueurs[i].getHtmlId()).style.backgroundColor =
                "orange"; // Color isNot
        }
    }
} // ! ****************************************************************************************************************************************************************************
function playersChoices(box, id) {
    joueurs[id - 1].setVote(box.checked);
    console.log(joueurs[id - 1].getVote()); // ! Debug
} // ! ****************************************************************************************************************************************************************************
function init() {
    // Attribute role at each players
    shuffleTeam();
    let rdm = Math.floor(Math.random() * 10); // Around an integer between 1 and 10
    // console.log(rdm); // Debug

    for (let i = 0; i < 10; i++) {
        if (rdm == i) {
            joueurs[i] = new JOUEURS(i + 1, i + 1, "President", arrTeam[i]); // i = ID of Each players
        } else {
            joueurs[i] = new JOUEURS(i + 1, i + 1, "Elector", arrTeam[i]);
        }
        // console.log(joueurs[i]); // Debug
    }
    // console.log(joueurs); // Debug Display Full Array Players
} // ! ****************************************************************************************************************************************************************************
function getIdPresident() {
    // Return President's id
    var id = 0;
    let i = 0;
    do {
        id = joueurs[i].getId();
        i++;
    } while (joueurs[i - 1].getRole() != "President");

    return id;
} // ! ****************************************************************************************************************************************************************************
function color(id) {
    // * Highlight a current candidate for Election

    for (let i = 0; i < joueurs.length; i++) {
        let colorCurrentEligible = document.getElementById(joueurs[i].getHtmlId())
            .style.backgroundColor;

        if (
            joueurs[i].getHtmlId() == id &&
            colorCurrentEligible == "yellowgreen" &&
            currentCandidate == false
        ) {
            document.getElementById(joueurs[i].getHtmlId()).style.backgroundColor =
                "white";
            currentCandidate = true;
        }
    }
    // console.log(id); // ! Debug
} // ! ****************************************************************************************************************************************************************************
function stopTimer() {
    console.log("entrer stopTimer");
    if (countYes >= 0) {
        alert("Elu");
    } else {
        alert("Pas élu");
    }
    clearTimeout(clock);
    clearTimeout(clock2);
    console.log(countYes);
    var inputs = document.getElementsByTagName("input");
    for (let i = 0; i < joueurs.length; i++) {
        inputs[i].checked = false;
    }
}

function time() {
    clock = setTimeout(time, 1000);
    clock2 = setTimeout(stopTimer, 3000); // ! W.I.P !!! Clock2
    // * Récupérer le vote de chaque joueur
    countYes = 0;
    for (let i = 0; i < joueurs.length; i++) {
        if (joueurs[i].getVote() == true) {
            // Si chaque joueur a un vote positif pour le candidat
            // console.log(joueurs[i].getVote());
            countYes++;
        } else {
            countYes--;
        }
    }
    // console.log(joueurs);
    timer++;
    console.log("timer ::::" + timer);
    clearTimeout(); // ! clearTimeout
}
// ! ****************************************************************************************************************************************************************************
// ! ****************************************************************************************************************************************************************************
function main() {
    init(); // while (isGameFinished == false) {
    electChanceler();
    time(); // Call vote's timer

    //     // console.log("Finished");

    //     isGameFinished = true;
    // }
}
// ! ****************************************************************************************************************************************************************************