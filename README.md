

# 🏎️ Formula 1 Data Analytics Dashboard

A **full-stack**  data analytics project that processes historical Formula 1 data from 1950 to 2024 year and visualizes key statistics with interactive web dashboard.

This project focuses primarily on backend data engineering and API development. Front-end was made
using chatgpt.

---

## 📍 Project Overview

The goal of this project was to take raw Formula 1 data placed in CSV files, transform and store it in database, and expose simple analytics through a API that can be consumed by a frontend application.

The workflow follows a realistic data pipeline used in real-world analytics systems.

---

## 💻Tech Stack

**Backend**
- Python
- PostgreSQL
- SQLAlchemy
- psycopg
- Pandas
- FastAPI
- Uvicorn

**Front-End**
- HTML
- CSS
- JavaScript
- Chart.js

---

# 🔄 Data Pipeline & Architecture

### 1️⃣ Data Source
- Formula 1 datasets were obtained from a public CSV data **source link: https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020**
- The CSV files contain historical race, driver, lap time, and pit stop data from 1950 to 2024.

### 2️⃣ Database Design
- Tables were created by me in **PostgreSQL** to match the structure of the CSV datasets.
- The database schema was designed to support analytical queries efficiently.

### 3️⃣ Data Ingestion
- **Pandas** was used to read CSV files.
- **psycopg** and **SQLAlchemy** were used to insert the cleaned and filtered data into **PostgreSQL**.

##### Only relevant columns and records were stored to optimize performance.

### 4️⃣ Data Processing & Analytics
A dedicated Python module was created containing functions that:
- Filter data by circuit, driver, and season range
- Calculate statistics such as:
    - Wins by circuit
    - Wins in general
    - Fastest laps
    - Fastest and slowest pit stops

### 5️⃣ API Development

- **FastAPI** was used to expose analytical endpoints.
- Each endpoint returns **JSON-formatted** data ready for visualization.
- Example endpoints include:
    - /wins-by-circuit
    - /most-wins
    - /fastest-lap
    - /fastest-pit
    - /slowest-pit

**Uvicorn** is used as the ASGI server for running the API.

### 6️⃣ Frontend Visualization

The frontend consumes data from the **FastAPI backend** using **fetch**.
- Data is visualized using Chart.js (bar charts).
- Users can:
    - Select circuits
    - Filter by year range
    - View comparative performance between drivers

### Note:
The frontend (HTML, CSS, JavaScript) was generated with the assistance of ChatGPT.
**The primary focus and contribution of this project is backend development, data processing, and API design**.

---

## How to Run the Project
1. Start PostgreSQL
Make sure PostgreSQL is running and the database is created.
2. Run the Backend
**uvicorn backend.main:app --reload**
3. Open the Frontend
Open the HTML file in a browser (e.g. using Live Server or directly from file).

---

## 🎯 Key Learning Outcomes

- Designing a relational database from **raw CSV data**
- Building a real data ingestion pipeline using **Pandas** and **PostgreSQL**
- Writing reusable analytics functions
- Creating REST APIs with **FastAPI**
- Connecting backend analytics to frontend visualizations
- Working with real-world motorsport datasets

---

## 👨🏼‍💼 Author

#### Backend & Data Engineering:
**Nikoloz Lomtadze** – database design, data ingestion, analytics, and API development

#### Frontend:
Generated with the assistance of **ChatGPT**