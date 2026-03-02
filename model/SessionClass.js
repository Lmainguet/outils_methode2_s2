/**
 * buttonClick : bouton correspondant à la reponse du participant
 * couleurMot : couleur du text du mot de test
 * textMot : text du mot de test 
 * position : list des positions de chaque mouvement de la souris et l'heure de prise du mouvement DateClass()
 * */
class SessionClass {
    constructor() {
        this.index = "";
        this.essaie = EssaieClass;
    }

    addData(pos) {
        this.data.push(pos);
    }

    getDonnees() {
        return {
            index: this.index,
            data: this.data
        };
    }

    suppDOnnes() {
        this.data = [];
    }
};
