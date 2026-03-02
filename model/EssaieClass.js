class EssaieClass {
    constructor(couleur, nbReel, nbParticipant) {  
        this.index = "";
        this.couleur = couleur;
        this.nbReel = nbReel;
        this.nbParticipant = nbParticipant;
        this.data = [];
    }

    addData(donnees) {
        this.data.push(donnees);
    }

    getDonnees() {
        return {
            index: this.index,
            couleur: this.couleur,
            nbReel: this.nbReel,
            nbParticipant: this.nbParticipant,
            data: this.data
        };
    }

    suppDOnnes() {
        this.data = [];
    }
}
