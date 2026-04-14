# Smart IoT Decibel Meter Backend

This is the Django REST Framework backend for the Smart IoT Decibel Monitoring System. It provides APIs for real-time noise insights, data history, and system status.

## Features
- **Real-time API**: Provides endpoints for fetching the latest decibel readings.
- **Data Persistence**: Stores historical decibel data with timestamps and locations.
- **Cross-Origin Support**: Configured with CORS for React and React Native frontends.

## Tech Stack
- Django 6.x
- Django REST Framework
- SQLite (Development) / PostgreSQL (Production ready)

## API Endpoints
- `/`: Welcome message and endpoint list.
- `/api/readings/`: List all decibel readings or POST new ones.
- `/api/readings/latest/`: Get the single most recent reading.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/qwertycorvo/smart-iot-decibel-meter-backend.git
   cd smart-iot-decibel-meter-backend
   ```
2. **Create and activate virtual environment**:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Run migrations**:
   ```bash
   python manage.py migrate
   ```
5. **Start the server**:
   ```bash
   python manage.py runserver
   ```
