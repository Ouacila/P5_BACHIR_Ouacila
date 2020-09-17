
let httpRequest=new XMLHttpRequest();
httpRequest.onreadystatechange=function(){
    if( httpRequest.readyState === 4)
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
httpRequest.open('Get', 'http://localhost:3000/api/cameras/', true);
httpRequest.send();




/* ------------------------- POST Method ------------------------- */

const insertPost = async function (data) {  // fonction pour envoyer les données (utilisateur et tableau de produits) à l'API pour effectuer une commande
    let response = await fetch('http://localhost:3000/api/cameras/order', { //fetch pour tester les promesses intégrées à cette méthode
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

displayQuantity(); // appelle la fonction définie dans reusable_functions.js

/* ------------------------- Cart Icon Display ------------------------- */

document.getElementById('submitButton').addEventListener('click', function (e) {    // fonction envoyant les données du cart+form à l'API
    e.preventDefault()    // A décommenter pour tester la fonction
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    // les 5 champs précédents sont ceux attendus pour créer un contact par l'api
    const submitButton = document.getElementById('submitButton');

    let teddiesAdded = JSON.parse(localStorage.getItem('product')); // teddies qui seront envoyé dans le tableau
    let products = [];  // tableau qui accueillera les teddies

    for (i = 0; i < teddiesAdded.length; i++) { // formule qui envoie les teddies du localStorage dans le tableau
        products.push(teddiesAdded[i].id)
    }

    const contact = { "firstName": firstName, "lastName": lastName, "address": address, "city": city, "email": email };
    const order = { contact, products };    // données attendues par l'API pour un 'POST' à ../../order

    //insertPost({ "contact": contact, "products": products })   // envoie de toutes ces données recueillies plus haut

    insertPost({ "contact": contact, "products": products }).then(function (response) {

        window.location.href = './thanks.html?orderId=' + response.orderId;
    });

    const myJSON = JSON.stringify(contact);
    localStorage.setItem('contactData', myJSON);    // mise en storage de l'objet contact pour pouvoir le réutiliser dans les remerciements
});

/* ------------------------- Display Cart Content ------------------------- */

const cartView = document.getElementById('cartView');   // emplacement d'accueil du contenu du panier

function renderCart(data) { // fonction créant le panier sous forme de tableau d'articles
    const teddy = JSON.parse(localStorage.getItem('product'));  // localStorage qui servira de source à la création du tableau
    var table = document.createElement('tbody');
    table.setAttribute('id', 'table');
    const tfoot = document.createElement('tfoot');
    tfoot.setAttribute('id', 'sum');

    table.innerHTML += "<tr><th>Mes achats</th><th>Appareil photo</th><th>Lentilles</th><th>Prix</th></tr>";   // création du tableHeader

    for (let i in teddy) {  // crée une tableRow pour chaque objet teddy dans le localStorage
        const row = document.createElement('tr');
        row.innerHTML += `<td>
        <img class="cartImage" src="${teddy[i].image}">
        </td>
        <td>${teddy[i].name}</td>
        <td>${teddy[i].choix}</td>
        <td>${teddy[i].price / 100} €</td>`
        //<td><button class="removeButton">x</button></td>`
        table.appendChild(row);
    }

    cartView.appendChild(table);    // création du tableFooter avec le prix total
    tfoot.innerHTML += `<tr>
    <td>Total</td>
    <td>${teddy.price} €</td>
    </tr>`;

    table.appendChild(tfoot);


    var table = document.getElementById('table'), sumVal = 0;

    for (i = 1; i < table.rows.length; i++) {   // calcul du prix total en additionnant le contenu de toutes les cases 'prix' présentes dans le tableau
        sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML);
    }

    var sumVal = document.getElementById('sum').innerHTML = `Total = ${sumVal} €`;
}

renderCart();


function removeItem() { // fonction servant à supprimer un élément du tableau
    const removeItemButton = document.getElementsByClassName('removeButton');
    for (i = 0; i < removeItemButton.length; i++) {
        const button = removeItemButton[i];
        button.addEventListener('click', function (event) {
            const buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal();  // mets le prix à jour chaque fois qu'un élément est ajouté (ou ici supprimé)
        })
    }
}
 
removeItem();


function updateCartTotal() {    // fonction de mise à jour du prix total selon ajout / suppression d'articles
    var table = document.getElementById('table'), sumVal = 0;
    for (i = 1; i < table.rows.length; i++) { // calcul du prix total en additionnant le contenu de toutes les cases 'prix' présentes dans le tableau
        sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML);
    }

    var sumVal = document.getElementById('sum').innerHTML = `Total = ${sumVal} €`; // création du contenu en HTML
}

const sumVal = document.getElementById('sum').innerHTML;