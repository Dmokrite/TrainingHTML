//variables globales
//élem mémoires et écran
const memoireElt = document.querySelector("#memoire");
const ecranElt = document.querySelector("#ecran");

//on stock la valeur de l'écran "précédent"
let precedent = 0;

//on stock l'affichage
let affichage = "";

//on stock l'operration
let operation = null;

//on initialise la mémoire
let memoire;


window.onload = () => {
    
    //on écoute les clics sur les touches
    let touches = document.querySelectorAll("span");

    for(let touche of touches){
        touche.addEventListener("click", gererTouches);
    }
    //on écoute les touches du clavier
    document.addEventListener("keydown", gererTouches)

    //récupèrer de la mémoire depuis le stockage local
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if(memoire != 0) memoireElt.style.display = "initial";
}

//cette function réagit au clic sur les touches
function gererTouches(event){
    
    let touche;
    
    //on liste les touches autorisées
    const listeTouches = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "Enter", ".", "Escape"]
    
    //on vérifie si on a l'événement "keydown"
    if(event.type === "keydown"){
    
    //on compare la touche appuyée aux touches autorisées
    if(listeTouches.includes(event.key)){
        
        //on empêche l'utilisation par défaut de la touche
        event.preventDefault();
       
        //on stock la touche choisi dans la variable touche
        touche = event.key;
    }
    }else{
        touche = this.innerText;
    }

    

    //vérifie si chiffres ou .
    if(parseFloat(touche) >= 0 || touche === "." ){
       
        //à vérifier pour ne pas mettre plusieurs points dans la chaine
        //on met à jour la valeur affichage et on affiche sur écran
        affichage = (affichage === "") ? touche.toString() : affichage + touche.toString();
        ecranElt.innerText = affichage;
    }else{
        switch(touche){
            case "C":
            case "Escape":
                precedent = 0;
                affichage = "";
                operation = null
                ecranElt.innerText = 0;
                break;
                //calculs
            case "+":
            case "-":
            case "*":
            case "/":
                    //on calcule la valeur résultats de l'étape précédente
                    precedent = (precedent === 0) ? parseFloat(affichage) : 
                    calculer(precedent, parseFloat(affichage), operation);
                   
                    //on met à jour l'écran
                    ecranElt.innerText = precedent;
                    
                    //on stock l'opération
                    operation = touche;
                    
                    //on réinitialise la variable d'affichage
                    affichage = "";
                break;
                    case "=":
                    case "Enter":
                    
                    //on calcule la valeur résultats de l'étape précédente
                    precedent = (precedent === 0) ? parseFloat(affichage) : 
                    calculer(precedent, parseFloat(affichage), operation);
                    
                    //on met à jour l'écran
                    ecranElt.innerText = precedent;
                    
                    //on stock le résultat dans la variable d'affichage
                    affichage = precedent;
                    
                    //on reinit precedent
                    precedent = 0;
                break;
                   
                    //on gére la mémoire
                    case "M+":
                        
                        //on stock en additionnant à la valeur en mémoire
                        localStorage.memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) + parseFloat(affichage) : parseFloat(affichage);
                        
                        //on affiche le M
                        memoireElt.style.display = "initial";
                break;
                    case "MC":
                        
                        //on efface la mémoire
                        localStorage.memoire = 0;
                        
                        //on efface le M
                        memoireElt.style.display = none;
                break;
                    case "MR":
                        
                        //on récupère la valeur stockée
                        memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
                        affichage = memoire;
                        ecranElt.innerText = memoire;
                break;
            default: 
                break;


        }
    }
}
/**
 * 
 * effectue le calcul
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 * @returns number
 */

function calculer(nb1, nb2 ,operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
} 