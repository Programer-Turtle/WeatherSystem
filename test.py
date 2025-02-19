import requests

data = requests.post("http://localhost:3000/deleteaccount", json={"username":"karson","password":"KBPOSU10"})

print(data.status_code)
print(data.json())