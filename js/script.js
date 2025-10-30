let adresseInput = document.getElementById("adresse");
let suggestionsSelect = document.getElementById("suggestions");
let divError = document.getElementById("divError");

// récupérer des suggestions à chaque saisie dans l'input
adresseInput.addEventListener("input", function () {
    let adresse = adresseInput.value;
    const URL = `https://data.geopf.fr/geocodage/completion/?text=${adresse}&maximumResponses=15`;

    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            suggestionsSelect.style.visibility = "visible"; // Rendre le select visible
            divError.innerText = ""; // Effacer les messages d'erreur précédents
            suggestionsSelect.innerHTML = ""; // Vider le select

            // Ajouter une première option  de valeur vide
            let emptyOption = document.createElement("option");
            emptyOption.value = "";
            emptyOption.textContent = "-- Sélectionnez une adresse --";
            suggestionsSelect.appendChild(emptyOption);

            // Remplir le select avec les suggestions reçues
            data.results.forEach((item) => {
                let option = document.createElement("option");
                option.value = item.fulltext;
                option.textContent = item.fulltext;
                suggestionsSelect.appendChild(option);
            });
        })
        .catch((error) => {
            divError.innerText = `Une erreur s'est produite : ${error.message}`;
        });
});

// Mettre à jour l'input lorsque l'utilisateur sélectionne une suggestion
suggestionsSelect.addEventListener("change", function () {
    if (suggestionsSelect.value !== "") {
        suggestionsSelect.style.visibility = "hidden"; // Cacher le select après sélection
        adresseInput.value = suggestionsSelect.value; // Mettre à jour l'input avec la valeur sélectionnée
    }
});
