
function recapCommande(data) {
    const section = document.getElementById('recapPanier'); // Emplacement du contenu que l'on va créer
    const random = (max,min) =>{
        return Math.floor(Math.random() * (max-min+1)+min);
    }
    const total = JSON.parse(localStorage.getItem('total'))
    const nbrOfArticles = JSON.parse(localStorage.getItem('product')).length;

    console.log(nbrOfArticles);
    console.log(total);

    const article = document.createElement('article');
    article.setAttribute('id', 'recap');

    if (nbrOfArticles == 1) {
        article.innerHTML += `<p class="recap">Merci pour votre commande ORINOCO,<br> Vous venez juste de faire de magnifiques acquisitions!!!<br><br>
        <br> Nous avons le plaisir de vous confirmer que votre commande de ${JSON.parse(localStorage.product).length} différent types d'article(s) portant le numéro ${random(500000,1)} vous sera livré dans les plus brefs délais.
        <br> Votre commande a pour ${total}
        <br> Vous recevrez très prochainement un e-mail dès que celle-ci sera remise à notre transporteur.</p>`;
    } else {
        article.innerHTML += `<p class="recap">Merci pour votre commande ORINOCO,<br> Vous venez juste de faire de magnifiques acquisitions!!!
        <br> Nous avons le plaisir de vous confirmer que votre commande de ${JSON.parse(localStorage.product).length} différent types d'article(s) portant le numéro ${random(500000,1)} vous sera livré dans les plus brefs délais.
        <br> Votre commande a pour ${total}
        <br> Vous recevrez très prochainement un e-mail dès que celle-ci sera remise à notre transporteur.</p>`
    }

    section.appendChild(article); 
};

recapCommande();
localStorage.clear();