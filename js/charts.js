// charts.js
// Renders a bar chart of average ratings for the current session using Chart.js

let ratingsChart = null;

export function renderRatingsChart(beerData) {
    const ctx = document.getElementById("ratingsChart").getContext("2d");

    const labels = beerData.map(b => b.name);
    const averages = beerData.map(b => b.avg || 0);

    if (ratingsChart) {
        ratingsChart.destroy();
    }

    ratingsChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Average Rating",
                    data: averages,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}