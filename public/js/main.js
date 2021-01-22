/** Créer un objet personne. Cette personne doit avoir des propriétés et des méthodes : 
* - nom(string)
* - lieu(string)
* - argent(number)
* - mainDroite(tableau)
* ( du coup main gauche(tableau))
* - seDeplacer(lieu)
* - payerArticle(article)
* - couper(ingredient, outil)
*/

let personne = {
    nom: "Jeff",
    lieu: "pas maison",
    argent: 123,
    mainDroite: [],
    mainGauche: [],
    seDeplacer(x) {
        this.lieu = x
        console.log(personne.nom + " est actuellement à la " + personne.lieu.nom);
    },
    payerArticle(x) {
        this.argent -= x.prix
        console.log(`Votre portefeuille contient ${this.argent} sheckels`);
    },
    couper(x,y) {
        if (x.etat == "entier") {
            x.etat = "coupé";
            console.log(`Le ${y.nom} ${y.action} le ${x.nom}`);
        }
    }
}

/**
* Créer un lieu "maison" (un objet) avec comme propriété "nom: 'maison'" et "personnes = []" => qui sera un tableau de personnes présentes dans la maison :
*/

let maison = {
    nom: "maison",
    personnes: [],
}

/**
* Créer un outil (couteau) pour découper les ingrédients achetés
* propriétés : nom et action.
* action a comme valeur l'état "coupé" (qui sera mis aux légumes lorsqu'ils seront coupés avec le méthode de "personne".)
*/

let couteau = {
    nom: "couteau",
    action: "coupe"
}

/**
 * Créer des produits (ingrédients) à mettre dans le magasin qui serviront à créer l'omelette (oignon, oeuf, epice, fromage, ...);
 * propriétés : nom, etats ( entier,coupé, moulu), prix
 */

class Ingredients {
    constructor(a,b,c) {
        this.nom = a;
        this.etat = b;
        this.prix = c;
    }
}

let oignon = new Ingredients("oignon","coupé",1);
let oeuf = new Ingredients("oeuf","entier",2);
let epice = new Ingredients("epice","moulu",3);
let fromage = new Ingredients("fromage","coupé",4);

// Créer un lieu "epicerie" qui a comme propriétés :
// nom, personnes = [], paniers (un tableau d'objets "panier" avec une propriété "type" égal à panier et le contenu du panier, égal à un tableau vide),
// Les "ingrédients" créés juste au dessus contenus dans un tableau.
/**
 * Créer un poele avec un tableau comme contenu. Et avec une méthode cuir() qui, après 4 secondes, met l'état 'cuit' à this.contenu[0]. On peut faire ça avec la fonction setTimeout(()=> {}, 4000)
 */
// Créer un bol avec un tableau comme contenu
// ajouter une méthode melanger(nomMelange) qui va créer un nouvel objet "newMelange" avec comme nom la variable nomMelange passé en paramètre et avec 'pas cuit' en etat. cette méthode remplacera this.contenu par [l'obj newMelange]

let epicerie = {
    nom: "episseria",
    personnes: [],
    paniers: {
        type: "panier",
        contenu: [],
    },
    ingredients: [oignon,oeuf,epice,fromage],
}

let poele = {
    contenu: [],
    cuir() {
        setTimeout(() => {
            this.contenu[0].etat = "cuit"
            console.log(`La poele contient ${poele.contenu[0].nom} et il est à l'état: ${poele.contenu[0].etat}`);
        }, 4000)
    }
}

let bol = {
    contenu: [],
    melanger(nomMelange) {
        let newMelange = {
            nom: nomMelange,
            etat: "pas cuit",
        }
        this.contenu = newMelange
    }
}

/**** DEBUT DE L'OMELETTE ****/
// Pour dire que le personnage est à la maison :
// Avec l'objet personnage, utiliser la method seDeplacer et de passer en paramètre l'objet maison
// Afficher un message tel que :
// console.log(personnage.nom + " est actuellement à la " + personnage.lieu);

personne.seDeplacer(maison);

// Pour aller à l'épicerie acheter les ingrédients pour l'omelette, je répète la première étape en changeant le parametre de la method seDeplacer par l'epicerie

personne.seDeplacer(epicerie);

// Mon personnage prend un des paniers dans l'épicerie (il récupère le panier dans les objets de l'épicerie et le met dans sa main droite.)
// Il doit y avoir un objet dans la main droite de personnage et un panier en moins. Vérifier avec des console.log() ensuite afficher un message du type : 
// console.log(`${personnage.nom} a pris un ${type du panier}`);

personne.mainDroite.push(epicerie.paniers);
console.log(`${personne.nom} a pris un ${epicerie.paniers.type}`);

// Je créer une boucle qui va prendre chaque élément (ingrédient) du contenu de l'épicerie (1 à 1) et en faire une COPIE dans le panier du personnage
// Afficher un message à chaque ingrédient pris

epicerie.ingredients.forEach(element => {
    personne.mainDroite[0].contenu.push(element);
    console.log(`${personne.nom} à pris ${element.nom}`);
});

// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()
// Afficher un message de ce qu'il reste d'argent sur le personnage.

personne.mainDroite[0].contenu.forEach(element => {
    personne.payerArticle(element);
});


// rentrer à la maison (comme ça on pourra cuisiner)

personne.seDeplacer(maison);

// mettre chaque ingrédient dans le bol (1 à 1 donc avec une boucle)
// Afficher un petit message de chaque ingrédient qu'on met dans le bol.

for (let i = 0; i < personne.mainDroite[0].contenu.length; i++) {
    bol.contenu.push(personne.mainDroite[0].contenu[i]);
    personne.mainDroite[0].contenu.splice(personne.mainDroite[0].contenu[i], 1);
    i--   
}

// Vérifier que les ingrédients ne se trouvent plus dans le panier (oups ! on a oublié de le rapporter x)

console.log(`le panier contient ${personne.mainDroite[0].contenu.length} choses`);

// Retourner à l'épicerie pour rapporter le panier. (donc seDeplacer puis enlever le panier de la main droite et le remetre dans les paniers de l'épicerie.)

personne.seDeplacer(epicerie);
personne.mainDroite.splice(0);

// Afficher un petit message

console.log(`La main droite de notre ami Jeff contient ${personne.mainDroite.length} objets.`);

// Retourner à la maison pour continuer l'omelette
// Afficher un petit message

personne.seDeplacer(maison);

// Vérifier chaque ingrédient dans le bol et le couper seulement s'il est entier ! Pour ça on utilise la méthode couper de personnage

personne.mainGauche.push(couteau);
console.log(`${personne.nom} à désormais un ${couteau.nom} dans sa main gauche!`);

bol.contenu.forEach(element => {
    personne.couper(element, couteau);
});


// Mélanger le contenu du bol avec la méthode melanger. on va nommer ce mélange une 'omelette' (à passer en param).

bol.melanger("omelette");

// Afficher un message avec le nouveau mélange

console.log(`Le bol contient: ${bol.contenu.nom}`);

// vider le contenu du bol dans la poele. Il ne doit plus rien avoir dans le bol et y avoir juste l'omelette pas cuite.

poele.contenu.push(bol.contenu);
console.log(`La poele contient ${poele.contenu[0].nom} et il est à l'état: ${poele.contenu[0].etat}`);

// Cuire l'omelette avec la méthode de la poele 

poele.cuir();

// Afficher un message final, notre omelette est cuite :)