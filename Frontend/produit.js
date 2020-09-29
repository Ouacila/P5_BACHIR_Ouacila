
/* -------------  Connexion API pour chaque id produit ----------- */
function XMLRequest(url) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            response = JSON.parse(this.responseText);
            renderHTML(response);
        };
    };
    request.open('GET', url);
    request.send();
};

const product = document.querySelector('#produit');
const section = document.getElementsByTagName('section');

const idUrl = new URL(window.location).searchParams.get('id');
const url = 'http://localhost:3000/api/cameras/' + idUrl 
XMLRequest(url); 


/* ----------------- Affichage produit -------------*/

// Création de chaque produit en fonction de l'id.
function renderHTML(cart) { 
    const div = document.createElement('div');
    const lenses = cart.lenses; 
    div.setAttribute('class', 'produit');

    div.innerHTML += `<img class="app" src="${cart.imageUrl}">
    <h1 class="name">${cart.name}</h1>
    <p class="description">${cart.description}</p>
    <p class ="prix">${cart.price / 100} €</p>
    <select id="lenses"></select>`;
    product.appendChild(div); 

    //Choix des lentilles

    const form = document.getElementById('lenses');

    lenses.forEach(displayLense); // 

    function displayLense(item) { 
        document.getElementById("lenses").innerHTML += `<option>${item}</option>`;// formulaire de choix des lentilles
    };

    div.appendChild(document.getElementById('ajoutPanier')); // Récupération sur la page HTML.
    div.appendChild(form);
};

/* --------- Localstorage---------------- */

/* Fonction pour avoir le nbr d'article*/
function onLoadCartNumber()  {   
    const quantityInCart = JSON.parse(localStorage.getItem('product')).length;  // longueur du tableau crée auto dans le panier

};

document.getElementById('ajoutPanier').addEventListener('click', ()=>{
    const lenses = document.getElementById('lenses'); //choix de la lentille renvoyée à l'API

    let app = { //obj App pour la création panier (+localStorage)
        id: response._id,
        name: response.name,
        choix:  lenses.value, //pour récupérer seulement la lentille choisie
        price: response.price,
        image: response.imageUrl
    }

    const itemAdd = localStorage.getItem('product');

    if (itemAdd) { //vérifie l'existence d'un panier, sinon le crée
        itemInCart = JSON.parse(itemAdd); //Transforme l'e- JSON en JS
        itemInCart.push(app); //ajout de l'app séléctionné 
        localStorage.setItem('product', JSON.stringify(itemInCart));
    } else {
        itemInCart = []; //si inexistant, crée un panier sous forme de tableau (format attendu par l'API)
        itemInCart.push(app); //ajout de l'app séléctionné 
        localStorage.setItem('product', JSON.stringify(itemInCart)); //envoie les données obtenues dans le localStorage
    }

    onLoadCartNumber();

    location.reload();
});