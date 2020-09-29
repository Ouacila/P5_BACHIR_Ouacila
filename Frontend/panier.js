
let httpRequest=new XMLHttpRequest();
httpRequest.onreadystatechange=function(){
    if( httpRequest.readyState === 4)/* Permet de détecter l'évolution de la requête */
    {
        let results =JSON.parse( httpRequest.responseText )
        result.innerHTML=''
        let ul=document.createElement('ul')
        result.appendChild(ul)
        for (let i=0; i<results.length; i++){
            let li=document.createElement('li')
            li.innerHTML=results[i].name + ' '+ results[i].price + ' Euros' + '  '+ results[i]._id;
            ul.appendChild(li);
        }
    }
}
httpRequest.open('Get', 'https://oc-p5-api.herokuapp.com/api/cameras', true);
httpRequest.send();

/* ------------------------- POST Method ------------------------- */

const insertPost = async function (data) {  // fonction pour envoyer les données (utilisateur et tableau de produits) à l'API pour effectuer une commande
    let response = await fetch('https://oc-p5-api.herokuapp.com/api/cameras/order', { //fetch pour tester les promesses intégrées à cette méthode
        method: 'POST', // méthode POST puisqu'il s'agit d'un envoi
        headers: {
            'Content-Type': 'application/json'  // précision sur le format des données à envoyer
        },
        body: JSON.stringify(data) // stringify pour pouvoir exploiter les données obtenues/envoyées
    })
    let repJson = await response.json();    //la réponse en elle-même
    return repJson;

}

/* ------------------------- Cart Icon Display ------------------------- */

onLoadCartNumber(); // appelle la fonction créee dans produit.js

/* ------------------------- Cart Icon Display ------------------------- */

document.getElementById('submitButton').addEventListener('click', () => {    // fonction envoyant les données à l'API
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    // création du contact(à renvoyer à l'API)
    const submitButton = document.getElementById('submitButton');

    let itemAdd = JSON.parse(localStorage.getItem('product')); // articles envoyés au panier 
    let products = [];  // array des articles dans le panier

    for (i = 0; i < itemAdd.length; i++) { // formule qui envoie les articles du localStorage dans le array
        products.push(itemAdd[i].id)
    }

    const contact = { "firstName": firstName, "lastName": lastName, "address": address, "city": city, "email": email };
    const order = { contact, products,total };    // données attendues par l'API pour un 'POST' à ../../order


    insertPost({ "contact": contact, "products": products,"total":total }).then(function (response) {

        window.location.href = './recap.html?random=' + response.random;
    });

    const myJSON = JSON.stringify(contact);
    localStorage.setItem('contactData', myJSON);    // localStorage du contact pour le recapitulatif

    
});

/* ------------------------- Display Cart Content ------------------------- */

const cartView = document.getElementById('recPanier');   // table html pour le contenu du panier

function renderCart(data) { 
    const app = JSON.parse(localStorage.getItem('product'));  // Récupération des e- du localStorage pour le panier
    var table = document.createElement('tbody');
    table.setAttribute('id', 'table');
    const tfoot = document.createElement('tfoot');
    tfoot.setAttribute('id', 'total');

    table.innerHTML += "<tr><th>Mes articles</th><th>Quantité</th><th>Appareil photo</th><th>Lentilles</th><th>Prix</th></tr>"; // En tête du tableau

    for (let i in app) {  // chaque article affiché par ligne
        const row = document.createElement('tr');
        row.innerHTML += `<td>
        <img class="appImg" src="${app[i].image}">
        </td>
        <td>${app[i].quantite}</td>
        <td>${app[i].name}</td>
        <td>${app[i].choix}</td>
        <td>${app[i].price / 100} €</td>`
        table.appendChild(row);
    }

    cartView.appendChild(table);    // Footer du tableau
    tfoot.innerHTML += `<tr>
    <td>Total</td>
    <td>${app.price} €</td>
    </tr>`;

    table.appendChild(tfoot);


    var table = document.getElementById('table'), prixTotal = 0;

    for (i = 1; i < table.rows.length; i++) {   // calcul Total du panier
        prixTotal = prixTotal + parseInt(table.rows[i].cells[4].innerHTML);
    }

    var prixTotal = document.getElementById('total').innerHTML = `Total = ${prixTotal} €`;

    const tot = JSON.stringify(prixTotal);
    localStorage.setItem('total', tot);    // localStorage du Total pour le recapitulatif
}

renderCart();




