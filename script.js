// Préparons nos variables pour récupérer le nom de notre page
// Il y a plusieurs choses à comprendre ici
// regex: permet de supprimer l'extension de la page dans l'url
// path: récupère l'url de la page en cours
// match: récupère dans 'path' toute les valeurs qui correspondent à notre regex. Du coup on a la valeur sélectionnée en première position, puis la valeur sans l'extension en deuxième position. tout cela stocké dans un tableau
// page: contient la deuxième valeur de match (tableau) qui est le nom de notre page sans son extension
let regex = new RegExp(/\/([^/]+)\.[^/.]+$/);
let path = window.location.pathname;
let match = path.match(regex);
let page = match ? match[1] : null;

// fonction asynchrone qui va servir a ajouter une page HTML comme "texte" à l'intérieur d'une div
async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

// fonction asynchrone qui va charger nos "header" et "footer". 
// on sélectionne nos balises "header" et "footer"
// et pour chacune on utilise notre fonction 'fetchHtmlAsText' pour charger la page header/footer
// peut-être que vous devrez changer les liens vers les fichiers html
// on a aussi une condition pour ne pas charger le footer sur la page index
async function loadComponents() {
  const headerDiv = document.querySelector("header");
  headerDiv.innerHTML = await fetchHtmlAsText("../components/header.html");
  if (page !== "index" && page !== null){
    const footerDiv = document.querySelector("footer");
    footerDiv.innerHTML = await fetchHtmlAsText("../components/footer.html");
  }
}

// Ici on commence le code pour faire en sorte que chaque lien dans ma nav ai la classe 'active' si c'est la page sur laquelle on est
// on commence par sélectionner tous nos liens dans header
function setActiveNavLink() {
  const navLinks = document.querySelectorAll("header a");

  // pour chaque liens on va récupérer l'attribut 'href'
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    // On vérifie si le href correspond à la page
    if (page && href.includes(page)) {
      // On ajoute la classe active si c'est le cas
      link.classList.toggle("active");
    }
  });
}

// Ici on crée une fonction qui va ajouter le résultat de toutes nos fonctions quand elle aura le résultat des autres fonctions
async function initializePage() {
  await loadComponents();
  setActiveNavLink();
}

// Et enfin on fait appel à cette dernière fonction pour lancer toute la machine
initializePage();
