
/* ------------------------- Page index ------------------------- */

const url = 'http://localhost:3000/api/cameras/';
XMLRequest(url); // appelle la fonction de connexion à l'api définie dans reusable_functions.js

/* ------------------------- Products rendering ------------------------- */

function renderHTML(carts) { //fonction de création du contenu HTML

    const div = document.createElement('div'); //création de la div qui accueillera le contenu

    for (i = 0; i < carts.length; i++) { //exécute la fonction pour chaque App photo.
        div.innerHTML += `<div class="card">
        <img src= ${carts[i].imageUrl} alt = "app" class="card-img" \>
        <h5 class="card-title"> ${carts[i].name}</h5>
        <p class="card-text">${carts[i].description}<br \> ${carts[i].price / 100}  €</p>
        <p class="btn" type="button">
        <a class="buttonAjouter" href="Frontend/produit.html?id=${carts[i]._id}"> Sélectionnez cet appareil photo! </a>
        </p>
        </div>`;
    }

    products.appendChild(div); //le contenu (ci-dessus) est placé dans la div "products"(html)
};

/* ------------------------- Cart Icon Display ------------------------- */

displayQuantity();



function XMLRequest(url) {
    const request = new XMLHttpRequest();
    const pageLocation = window.location;
    const uri = new URL(pageLocation);

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            response = JSON.parse(this.responseText);
            renderHTML(response);
        };
    };
    request.open('GET', url);
    request.send();
};

/* ------------------------- Cart Icon Display ------------------------- */

function displayQuantity() {    // affiche un chiffre blanc sous l'icône du panier pour savoir combien d'articles y sont stockés sans besoin de l'ouvrir
    const quantityInCart = JSON.parse(localStorage.getItem('produit')).length;  // utilise la longueur du tableau pour savoir le nombre d'articles (1 article == 1 ligne dans le tableau)
    const cart = document.getElementsByClassName('num');

    cart.innerHTML += `${quantityInCart}`   //création du HTML en question, en l'occurence un chiffre basé sur le localStorage.length

};

