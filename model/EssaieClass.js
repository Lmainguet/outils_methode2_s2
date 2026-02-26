/**
 * buttonClick : bouton correspondant à la reponse du participant
 * couleurMot : couleur du text du mot de test
 * textMot : text du mot de test 
 * position : list des positions de chaque mouvement de la souris et l'heure de prise du mouvement DateClass()
 * */
class EssaieClass {
    constructor() {
        this.mot = "";
        this.couleur = "";
        this.condition = "";
        this.reponse = "";
        this.reponseValide = true;
        this.tempsInitiation = null;
        this.tempsMouvement = null ;
        this.startX = null;
        this.startY = null;
        this.coordonnees = [];
    }

    addPosition(pos) {
        this.coordonnees.push(pos);
    }

    getDonnees() {
        return {
            mot : this.mot,
            couleur: this.couleur,
            condition: this.condition,
            reponse: this.reponse,
            reponseValide: this.reponseValide,
            tempsInitiation: this.tempsInitiation,
            tempsMouvement: this.tempsMouvement,
            startX: this.startX,
            startY: this.startY,
            coordonnees: this.coordonnees
        };
    }
};
