document.addEventListener('DOMContentLoaded', () => {
    const zoneTest = document.querySelector(".zoneTest");
    const nextBtn = document.getElementById("next_essai_button");
    const inputReponse = document.getElementById("reponse_sujet");
    
    // Récupération des données participant
    const data = JSON.parse(localStorage.getItem("questionnaireReponses"));
    if (!data) { window.location.href = "questionnaire.html"; return; }

    let participant = new ParticipantClass();
    participant.age = data.age;  
    participant.genre = data.sexe;
    participant.Ordi = data.Ordi;
    participant.Vue = data.Vue;
    participant.filtre = data.filtre;
    participant.dyscalculie = data.dyscalculie;

    let associationsNomCouleur = [
        { nom: 1, x: 10, y:10}, { nom: 2, x: 15 , y:46}, { nom: 3, x: 86, y : 84},
        { nom: 4, x: 97, y : 75}, { nom: 5, x: 34, y : 41}, { nom: 6, x: 68, y : 70},
        { nom: 7, x: 46, y : 50}, { nom: 8, x: 25, y : 25}, { nom: 9, x: 5, y : 5},
        { nom: 10, x: 25, y : 13}, { nom: 11, x: 3, y:10}, { nom: 12, x: 51 , y:65},
        { nom: 13, x: 25, y : 86}, { nom: 14, x: 74, y : 16}, { nom: 15, x: 12, y : 90},
        { nom: 16, x: 3, y : 52}, { nom: 17, x: 84, y : 50}, { nom: 18, x: 65, y : 25},
        { nom: 19, x: 94, y : 4}, { nom: 20, x: 65, y : 18}
    ];

    let nombrePointsCouleur = [];
    
    function initialiserSession() {
        for (let i = 1; i <= 20; i++) {
            for (let j = 0; j < 3; j++) {
                nombrePointsCouleur.push(["highCercle", i]);
                nombrePointsCouleur.push(["lowCercle", i]);
            }
        }
        nombrePointsCouleur = shuffle(nombrePointsCouleur);
    }

    function lancerEssai() {
        // 1. On vide la zone précédente
        zoneTest.innerHTML = "";
        inputReponse.value = 0;

        // 2. Vérifier s'il reste des essais
        if (nombrePointsCouleur.length === 0) {
            window.location.href = "finish.html";
            return;
        }

        // 3. Prendre le premier de la liste et l'enlever (.shift)
        const session = nombrePointsCouleur.shift();
        const nbPoints = session[1];
        const typeCercle = session[0];

        // 4. Mélanger les positions pour cet essai
        let positions = shuffle([...associationsNomCouleur]);

        // 5. Créer les points
        for (let i = 0; i < nbPoints; i++) {
            const pointData = positions[i];
            const el = document.createElement("div");
            el.className = "moncercle";
            el.id = typeCercle;
            el.style.position = "absolute";
            
            // Calcul position
            const width = zoneTest.offsetWidth;
            const height = zoneTest.offsetHeight;
            el.style.left = (pointData.x / 100) * width + "px";
            el.style.top = (pointData.y / 100) * height + "px";

            zoneTest.appendChild(el);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Écouteur du bouton
    nextBtn.addEventListener("click", () => {
        // Ici tu pourrais appeler savedata.js avant de passer au suivant
        lancerEssai();
    });

    // Lancement initial
    initialiserSession();
    lancerEssai();
});