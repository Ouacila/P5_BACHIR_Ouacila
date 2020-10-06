/* ------------ Appel API ---------------*/
function XMLRequest(url) {
    const request = new XMLHttpRequest(); // Création nouvel objet de type  XMLHttpRequest

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            response = JSON.parse(this.responseText);
            renderHTML(response);
        };
    };
    request.open('GET', url); //demande à ouvrir une connexion vers un service web.(url ci-dessous)
    request.send(); // envoi de la requête au service web.
};
const url = 'http://localhost:3000/api/cameras/';
XMLRequest(url); // appelle la fonction de connexion à l'api

/* ------------------------- Affichage produits ------------------------- */

function renderHTML(cart) { //fonction de création du contenu HTML

    const div = document.createElement('div'); //création de la div qui accueillera le contenu

    for (i = 0; i < cart.length; i++) { //exécute la fonction pour chaque App photo.
        div.innerHTML += `<div class="card">
        <img src= ${cart[i].imageUrl} alt = "app" class="card-img" \>
        <h5 class="card-title"> ${cart[i].name}</h5>
        <p class="card-text">${cart[i].description}<br \> ${cart[i].price / 100}  €</p>
        <p class="btn" type="button">
        <a class="buttonAjouter" href="Frontend/produit.html?id=${cart[i]._id}"> Sélectionner cet appareil ! </a>
        </p>
        </div>`;
    }

    products.appendChild(div); //le contenu (ci-dessus) est placé dans la div "products"(html)
};




