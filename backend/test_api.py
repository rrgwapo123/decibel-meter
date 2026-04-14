import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/"

def test_endpoint(method, path, data=None):
    url = f"{BASE_URL}{path}"
    print(f"Testing {method} {url}...")
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        
        print(f"Status Code: {response.status_code}")
        print("Response JSON:")
        print(json.dumps(response.json(), indent=2))
        print("-" * 30)
    except Exception as e:
        print(f"Error testing {url}: {e}")

# 1. Test Readings GET
test_endpoint("GET", "readings/")

# 2. Test Readings POST (Valid)
reading_data = {
    "sensor_id": "Sensor-002",
    "db_value": 75.2,
    "location": "Nazareth, CDO"
}
test_endpoint("POST", "readings/", reading_data)

# 3. Test Latest Reading GET
test_endpoint("GET", "readings/latest/")

# 4. Test Violations GET
test_endpoint("GET", "violations/")

# 5. Test Violations POST (Valid)
violation_data = {
    "title": "Noise: Night Market",
    "status": "PENDING",
    "vehicle_type": "Truck",
    "db_level": 110.5,
    "location": "Divisoria"
}
test_endpoint("POST", "violations/", violation_data)

# 6. Test Error Handling (Invalid Data)
invalid_data = {"db_value": "not-a-number"}
test_endpoint("POST", "readings/", invalid_data)
