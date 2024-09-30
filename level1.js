console.log("Level 1 script loaded.");

let score = 0;
let clicks = 0, hits = 0; // World clicks and successful target hits, used to determine accuracy at the end of the game.
let timeLeft = 60;
const scoreLabel = document.getElementById("score");
const highScoreLabel = document.getElementById("highScore");
const gameWorld = document.getElementById("world");
const timer = document.getElementById("timeLeft");

const randomBetween = function (min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

gameWorld.addEventListener("click", () =>
{
    if(timeLeft > 0) clicks++;
});

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
    }
)

const spawnTarget = function () {
    const target = document.createElement("div");
    target.className = "largetarget dartboard";
    target.title = "Target"; // Equivalent to alt text for a div
    target.style.bottom = `${randomBetween(36, 62)}%`; // Set y level randomly
    gameWorld.appendChild(target);
    const spawnedTime = performance.now(); // Save the time the target was spawned at.

    // Main animation:
    let animationDuration = randomBetween(3600, 8000); // Time the target spends on screen
    let animationDirection = ["normal", "reverse"][randomBetween(0, 1)]; // Pick random direction!
    const targetAnim = target.animate(
        [
            {
                left: "-200px"
            },
            {
                left: "100%"
            }
        ],
        {
            duration: animationDuration,
            direction: animationDirection
        }
    );
    targetAnim.finished.then(() => target.remove()); // Remove target from screen if not clicked by end of animation, to avoid clutter.

    // Click event:
    target.addEventListener("click", () => {
        if (timeLeft > 0) {
            hits++; // Increment amount of successful hits
            targetAnim.pause(); // Freeze target

            // Reward user with points based on how quickly they reacted:
            const progressReactedAt = (performance.now() - spawnedTime) / animationDuration; // Calculate a number 0-1 for how far the animation got before clicking
            if (progressReactedAt <= 0.33) {
                score += 3;
            }
            else if (progressReactedAt <= 0.66) {
                score += 2;
            }
            else if (progressReactedAt <= 1) {
                score += 1;
            }

            scoreLabel.textContent = score;
            if (score > localStorage.getItem("l1HighScore")) { // Check if high score was beat
                localStorage.setItem("l1HighScore", score);
                highScoreLabel.textContent = localStorage.getItem("l1HighScore");

            }
            // ----------------------------

            const targetDespawnAnim = target.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(1.1)"
                    },
                    {
                        transform: "scale(0)"
                    }
                ],
                {
                    duration: 200
                })

            targetDespawnAnim.finished.then(() => target.remove());
        }
    },

        {
            once: true // Event listener should only fire once so target can not be repeatedly clicked.
        }
    );
}

// Set up local storage:
if (localStorage.getItem("l1HighScore") == undefined) {
    // Only set up high score storage if there isn't already a high score!
    localStorage.setItem("l1HighScore", 0);
}
highScoreLabel.innerText = localStorage.getItem("l1HighScore");

const spawnRate = randomBetween(1600, 2100); // Select a spawn rate in ms
console.log(`The spawn rate for this game is ${spawnRate}ms.`)
const spawnLoop = setInterval(spawnTarget, spawnRate);

// Decrease timer each second:
const countdown = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft > 40) {
        timer.style.color = "green";
    }
    else if (timeLeft > 20) {
        timer.style.color = "goldenrod";
    }
    else if (timeLeft > 10) {
        timer.style.color = "chocolate";
    }
    else {
        timer.style.color = "red";
    }


    if (timeLeft == 0) {
        clearInterval(countdown); // Stop countdown when it hits 0
        clearInterval(spawnLoop); // Stop spawning when timer hits 0
        document.getElementById('end-game-form').style.display = 'block';  // Display the end game form
    }
}, 1000);

// Function to handle form submission
console.log("Name submission loaded")
document.getElementById('score-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get player name from the form
    var playerName = document.getElementById('player-name').value;

    // Create an object to store player name and score
    var playerData = {
        name: playerName,
        score: score,
        accuracy: Math.round((hits / clicks) * 1000) / 10 // Gives a percentage (0-100) to 1 decimal place
    };

    // Get existing player data array from localstorage or create a new one if it doesn't exist
    var playerDataArray = JSON.parse(localStorage.getItem('playerDataArrayLevel1')) || [];

    // Add the new player data to the array
    playerDataArray.push(playerData);

    // Store the updated player data array back to local storage
    localStorage.setItem('playerDataArrayLevel1', JSON.stringify(playerDataArray));

    // Redirect to the leaderboard page
    window.location.replace("leaderboard.html");
});
