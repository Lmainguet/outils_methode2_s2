// algo.js
document.addEventListener('DOMContentLoaded', () => {
    const zoneTest = document.querySelector(".zoneTest");
    const nextBtn = document.getElementById("next_essai_button");
    const inputReponse = document.getElementById("reponse_sujet");
    const barreSaisie = document.querySelector(".inputNumber");
    const pauseScreen = document.getElementById("pauseScreen");
    const startSessionBtn = document.getElementById("start_session_button");
    const sessionTitle = document.getElementById("sessionTitle");
    let zonex = zoneTest.offsetWidth;
    let zoney = zoneTest.offsetHeight;
    
    const data = JSON.parse(localStorage.getItem("questionnaireReponses"));
    if (!data) { window.location.href = "questionnaire.html"; return; }

    let sessions = []; // Contiendra 6 tableaux de 20 essais
    let currentSessionIndex = 0;
    let currentEssaiIndex = 0;
    let session = new SessionClass();
    let essaie = new EssaieClass();
    
    let ExperiencesData = {
        questionnaire: data,
        experience: session
    };
    
    const zone1 = { xmin: 5, xmax: (zonex/4)-6, ymin: 5, ymax: (zoney/5)-6 };
    const zone2 = { xmin: (zonex/3)+6, xmax: (2*zonex/3)-6, ymin: 5, ymax: (zoney/2)-6 };
    const zone3 = { xmin: (2*zonex/3)+6, xmax: zonex-9, ymin: 5, ymax: (zoney/2)-6};
    const zone4 = { xmin: 5, xmax: (zonex/3)-6, ymin: (zoney/2)+6, ymax: zoney-6 };
    const zone5 = { xmin: (zonex/3)+6, xmax: (2*zonex/3)-6, ymin: (zoney/2)+6, ymax: zoney-6 };
    const zone6 = { xmin: (2*zonex/3)+6, xmax: zonex-6, ymin: (zoney/2)+6, ymax: zoney-6 };
    const zones = [zone1, zone2, zone3, zone4, zone5, zone6];

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
                savedata(ExperiencesData);
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
        essaie.index = currentEssaiIndex;
        essaie.couleur = typeCercle;
        essaie.nbPoints = nbPoints;

        // Affichage des points
        for (let i = 0; i < nbPoints; i++) {
            let randomZone = getRandomInt(6);
            const positions = randomXY(zones[randomZone]);
            console.log(i, "zone : ", randomZone, zones[randomZone], ", positions : ", positions)
            const el = document.createElement("div");
            el.className = "moncercle";
            el.id = typeCercle;
            el.style.position = "absolute";
            el.style.left = positions.x  + "px";
            el.style.top = positions.y + "px";
            zoneTest.appendChild(el);
            essaie.addData({x: positions.x, y: positions.y});
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
        session.addData(essaie.getDonnees());
        essaie.suppDOnnes();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // selectionne aleatoirement un x et y dans la zone donnée
    function randomXY(zone) {
        const x = Math.floor(Math.random() * (zone.xmax - zone.xmin)) + zone.xmin;
        const y = Math.floor(Math.random() * (zone.ymax - zone.ymin)) + zone.ymin;
        return {x, y};
    }

    // Bouton Valider (passe à l'essai suivant dans la session)
    nextBtn.addEventListener("click", () => {
        essaie.reponse = inputReponse.value;
        
        session.addData(essaie.getDonnees());
        currentEssaiIndex++;
        lancerEssai();
    });

    // Bouton Pause (lance la session suivante)
    startSessionBtn.addEventListener("click", () => {
        pauseScreen.classList.add("hidden");
        ExperiencesData.experience.push(session.getDonnees());
        session = new SessionClass(); // Réinitialiser la session
        lancerEssai();
    });

    initialiserExperience();
    lancerEssai(); // Démarre direct la session 1
});