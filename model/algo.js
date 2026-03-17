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
    
    const zone1 = { xmin: 0, xmax: (zonex/5)-5, ymin: 0, ymax: (zoney/5)-5 };
    const zone2 = { xmin: (zonex/5), xmax: (2*zonex/5)-5, ymin: 0, ymax: (zoney/5)-5 };
    const zone3 = { xmin: (2*zonex/5), xmax: (3*zonex/5)-5, ymin: 0, ymax: (zoney/5)-5 };
    const zone4 = { xmin: (3*zonex/5), xmax: (4*zonex/5)-5, ymin: 0, ymax: (zoney/5)-5 };
    const zone5 = { xmin: (4*zonex/5), xmax: zonex-5, ymin: 0, ymax: (zoney/5)-5 };

    const zone6 = { xmin: 0, xmax: (zonex/5)-5, ymin: (zoney/5), ymax: (2*zoney/5)-5 };
    const zone7 = { xmin: (zonex/5), xmax: (2*zonex/5)-5, ymin: (zoney/5), ymax: (2*zoney/5)-5 };
    const zone8 = { xmin: (2*zonex/5), xmax: (3*zonex/5)-5, ymin: (zoney/5), ymax: (2*zoney/5)-5 };
    const zone9 = { xmin: (3*zonex/5), xmax: (4*zonex/5)-5, ymin: (zoney/5), ymax: (2*zoney/5)-5 };
    const zone10 = { xmin: (4*zonex/5), xmax: zonex-5, ymin: (zoney/5), ymax: (2*zoney/5)-5 };
    const zone11 = { xmin: 0, xmax: (zonex/5)-5, ymin: (2*zoney/5), ymax: (3*zoney/5)-5 };
    const zone12 = { xmin: (zonex/5), xmax: (2*zonex/5)-5, ymin: (2*zoney/5), ymax: (3*zoney/5)-5 };
    const zone13 = { xmin: (2*zonex/5), xmax: (3*zonex/5)-5, ymin: (2*zoney/5), ymax: (3*zoney/5)-5 };
    const zone14 = { xmin: (3*zonex/5), xmax: (4*zonex/5)-5, ymin: (2*zoney/5), ymax: (3*zoney/5)-5 };
    const zone15 = { xmin: (4*zonex/5), xmax: zonex-5, ymin: (2*zoney/5), ymax: (3*zoney/5)-5 };
    const zone16 = { xmin: 0, xmax: (zonex/5)-5, ymin: (3*zoney/5), ymax: (4*zoney/5)-5 };
    const zone17 = { xmin: (zonex/5), xmax: (2*zonex/5)-5, ymin: (3*zoney/5), ymax: (4*zoney/5)-5 };
    const zone18 = { xmin: (2*zonex/5), xmax: (3*zonex/5)-5, ymin: (3*zoney/5), ymax: (4*zoney/5)-5 };
    const zone19 = { xmin: (3*zonex/5), xmax: (4*zonex/5)-5, ymin: (3*zoney/5), ymax: (4*zoney/5)-5 };
    const zone20 = { xmin: (4*zonex/5), xmax: zonex-5, ymin: (3*zoney/5), ymax: (4*zoney/5)-5 };

    const zones = [zone1, zone2, zone3, zone4, zone5, zone6, zone7, zone8, zone9, zone10, zone11, zone12, zone13, zone14, zone15, zone16, zone17, zone18, zone19, zone20];

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
        const zone = [zone1, zone2, zone3, zone4, zone5, zone6, zone7, zone8, zone9, zone10, zone11, zone12, zone13, zone14, zone15, zone16, zone17, zone18, zone19, zone20];
        
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
        essaie.nbReel = nbPoints;

        // Affichage des points
        for (let i = 0; i < nbPoints; i++) {
            let randomZone = Math.floor(Math.random() * zone.length)
            const positions = randomXY(zone[randomZone]);
            console.log(randomZone, zone)
            zone.splice(randomZone, 1);
            console.log(zone)
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
        console.log(zone)
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
        ExperiencesData.experience.addData(session.getDonnees());
        console.log(ExperiencesData)
        session = new SessionClass(); // Réinitialiser la session
        lancerEssai();
    });

    initialiserExperience();
    lancerEssai(); // Démarre direct la session 1
});