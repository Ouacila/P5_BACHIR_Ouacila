


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
    request.open('GET', "https://oc-p5-api.herokuapp.com");
    request.send();
};

/* let carts = document.querySelectorAll ('fa-shopping-cart') ; */
/* Bouton d'ajout au panier*/
let carts = document.querySelectorAll('#ajouter');

/* Array de produits disponibles sur le e-shop*/
let products = [
    {
        name:'Zeiss Iron',
        tag:'vcam_1',
        price: 230,
        inCart:0
    },
    {
        name:'Ihagee Dresden',
        tag:'vcam_2',
        price: 399.99,
        inCart:0
    },
    {
        name:'Ihagee Dresden 380',
        tag:'vcam_3',
        price: 649.99,
        inCart:0
    },
    {
        name:'Exaktia Varex',
        tag:'vcam_4',
        price: 299.90,
        inCart:0
    },
    {
        name:'Voigtlander Brijan',
        tag:'vcam_5',
        price: 789.00,
        inCart:0
    }
    
];
//console.log(products.length)

/* Ajout d'un article lors du clic*/

for (let i=0 ; i<carts.length; i++) {
    carts[i] .addEventListener('click', () => {
        cartNumbers(products[i]) ;
        prixTotal(products[i]);
    }
    )
}
/* Fonction pour avoir le chiffre d'articles dans le panier*/

function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.fa-cart-plus span').textContent=productNumbers;
    }
}
/* Nombre d'article affiché à côté de l'icône panier*/
function cartNumbers(product){
    
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
    setItems(product);
}



function setItems(product){
   /* console.log("Dans cette fonction");
    console.log("Mon produit est",product); */

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);/* Transforme un e- JSON en JS */

    if(cartItems!=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
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

        if (cartItems && productContainer){
            productContainer.innerHTML='';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML += `
                <div class = "produit" >
                    <i class="fas fa-times-circle"></i>
                    <img src="images/${item.tag}.jpg"></img>
                    <span>${item.name}</span>
                <div class="price">${item.price} Euros
                </div>
                <div class="quantity"> <i class="fas fa-arrow-circle-left"></i>
                ${item.inCart}
                <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="total">
                ${item.inCart * item.price} Euros
                </div>
                </div>
                `
        });
        productContainer.innerHTML += `
            <div class="panierTotal">
                <h4 class="titrePanier">
                    Total du panier :
                </h4>
                <h4 class="totalPanier"> ${cartCost} Euros
                </h4>
            </div>
        `
        }
    }
onLoadCartNumbers();
displayCart();