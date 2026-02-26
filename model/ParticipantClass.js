class ParticipantClass {
    constructor() {
        this.age = 0;
        this.genre= "";
        this.lateralite= "";
        this.daltonisme= "";
        this.peripherique= "";
        this.essai = []; 
    }
    getDonnees() {
        return {
            age: this.age,
            genre: this.genre,
            lateralite: this.lateralite,
            daltonisme: this.daltonisme,
            peripherique: this.peripherique,
            essai: this.essai
        };
    }
};
