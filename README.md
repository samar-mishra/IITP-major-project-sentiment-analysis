# IITP-major-project-sentiment-analysis
Team Members - Pawan Kumar Singh, Umesh Raavi and Samar Mishra

Project Title: Sentiment Analysis Project

Description: A web application that performs sentiment analysis on text data.Users can upload an Excel file or input text to analyze emotions using a pre-trained model.

Technologies Used:
Frontend: HTML, CSS, JavaScript
Backend: Python (Flask)

Libraries:
1. Flask (for backend server)
2. Flask-CORS (to handle cross-origin requests)
3. Transformers (for emotion detection model)
4. OpenPyXL (to process Excel files)

Features:
1. Upload an Excel file to detect emotions in comments.
2. Analyze emotions from user-provided text.
3. Interactive web interface.

Steps to Run the Project:

1. Clone the Repository:
git clone https://github.com/samar-mishra/IITP-major-project-sentiment-analysis.git
cd IITP-major-project-sentiment-analysis

2. Install Required Libraries:
pip install flask flask-cors transformers openpyxl

3. Run the Backend:
Open app.py in your Python IDE and run it.
The server will start on http://127.0.0.1:5000.

4. Open the Frontend
Open index.html in your web browser.

5. Use the Application
Upload an Excel file or input text to analyze emotions.

Endpoints:
1. POST /upload-excel : Accepts an Excel file and returns emotions for each comment.
2. POST /analyze-text : Accepts text input and returns detected emotions.

Acknowledgments:
Pre-trained model: j-hartmann/emotion-english-distilroberta-base (Hugging Face)
