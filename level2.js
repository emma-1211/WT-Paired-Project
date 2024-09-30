console.log("Level 2 script loaded.");

let score = 0;
const scoreLabel = document.getElementById("score");
const highScoreLabel = document.getElementById("highScore");
const gameWorld = document.getElementById("world");

// Add water:
const waterLine = document.createElement("img");
waterLine.src = "media/water.png";
waterLine.className = "water";
gameWorld.appendChild(waterLine);

const animWater = waterLine.animate(
    [
        {
            transform: "translateY(0px)"
        },
        {
            transform: "translateY(8px)"
        },
        {
            transform: "translateY(0px)"
        }        
    ],
    {
        duration: 2000,
        easing: "linear",
        iterations: Infinity
    })
// Reset score:
localStorage.setItem("l2Score", 0)

// Set up local storage:
if(localStorage.getItem("l2HighScore") == undefined)
{
    // Only set up high score storage if there isn't already a high score!
    localStorage.setItem("l2HighScore", 0);
}
highScoreLabel.innerText = localStorage.getItem("l2HighScore");

