var obstacle = document.getElementById("obstacle");
var hole = document.getElementById("hole");
var player = document.getElementById("player");

// Proměnné pro sledování stavu skákání a skóre
var jumping = 0;
var counter = 0;

hole.addEventListener('animationiteration', () => {
    // Nastavení nové náhodné pozice otvoru
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    // přičtení skóre
    counter++;
});


setInterval(function(){
    // Získání aktuální pozice postavičky
    var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));

    // Pokud postavička neskočí, pohybuje se směrem dolů
    if(jumping==0){
        player.style.top = (playerTop+3)+"px";
    }

    // Získání pozic bloku a otvoru
    var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-playerTop);

    // Detekce kolize
    if((playerTop>480)||((obstacleLeft<20)&&(obstacleLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        // Konec hry - zobrazení výsledku a resetování skóre
        alert("Hra skončila. Skóre: "+(counter-1));
        player.style.top = 100 + "px";
        counter=0;
    }
}, 10);

// Funkce pro provedení skoku
function jump(){
    jumping = 1;
    let jumpCount = 0;
    

    var jumpInterval = setInterval(function(){
        var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        
        if((playerTop>6)&&(jumpCount<15)){
            player.style.top = (playerTop-4)+"px";
        }
        
        // Konec skoku po určeném počtu iterací
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        
        jumpCount++;
    }, 10);
}
