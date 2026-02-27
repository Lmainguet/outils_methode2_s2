document.addEventListener('DOMContentLoaded', () => {
    const zoneTest = document.createElement("div");
    zoneTest.className = "zoneTest";
    document.body.appendChild(zoneTest);
    const data = JSON.parse(localStorage.getItem("questionnaireReponses"));
    let participant = new ParticipantClass();
    let essai = new EssaieClass();
    participant.age = data.age;  
    participant.genre = data.sexe;
    participant.lateralite = data.lateralite;
    participant.daltonisme = data.daltonien;
    participant.peripherique = data.souris;
    console.log(participant);
    
    let associationsNomCouleur = [
        { nom: 1, couleur: "jaune", x: 10, y:10},
        { nom: 2, couleur: "bleu", x: 15 , y:46},
        { nom: 3, couleur: "jaune", x: 86, y : 26},
        { nom: 4, couleur: "jaune", x: 4, y : 75},
        { nom: 5, couleur: "bleu", x: 1, y : 90},
        { nom: 6, couleur: "bleu", x: 68, y : 70},
        { nom: 7, couleur: "jaune", x: 46, y : 50},
        { nom: 8, couleur: "bleu", x: 25, y : 25},
        { nom: 9, couleur: "jaune", x: 5, y : 5},
        { nom: 10, couleur: "bleu", x: 25, y : 13},
        { nom: 11, couleur: "jaune", x: 3, y:10},
        { nom: 12, couleur: "bleu", x: 51 , y:65},
        { nom: 13, couleur: "jaune", x: 25, y : 86},
        { nom: 14, couleur: "jaune", x: 74, y : 16},
        { nom: 15, couleur: "bleu", x: 12, y : 90},
        { nom: 16, couleur: "bleu", x: 6, y : 70},
        { nom: 17, couleur: "jaune", x: 84, y : 50},
        { nom: 18, couleur: "bleu", x: 65, y : 25},
        { nom: 19, couleur: "jaune", x: 94, y : 4},
        { nom: 20, couleur: "bleu", x: 65, y : 18}
    ];

    let nombreDePoints = [];
    for (let i = 1; i <= 10; i++) {
        nombreDePoints.push([6, i]);
    }


    for (let i = 0; i < associationsNomCouleur.length; i++) {
        const point = associationsNomCouleur[i];
        let adaptedPosition = adaptPositionPointToContainer(
            point.x,
            point.y,
            zoneTest
        );   
        zoneTest.appendChild(
            createPointElement(adaptedPosition.realX, adaptedPosition.realY)
        ); 
    }

    function adaptPositionPointToContainer(x, y, container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const realX = (x / 100) * width;
        const realY = (y / 100) * height;
        return { realX, realY };
    }

    function createPointElement(x, y) {
        const pointElement = document.createElement("div");
        pointElement.className = "moncercle";
        pointElement.style.position = "absolute";
        pointElement.style.left = `${x}px`;
        pointElement.style.top = `${y}px`;
        return pointElement;
    }


    //click sur un des boutons reponse couleur
    /*elements.forEach(button => {
        button.addEventListener('click', (event) => {
            const clickedId = event.target.id;
            essai.reponseValide = true;
            essai.reponse = clickedId;
            essai.couleur = stroop_stimulus.style.color;
            essai.mot = stroop_stimulus.textContent; 
            essai.tempsInitiation = essai.coordonnees[0].t;
            essai.tempsMouvement = new Date().getTime() - heure_stroop_apparait;
            participant.essai.push(essai.getDonnees());
            essai.coordonnees = [];
            if (clickedId != essai.couleur) {
                afficherErreur();
            }else {
                setTimeout(() => {
                    index_start_button.style.visibility = 'visible';
                }, 500);
            }
            stroop_stimulus.style.visibility = 'hidden';
            startTime = 0;
            
        });
    });

    index_start_button.addEventListener('click',(event) => {
        essai.startX = event.clientX;
        essai.startY = event.clientY;
        heure_clic_demmaré = new Date().getTime();
        shuffle(associations);
        index_start_button.style.visibility = 'hidden';
        // Génère la prochaine couleur
        let nextElemenCouleur = associations.find(e => e.count > 0);
        
        if(nextElemenCouleur){
            essai.condition = nextElemenCouleur.info;
            stroop_stimulus.textContent = nextElemenCouleur.nom;
            //gestion des couleurs pour l'affichage du prochain mot
            switch (nextElemenCouleur.couleur) {
                case "jaune":
                    stroop_stimulus.style.color ="yellow";
                    break;

                case "rouge":
                    stroop_stimulus.style.color ="red";
                    break;

                case "bleu":
                    stroop_stimulus.style.color ="blue";
                    break;

                case "vert":
                    stroop_stimulus.style.color ="green";
                    break;
            }       
            nextElemenCouleur.count--;
            setTimeout(() => {
                startTime = 1;
                heure_stroop_apparait = new Date().getTime();
                stroop_stimulus.style.visibility = 'visible';
            }, 3000);
        } else {
            savedata(participant); 
            document.location.href = "finish.html";
        }
    });

    /* 
    *  shuffle() : melange les dictionnaires de la list pour changer l'ordre
    *  array : liste de dico
    */
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /* 
    *  afficherErreur() : affiche une grande croix rouge pendant 3 secondes si le participant se trompe
    */
    function afficherErreur() {
        const x = document.createElement("div");
        x.textContent = "X";
        x.style.fontSize = "200px";
        x.style.fontWeight="bold";
        x.style.color="red";
        essai.reponseValide = false;
        document.body.appendChild(x);
        elements.forEach(el => el.style.visibility = "hidden");  
        setTimeout(() => {
            x.remove();
            elements.forEach(el => el.style.visibility = "visible");   
            index_start_button.style.visibility = 'visible';
        }, 3000);
    }
});