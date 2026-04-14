import requests
import json
import random
import string

BASE_URL = "http://127.0.0.1:8000/api/auth/"

def generate_random_string(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def test_auth():
    username = f"user_{generate_random_string(5)}"
    password = "password123"
    email = f"{username}@example.com"

    # 1. Test Registration
    print(f"--- Testing Registration for {username} ---")
    reg_data = {
        "username": username,
        "password": password,
        "email": email
    }
    response = requests.post(f"{BASE_URL}register/", json=reg_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code != 201:
        print("Registration failed!")
        return

    # 2. Test Login
    print(f"\n--- Testing Login for {username} ---")
    login_data = {
        "username": username,
        "password": password
    }
    response = requests.post(f"{BASE_URL}login/", json=login_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code != 200:
        print("Login failed!")
        return
    
    token = response.json().get('token')

    # 3. Test Profile (Authenticated Request)
    print(f"\n--- Testing Profile (Authenticated) ---")
    headers = {"Authorization": f"Token {token}"}
    response = requests.get(f"{BASE_URL}profile/", headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

    # 4. Test Accessing Protected Data
    print(f"\n--- Testing Accessing Readings (Authenticated) ---")
    response = requests.get("http://127.0.0.1:8000/api/readings/", headers=headers)
    print(f"Status Code: {response.status_code}")
    # print(f"Response: {json.dumps(response.json()[:2], indent=2)} ...")

if __name__ == "__main__":
    try:
        test_auth()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the Django server is running.")
