// questionnaire.js

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("questionnaire_start_button");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.fontWeight = "bold";
    errorMessage.id = "errorMessage";
    document.querySelector("main").appendChild(errorMessage);

    startButton.addEventListener("click", function (event) {
        event.preventDefault(); // bloque la redirection automatique

        // Récupération des champs
        const age = document.getElementById("age").value;
        const sexe = document.getElementById("sexe").value;
        const lateralite = document.getElementById("lateralite").value;
        const daltonien = document.getElementById("daltonien").value;
        const souris = document.getElementById("souris").value;

        errorMessage.textContent = ""; // reset

        let valid = true;

        // Vérification des champs vides
        if (!age || !sexe || !lateralite || !daltonien || !souris) {
            errorMessage.textContent = "Veuillez répondre à toutes les questions.";
            valid = false;
            errorMessage.style.fontSize = "20px"
        }

        // Vérification de l'âge
        const ageNumber = Number(age);
        if (!Number.isInteger(ageNumber)) {
            errorMessage.textContent = "L'âge doit être un nombre entier.";
            errorMessage.style.fontSize = "20px";
            valid = false;
        } else if (ageNumber < 1 || ageNumber > 120) {
            errorMessage.textContent = "L'âge doit être compris entre 1 et 120.";
            errorMessage.style.fontSize = "20px";
            valid = false;
        }

        // Si tout est valide → sauvegarde + redirection
        if (valid) {
            const reponses = {
                age: ageNumber,
                sexe: sexe,
                lateralite: lateralite,
                daltonien: daltonien,
                souris: souris
            };

            // Sauvegarde dans localStorage
            localStorage.setItem("questionnaireReponses", JSON.stringify(reponses));
            console.log("Réponses sauvegardées :", reponses);

            // Redirection manuelle
            window.location.href = "regles.html";
        }
    });
});
