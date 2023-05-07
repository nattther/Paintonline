var scene = document.querySelector('#scene')
scene.width = 700;
scene.height = 500;
var ctx = scene.getContext('2d');
var effacer = document.querySelector('.effacer');
var choiceColor = document.querySelector('#color');
var color = "black";
var btnShowColor = document.querySelector('.showcolor');
var choiceText = document.querySelector('.choiceText')
var range = document.querySelector('.range');
var taille = 10;
var montreTaille = document.querySelector('.indicator')
var coordinates = [0, 0];
var posX = 0;
var posY = 0;
var pinceaux = "carre";
var carré = document.querySelector('.square')
var cercle = document.querySelector('.circle')
var nuageCarré = document.querySelector('.nuageSquare')
var nuageCercle = document.querySelector('.nuageCircle')
var trait = document.querySelector('.trait');
var ismousedown = false;
var gomme = document.querySelector('.gomme');



//Fonctions 
function square(x, y, size, color) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.fill()
    ctx.closePath();

}

function arc(x, y, size, color) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

}

function nuageSquare(x, y, size, color) {
    for (var i = 0; i < 5; i++) {
        var random1 = Math.floor(Math.random() * size);
        var random2 = Math.floor(Math.random() * size);
        var newx = x + random1
        var newy = y + random2
        square(newx, newy, 5, color)


    }
}

function nuageCircle(x, y, size, color) {
    for (var i = 0; i < 5; i++) {
        var random1 = Math.floor(Math.random() * size);
        var random2 = Math.floor(Math.random() * size);
        var newx = x + random1
        var newy = y + random2
        arc(newx, newy, 5, color)
    }

}



//Effacer

effacer.addEventListener('click', function () {
    ctx.clearRect(0, 0, scene.width, scene.height);
})

// choix couleur et affichage
choiceColor.addEventListener("input", function (e) {

    color = e.target.value;
    choiceText.innerHTML = color

})
// choix taille et affichage
range.addEventListener("input", function (e) {
    taille = e.target.value;
    montreTaille.innerHTML = taille + "px"

})
// choix pinceaux
cercle.addEventListener("click", function () {
    pinceaux = "cercle";
})
carré.addEventListener("click", function () {
    pinceaux = "carre";
})
nuageCarré.addEventListener("click", function () {
    pinceaux = "nuageCarre";
})
nuageCercle.addEventListener("click", function () {
    pinceaux = "nuageCercle";
})
trait.addEventListener("click", function () {
    pinceaux = "trait";
})
gomme.addEventListener('click',function(){
    pinceaux = "gomme";
})




// position du click et affichage
scene.addEventListener('mousedown', function (e) {
    ismousedown = true

    posX = e.offsetX - (taille / 2)
    posY = e.offsetY - (taille / 2)
    


    if (pinceaux == "carre") {
        square(posX, posY, taille, color)
    }
    if (pinceaux == "cercle") {
        arc(posX, posY, taille, color)
    }



})
scene.addEventListener('mouseup', function () {
    ismousedown = false
})

scene.addEventListener('mousemove', function (e) {
    if (ismousedown) {
        NposX = e.offsetX - (taille / 2)
        NposY = e.offsetY - (taille / 2)
        if (pinceaux == "nuageCarre") {
            nuageSquare(NposX, NposY, taille, color)
        }
        if (pinceaux == "nuageCercle") {
            nuageCircle(NposX, NposY, taille, color)
        }
        if (pinceaux == "trait") {

            ctx.beginPath();
            ctx.moveTo(posX, posY);
            posX = e.offsetX;
            posY = e.offsetY;
            ctx.lineTo(posX, posY);
            ctx.lineWidth = taille;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();
        }
        if (pinceaux == "gomme"){
            ctx.clearRect(NposX, NposY, taille, taille);
        }



    }
}
)


