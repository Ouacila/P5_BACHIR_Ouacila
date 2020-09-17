function XMLRequest(url) {
    const request = new XMLHttpRequest();
    const pageLocation = window.location;
    const uri = new URL(pageLocation);

    const product = document.querySelector('#produit');
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

/* ------------------------- Cart Icon Display ------------------------- */

function displayQuantity() {    // affiche un chiffre blanc sous l'icône du panier pour savoir combien d'articles y sont stockés sans besoin de l'ouvrir
    const quantityInCart = JSON.parse(localStorage.getItem('product')).length;  // utilise la longueur du tableau pour savoir le nombre d'articles (1 article == 1 ligne dans le tableau)
    const cart = document.getElementById('cartQuantity');

    cart.innerHTML += `${quantityInCart}`   //création du HTML en question, en l'occurence un chiffre basé sur le localStorage.length

};
