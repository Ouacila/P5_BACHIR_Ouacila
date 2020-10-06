
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

const idUrl = new URL(window.location).searchParams.get('id');
const url = 'http://localhost:3000/api/cameras/' + idUrl 
XMLRequest(url); 


/* ----------------- Affichage produit -------------*/

const product = document.querySelector('#produit');
const section = document.getElementsByTagName('section');


// Création de chaque produit en fonction de l'id.
function renderHTML(cart) { //fonction de création du contenu HTML
    const div = document.createElement('div');
    const lenses = cart.lenses; 

    div.innerHTML += `<img class="app" src="${cart.imageUrl}">
    <h1 class="name">${cart.name}</h1>
    <p class="description">${cart.description}</p>
    <p class ="prix">${cart.price / 100} ,00€</p>
    <select id="lenses"></select>
    <label class="col-lg-3" >Quantité</label><input type = "number" id = "qte" style="width:120px" class="input-sm form-control"></input><br>`;
    product.appendChild(div); 

    //Choix des lentilles

    const form = document.getElementById('lenses');

    lenses.forEach(displayLense); // parcourt un à un les éléments du tableau lenses de l'API

    function displayLense(item) { 
        document.getElementById("lenses").innerHTML += `<option>${item}</option>`; // formulaire de choix des lentilles
    };

    div.appendChild(document.getElementById('ajoutPanier')); // Récupération sur la page HTML.
    div.appendChild(form);
};

/* --------- Localstorage---------------- */

document.getElementById('ajoutPanier').addEventListener('click', ()=>{

    let app = { //obj App pour la création panier (+localStorage)
        id: response._id,
        name: response.name,
        choix: lenses.value, //pour récupérer seulement la lentille choisie
        price: response.price,
        qte:parseInt(document.getElementById("qte").value), //analyse l'é fourni en argument et renvoie un entier exprimé dans une base donnée.
        image: response.imageUrl
    }

    const itemAdd = localStorage.getItem('product');

    if (itemAdd) { //Si le panier existe
        itemInCart = JSON.parse(itemAdd); //Transforme l'e- JSON en JS
        itemInCart.push(app); //ajout de l'app séléctionné en fin de tableau(dans le panier)
        localStorage.setItem('product', JSON.stringify(itemInCart));
    } else {
        itemInCart = []; //si inexistant, crée un panier sous forme de tableau (format attendu par l'API)
        itemInCart.push(app); //ajout de l'app séléctionné 
        localStorage.setItem('product', JSON.stringify(itemInCart)); //envoie les données obtenues dans le localStorage
    }

});

