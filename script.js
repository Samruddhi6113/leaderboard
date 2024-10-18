document.addEventListener("DOMContentLoaded", function() {
    fetch('Shri Sant Gajanan Maharaj College of Engineering - Shegaon, India [18 Oct].csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            Papa.parse(data, {
                header: true,
                complete: function (results) {
                    const sortedData = sortData(results.data);
                    populateTable(sortedData);
                },
                error: function (error) {
                    console.error("Error parsing CSV:", error);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching the CSV file:", error);
        });
});

function sortData(data) {
    return data.sort((a, b) => {
        const totalBadgesA = parseInt(a['All Skill Badges & Games Completed']) || 0;
        const totalBadgesB = parseInt(b['All Skill Badges & Games Completed']) || 0;

        const skillBadgesA = parseInt(a['# of Skill Badges Completed']) || 0;
        const skillBadgesB = parseInt(b['# of Skill Badges Completed']) || 0;

        const arcadeGamesA = parseInt(a['# of Arcade Games Completed']) || 0;
        const arcadeGamesB = parseInt(b['# of Arcade Games Completed']) || 0;

        const nameA = a['User Name'];
        const nameB = b['User Name'];

        // Sorting criteria
        if (totalBadgesA !== totalBadgesB) return totalBadgesB - totalBadgesA;
        if (skillBadgesA !== skillBadgesB) return skillBadgesB - skillBadgesA;
        if (arcadeGamesA !== arcadeGamesB) return arcadeGamesB - arcadeGamesA;
        if (a['Access Code Redemption Status'] === b['Access Code Redemption Status']) {
            return nameA.localeCompare(nameB); // Alphabetically if all else is the same
        }

        // Access code redemption status
        return (a['Access Code Redemption Status'] === 'Yes') ? -1 : 1;
    }).filter(row => row['User Name']);
}

function populateTable(data) {
    const tbody = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing table data

    data.forEach((row, index) => {
        const newRow = tbody.insertRow();
        newRow.insertCell().textContent = index + 1; // Rank
        newRow.insertCell().textContent = row['User Name'];
        // newRow.insertCell().textContent = row['User Email'];
        newRow.insertCell().textContent = row['Access Code Redemption Status'];
        newRow.insertCell().textContent = row['All Skill Badges & Games Completed'];
        newRow.insertCell().textContent = row['# of Skill Badges Completed'];
        newRow.insertCell().textContent = row['# of Arcade Games Completed'];
    });
}









