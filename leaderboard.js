console.log("Leaderboard script loaded.");

document.addEventListener("DOMContentLoaded", function () {
    //Retrieve data from localStorage
    let playerDataArrayLevel1 = JSON.parse(localStorage.getItem("playerDataArrayLevel1")) || [];

<<<<<<< HEAD
    //Function to sort data in the array based on user scores
    function sortPlayerData(playerDataArray) {
        playerDataArray.sort((a, b) => b.score - a.score);
        return playerDataArray;
    }

    //Function to generate data for the leaderboard using HTML 
    function generateLeaderboard() {
        const leaderboardTable = document.getElementById('easyLeaderboard'); // Assuming you want to populate the 'Easy' leaderboard
        leaderboardTable.innerHTML = ''; // Clear existing rows
=======
    //Sort data in the array based on user scores
    playerDataArrayLevel1.sort((a, b) => b.score - a.score);

    //Function to generate data for the leaderboard using HTML 
    function generateLeaderboard() {
        let easyLeaderboard = document.getElementById("easyLeaderboard");
>>>>>>> 6e58c0e2a8e42cf15cc254ddc203fae523470d73

        playerDataArrayLevel1.forEach((player, index) => {
            const row = `<tr>
                          <td>${index + 1}</td>
                          <td>${player.name}</td>
                          <td>${player.score}</td>
                          <td>${player.date}</td>
                          <td>${player.accuracy}%</td>
                        </tr>`;
<<<<<<< HEAD
            leaderboardElement.insertAdjacentHTML('beforeend', row);
        });
=======
            easyLeaderboard.insertAdjacentHTML('beforeend', row);
          });
>>>>>>> 6e58c0e2a8e42cf15cc254ddc203fae523470d73
    }

    //Initial leaderboard generation
    generateLeaderboard();

    //Function to update leaderboard
    function updateLeaderboard() {
        //Retrieve latest data from localStorage
        playerDataArray = JSON.parse(localStorage.getItem("playerDataArray")) || [];
        //Sort data based on scores
        playerDataArray.sort((a, b) => b.score - a.score);
        //Generate and display updated leaderboard
        generateLeaderboard();
    }

    //Update leaderboard whenever there's a change in the scores
    window.addEventListener("storage", updateLeaderboard);

    //If no player data found, display a message
    if (playerDataArray.length === 0) {
        let leaderboardElement = document.getElementById("leaderboard");
        leaderboardElement.innerHTML = "<p>No player data available</p>";
    }

});
