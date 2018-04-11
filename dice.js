var global1 = document.getElementById("global1");// le score qu'on hold (le global qu'on save)
var global2 = document.getElementById("global2");

var current_score_one = document.getElementById("current-score-one");//score dans le current
var current_score_two = document.getElementById("current-score-two");

var txt_result_game = document.getElementById("text-result-game");// affiche une phrase si on gagne ou on perd 

var new_game_btn = document.getElementById("new-game-btn");//les boutons
var roll_dice_btn = document.getElementById("rollDice-btn");
var hold_btn = document.getElementById("hold-btn");

var dice_one = document.getElementById("dice-one"); // dés en images
var dice_two = document.getElementById("dice-two");

var sum = 0 //la somme des 2 dés 
var holdsum1 = 0; //la somme du hold du player1
var holdsum2 = 0; //la somme du hold du player2
var player1 = true; //le player1 a la main au début du jeu
var player2 = false;

roll_dice_btn.onclick = function () {
    var dice1 = Math.floor(Math.random()*6) + 1;//génère chiffres aléatoires entre 1 et 6
    var dice2 = Math.floor(Math.random()*6) + 1;
    dice_one.src = './images/dice-' + dice1 + '.png';//les images s'affichent en fonction du chiffre généré
    dice_two.src = './images/dice-' + dice2 + '.png';
    var sum_two_dice = dice1 + dice2; //somme des 2 dés
    txt_result_game.innerHTML = "";

    //si un des dés tombe sur 1
    if(dice1 === 1 || dice2 === 1) {
        sum = 0;//la somme des dés revient à 0 dans current 
        if(player1) {
            player2 = true;//le player1 passe la main au player2
            player1 = false;
            document.getElementById('pl1').style.display = "none";//le bouton rouge passe du player1 au player2
            document.getElementById('pl2').style.display = "block";
            current_score_one.innerHTML = 0; //le current score revient à 0
            txt_result_game.innerHTML = "You loose :/" //message comme quoi le player1 perd
        }
        else {
            player2 = false;//le player2 passe la main au player1
            player1 = true; 
            document.getElementById('pl2').style.display = "none";//le bouton rouge passe du player2 au player1
            document.getElementById('pl1').style.display = "block";
            current_score_two.innerHTML = 0;
            txt_result_game.innerHTML = "You loose :("
        }
    }
    else {//si on tombe pas sur 1
        sum += sum_two_dice; // sum est égale à l'addition des 2 dés
        if(player1) { 
            current_score_one.innerHTML = sum;//on affiche dans current du player1 le résultat des dés 
        }
        else {
            current_score_two.innerHTML = sum;//sinon on affiche dans current du player2 le résultat des dés 
        }
    }
}

hold_btn.onclick = function() { // il va stocker ce qui est dans current dans global 

    if(player1) { 
        holdsum1 = holdsum1 + sum; //holdsum1 += sum; on ajoute sum à holdsum1 pour le playeur1
        if(holdsum1 < 100) { //si holdsum1 du player1 est inférieur à 100
            player2 = true; //on passe la main au player2
            player1 = false;
            document.getElementById('pl1').style.display = "none";//le bouton rouge passe du player1 au player2
            document.getElementById('pl2').style.display = "block";
            current_score_one.innerHTML = 0;//le current score du player1 retourne à 0 s'il passe la main au player2
            global1.innerHTML = holdsum1; //et le global du player1 est égale à holdsum1
        }
        else {
            global1.innerHTML = holdsum1;
            current_score_one.innerHTML = 0; //le current score du player1 retourne à 0 s'il gagne
            txt_result_game.innerHTML = "You win ;)" //sinon le player1 gagne
        }
    }

    else {
        holdsum2 = holdsum2 + sum; //holdsum2 += sum; on ajoute sum à holdsum2 pour le player2
        if(holdsum2 < 100) { //si le holdsum2 du player2 est inférieur à 100
            player2 = false; //on passe la main au player1
            player1 = true;
            current_score_two.innerHTML = 0;//le current score du player2 retourne à 0 s'il passe la main au player1
            document.getElementById('pl2').style.display = "none";//le bouton rouge passe du player2 au player1
            document.getElementById('pl1').style.display = "block";
            global2.innerHTML = holdsum2; //et le global du player2 est égale à holdsum2
        }
        else {
            global2.innerHTML = holdsum2;
            current_score_two.innerHTML = 0;//le current score du player2 retourne à 0 s'il gagne
            txt_result_game.innerHTML = "You win :D" // sinon le player2 gagne 
        }
    }
    sum = 0; // après le hold le sum dans current revient à 0
}

new_game_btn.onclick = function() {//ce bouton remet tout à 0
    global1.innerHTML = 0;
    global2.innerHTML = 0;
    current_score_one.innerHTML = 0; 
    current_score_two.innerHTML = 0;
    sum = 0;
    dice_one.src = 'images/heart.jpg';
    dice_two.src = 'images/heart.jpg';
    txt_result_game.innerHTML = "";
    document.getElementById('pl2').style.display = "none";//le bouton rouge passe du player2 au player1
    document.getElementById('pl1').style.display = "block";
}


/*
(a) Math.random( ) returns a random number between 0 and 1. 
Then we multiply it by 6 and add 1. This will give us a random 
number between 1 and 7.

(b) Math.floor takes whatever number is in the parentheses, 
and rounds it down to the nearest whole number. This will 
give us a random number between 1 and 6.

This means our die variable will always be a random number 
between 1 and 6 every time we run the code.
 */