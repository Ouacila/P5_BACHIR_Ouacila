
/* -------------  Connexion API pour chaque id produit ----------- */
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

    lenses.forEach(displayColor); // 

    function displayColor(item) { 
        document.getElementById("lenses").innerHTML += `<option>${item}</option>`;// formulaire de choix des lentilles
    };

    div.appendChild(document.getElementById('ajoutPanier')); // Récupération sur la page HTML.
    div.appendChild(form);
};
/*----------- Nombre d'article dans le panier (essai) ----------*/

function cartNumbers(produit){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers=parseInt(productNumbers); /* Conversion d'un string en number*/
    localStorage.setItem('cartNumbers' , 1) ;

    if (productNumbers){
        localStorage.setItem ('cartNumbers',productNumbers +1);
        document.querySelector('.fa-cart-plus span').textContent=productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.fa-cart-plus span').textContent=1;
    }
    setItems(produit);
}
/* Fonction pour avoir le chiffre d'articles dans le panier*/
function onLoadCartNumbers(){
let productNumbers=localStorage.getItem('cartNumbers');
if(productNumbers){
    document.querySelector('.fa-cart-plus span').textContent=productNumbers;
}
}
/* Nombre d'article affiché à côté de l'icône panier*/
function cartNumbers(produit){

let productNumbers = localStorage.getItem('cartNumbers');

productNumbers=parseInt(productNumbers); /* Conversion d'un string en number*/
localStorage.setItem('cartNumbers' , 1) ;

if (productNumbers){
    localStorage.setItem ('cartNumbers',productNumbers +1);
    document.querySelector('.fa-cart-plus span').textContent=productNumbers+1;
}
else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.fa-cart-plus span').textContent=1;
}
setItems(produit);
}



function setItems(produit){
/* console.log("Dans cette fonction");
console.log("Mon produit est",product); */

let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);/* Transforme un e- JSON en JS */

if(cartItems!=null){
    if(cartItems[produit.tag]==undefined){
        cartItems={
            ...cartItems,
            [produit.tag]:product
        }
    }
    cartItems[product.tag].inCart+=1;
}
else{
product.inCart=1;
cartItems={
    [product.tag]:product
    }
}
localStorage.setItem("productsInCart",JSON.stringify (cartItems)
);
}
/* Fonction pour calculer le prix total du panier*/

function prixTotal(product){
    let cartCost = localStorage.getItem("prixTotal");
    
    if(cartCost !=null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("prixTotal",cartCost + product.price);
    }
    else{
       localStorage.setItem("prixTotal" , product.price); 
    }
}
function displayCart(){
   
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".product");
    let cartCost = localStorage.getItem("prixTotal");

    console.log(cartItems);
}