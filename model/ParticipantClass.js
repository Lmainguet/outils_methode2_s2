class ParticipantClass {
    constructor() {
        this.age = 0;
        this.genre= "";
        this.Ordi= "";
        this.Vue= "";
        this.filtre= "";
        this.dyscalculie = []; 
    }
    getDonnees() {
        return {
            age: this.age,
            genre: this.genre,
            Ordi: this.Ordi,
            Vue: this.Vue,
            filtre: this.filtre,
            dyscalculie: this.dyscalculie
        };
    }
};
