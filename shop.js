
/* ------------------------- Page index ------------------------- */
function XMLRequest(url) {
    const request = new XMLHttpRequest();
    const pageLocation = window.location;
    const uri = new URL(pageLocation);

    const product = document.querySelector('#product');
    const section = document.getElementsByTagName('section');

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            response = JSON.parse(this.responseText);
            renderHTML(response);
        };
    };
    request.open('GET', url);
    request.send();
};
const url = 'https://oc-p5-api.herokuapp.com/api/cameras';
XMLRequest(url); // appelle la fonction de connexion à l'api

/* - Affichage produits- */

function renderHTML(data) { //fonction de création du contenu HTML

    const div = document.createElement('div'); //div contenu

    for (i = 0; i < data.length; i++) { //exécute la fonction pour chaque App photo.
        div.innerHTML += `<div class="card">
        <img src= ${data[i].imageUrl} alt = "app" class="card-img" \>
        <h5 class="card-title"> ${data[i].name}</h5>
        <p class="card-text">${data[i].description}<br \> ${data[i].price / 100}  €</p>
        <p class="btn" type="button">
        <a class="butonAjouter" href="product.html?id=${data[i]._id}"> Sélectionnez cet appareil photo! </a>
        </p>
        </div>`;
    }

    products.appendChild(div); //le contenu (ci-dessus) est placé dans la div "products"(html)
};



/* https://oc-p5-api.herokuapp.com/api/cameras*/
/* http://localhost:3000/api/cameras*/

