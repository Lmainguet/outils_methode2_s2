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
    
    let associationsNomCouleur = [
        { nom: 1, couleur: "jaune", x: 10, y:10},
        { nom: 2, couleur: "bleu", x: 15 , y:46},
        { nom: 3, couleur: "jaune", x: 86, y : 84},
        { nom: 4, couleur: "jaune", x: 97, y : 75},
        { nom: 5, couleur: "bleu", x: 34, y : 41},
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
        { nom: 16, couleur: "bleu", x: 3, y : 52},
        { nom: 17, couleur: "jaune", x: 84, y : 50},
        { nom: 18, couleur: "bleu", x: 65, y : 25},
        { nom: 19, couleur: "jaune", x: 94, y : 4},
        { nom: 20, couleur: "bleu", x: 65, y : 18}
    ];
    associationsNomCouleur = shuffle(associationsNomCouleur);
    
    // creer la liste des points et des couleurs pour les 6 sessions de 20 essaies
    let nombrePointsCouleur = [];
    for (let i = 1; i <= 20; i++) {
        for (let j = 0; j < 3; j++) {
            nombrePointsCouleur.push(["highCercle", i]);
        }
        for (let j = 0; j < 3; j++) {
            nombrePointsCouleur.push(["lowCercle", i]);
        }
    };
    nombrePointsCouleur = shuffle(nombrePointsCouleur);

    /* fonction principal 
    * ajoute chaque points dans le container zoneTest 
    */
    session = nombrePointsCouleur[0];
    nombrePointsCouleur.shift();
    for (let i = 0; i < session[1]; i++) {
        const point = associationsNomCouleur[i];
        let adaptedPosition = adaptPositionPointToContainer(
            point.x,
            point.y,
            zoneTest
        );

        zoneTest.appendChild(
            createPointElement(adaptedPosition.realX, adaptedPosition.realY, session[0])
        ); 
    }

    /*determine l'emplacement de chaque point en fonction du x/100 et y/100 de chaque point de associationsNomCouleur */
    function adaptPositionPointToContainer(x, y, container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const realX = (x / 100) * width;
        const realY = (y / 100) * height;
        return { realX, realY };
    }

    /* creer le point avec ses coordonnées et caracteristiques */
    function createPointElement(x, y, color) {
        const pointElement = document.createElement("div");
        pointElement.className = "moncercle";
        pointElement.style.position = "absolute";
        pointElement.style.left = `${x}px`;
        pointElement.style.top = `${y}px`;
        pointElement.id = color;
        return pointElement;
    }

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
    /*function afficherErreur() {
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
    }*/
});