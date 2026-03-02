// algo.js
document.addEventListener('DOMContentLoaded', () => {
    const zoneTest = document.querySelector(".zoneTest");
    const nextBtn = document.getElementById("next_essai_button");
    const inputReponse = document.getElementById("reponse_sujet");
    const barreSaisie = document.querySelector(".inputNumber");
    const pauseScreen = document.getElementById("pauseScreen");
    const startSessionBtn = document.getElementById("start_session_button");
    const sessionTitle = document.getElementById("sessionTitle");
    
    const data = JSON.parse(localStorage.getItem("questionnaireReponses"));
    if (!data) { window.location.href = "questionnaire.html"; return; }

    let sessions = []; // Contiendra 6 tableaux de 20 essais
    let currentSessionIndex = 0;
    let currentEssaiIndex = 0;

    let associationsNomCouleur = [
        { nom: 1, x: 10, y:10}, { nom: 2, x: 15 , y:46}, { nom: 3, x: 86, y : 84},
        { nom: 4, x: 97, y : 75}, { nom: 5, x: 34, y : 41}, { nom: 6, x: 68, y : 70},
        { nom: 7, x: 46, y : 50}, { nom: 8, x: 25, y : 25}, { nom: 9, x: 5, y : 5},
        { nom: 10, x: 25, y : 13}, { nom: 11, x: 3, y:10}, { nom: 12, x: 51 , y:65},
        { nom: 13, x: 25, y : 86}, { nom: 14, x: 74, y : 16}, { nom: 15, x: 12, y : 90},
        { nom: 16, x: 3, y : 52}, { nom: 17, x: 84, y : 50}, { nom: 18, x: 65, y : 25},
        { nom: 19, x: 94, y : 4}, { nom: 20, x: 65, y : 18}
    ];

    function initialiserExperience() {
        let fullList = [];
        // Création des 120 essais (20 points * 2 contrastes * 3 répétitions)
        for (let i = 1; i <= 20; i++) {
            for (let j = 0; j < 3; j++) {
                fullList.push(["highCercle", i]);
                fullList.push(["lowCercle", i]);
            }
        }
        fullList = shuffle(fullList);

        // Découpage en 6 sessions de 20
        for (let s = 0; s < 6; s++) {
            sessions.push(fullList.splice(0, 20));
        }
    }

    function lancerEssai() {
        // Cacher la saisie pendant le flash
        barreSaisie.classList.add("hidden");
        zoneTest.innerHTML = "";
        inputReponse.value = 0;

        // Vérifier si la session actuelle est finie
        if (currentEssaiIndex >= sessions[currentSessionIndex].length) {
            currentSessionIndex++;
            currentEssaiIndex = 0;
            
            // Vérifier si c'est la fin totale
            if (currentSessionIndex >= sessions.length) {
                window.location.href = "finish.html";
                return;
            } else {
                ouvrirPause();
                return;
            }
        }

        const currentEssai = sessions[currentSessionIndex][currentEssaiIndex];
        const typeCercle = currentEssai[0];
        const nbPoints = currentEssai[1];
        let positions = shuffle([...associationsNomCouleur]);

        // Affichage des points
        for (let i = 0; i < nbPoints; i++) {
            const pointData = positions[i];
            const el = document.createElement("div");
            el.className = "moncercle";
            el.id = typeCercle;
            el.style.position = "absolute";
            el.style.left = (pointData.x / 100) * zoneTest.offsetWidth + "px";
            el.style.top = (pointData.y / 100) * zoneTest.offsetHeight + "px";
            zoneTest.appendChild(el);
        }

        // Flash de 2 secondes
        setTimeout(() => {
            zoneTest.innerHTML = "";
            barreSaisie.classList.remove("hidden");
            inputReponse.focus();
        }, 2000);
    }

    function ouvrirPause() {
        sessionTitle.textContent = `Session ${currentSessionIndex} terminée sur 6`;
        pauseScreen.classList.remove("hidden");
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Bouton Valider (passe à l'essai suivant dans la session)
    nextBtn.addEventListener("click", () => {
        currentEssaiIndex++;
        lancerEssai();
    });

    // Bouton Pause (lance la session suivante)
    startSessionBtn.addEventListener("click", () => {
        pauseScreen.classList.add("hidden");
        lancerEssai();
    });

    initialiserExperience();
    lancerEssai(); // Démarre direct la session 1
});