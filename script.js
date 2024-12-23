// script.js

function submitFile() {
    const fileInput = document.getElementById('fileInput');
    const loader = document.getElementById('loader');
    const responseSection = document.getElementById('response');
    const chartContainer = document.getElementById('chartContainer');
    const ratingsTable = document.getElementById('ratingsTable');

    if (!fileInput.files.length) {
        alert("Please select a file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    loader.style.display = "block";
    responseSection.style.display = "none";

    fetch('http://127.0.0.1:5000/upload-excel', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            loader.style.display = "none";
            responseSection.style.display = "block";

            // Populate ratings table
            ratingsTable.innerHTML = "<tr><th>Comment</th><th>Emotion</th><th>Score</th></tr>";
            data.forEach(item => {
                const emotion = Object.entries(item.emotions).sort((a, b) => b[1] - a[1])[0]; // Highest score emotion
                let row = `<tr>
                    <td>${item.comment}</td>
                    <td>${emotion[0]}</td>
                    <td>${(emotion[1] * 100).toFixed(2)}%</td>
                </tr>`;
                ratingsTable.innerHTML += row;
            });

            // Display the pie chart (aggregated data)
            const emotionCounts = {};
            data.forEach(item => {
                const topEmotion = Object.entries(item.emotions).sort((a, b) => b[1] - a[1])[0];
                emotionCounts[topEmotion[0]] = (emotionCounts[topEmotion[0]] || 0) + 1;
            });

            chartContainer.style.display = "block";
            displayEmotionChart(emotionCounts);
        })
        .catch(error => {
            console.error('Error:', error);
            loader.style.display = "none";
            alert("Error processing the file.");
        });
}

// Function to handle text analysis
function analyzeText() {
    const userText = document.getElementById('userText').value;

    if (!userText) {
        alert("Please enter some text.");
        return;
    }

    const resultDiv = document.getElementById('textEmotionResult');
    resultDiv.innerHTML = "<p>Processing...</p>";

    fetch('http://127.0.0.1:5000/analyze-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userText }),
    })
        .then(response => response.json())
        .then(data => {
            const topEmotion = Object.entries(data.emotions).sort((a, b) => b[1] - a[1])[0];
            resultDiv.innerHTML = `
                <h3>Text: ${data.text}</h3>
                <p><strong>Emotion:</strong> ${topEmotion[0]} (${(topEmotion[1] * 100).toFixed(2)}%)</p>
            `;
        })
        .catch(error => {
            console.error(error);
            resultDiv.innerHTML = "<p>Error analyzing text. Please try again.</p>";
        });
}

function showTab(tabId, button) {
    // Hide all tabs
    document.getElementById('fileUploadTab').style.display = 'none';
    document.getElementById('textboxTab').style.display = 'none';

    // Remove the "active" class from all buttons
    const buttons = document.querySelectorAll('.nav-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show the selected tab and highlight the button
    document.getElementById(tabId).style.display = 'block';
    button.classList.add('active');
}


// Function to display pie chart with percentages using Chart.js
function displayEmotionChart(data) {
    const ctx = document.getElementById('emotionChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
                    '#FF9F40', '#FFCD56', '#36A2EB'
                ],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            let total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                            let currentValue = tooltipItem.raw;
                            let percentage = ((currentValue / total) * 100).toFixed(1);
                            return `${tooltipItem.label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });
}
