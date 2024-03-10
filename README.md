<img src="https://drive.google.com/uc?export=view&id=1Dw3fJoMMTSthSo4pCyi0Eyo2E-1TvjY4" width="200" height="200" />
# Rest API User Actions

### Signup

- **Method:** POST
- **URL:** http://localhost:500/api/v1/user/signup
- **Body:** username, password, email

### Login

- **Method:** POST
- **URL:** http://localhost:500/api/v1/user/login
- **Body:** username, password

## User Requests

### Get All Food Data

- **Method:** GET
- **URL:** http://localhost:500/api/v1/food

### Get User Orders

- **Method:** GET
- **URL:** http://localhost:500/api/v1/food/my-orders
- **Requires Token:** Yes

### Order Food Request

- **Method:** POST
- **URL:** http://localhost:500/api/v1/food/order/<food ID>
- **Requires Token:** Yes

### User Received Order Request

- **Method:** POST
- **URL:** http://localhost:500/api/v1/food/order/received/<food ID>
- **Requires Token:** Yes

## Admin Actions

### Get All Orders

- **Method:** GET
- **URL:** http://localhost:500/api/v1/admin/order
- **Requires Admin:** Yes

### Add New Food Data

- **Method:** POST
- **URL:** http://localhost:500/api/v1/admin/food/add
- **Body:** food_name, ingredients, price
- **Requires Admin:** Yes

### Edit Food Data

- **Method:** PATCH
- **URL:** http://localhost:500/api/v1/admin/food/<food ID>
- **Body:** food_name, ingredients, price
- **Requires Admin:** Yes

### Set Delivery Status

- **Method:** POST
- **URL:** http://localhost:500/api/v1/admin/order/deliver/<food ID>
- **Body:** newStatus (options: pending, delivering, completed, canceled, received)
- **Requires Admin:** Yes

### Delete Food Data

- **Method:** DELETE
- **URL:** http://localhost:500/api/v1/admin/order/<food ID>
- **Requires Admin:** Yes

# MongoDB Installation and Configuration

## Install MongoDB:

1. Open a terminal.
```
sudo apt update
```

2. Install MongoDB.
```
sudo apt install -y mongodb
```

3. Start MongoDB service.
```
sudo systemctl start mongodb
```

4. Enable MongoDB to start on boot.
```
sudo systemctl enable mongodb
```

5. Open a new terminal and run the following command to start MongoDB with the specified configuration.
```
sudo mongod --replSet rs0 --port 27017 --oplogSize 128
```

6. Open another terminal.
Access the MongoDB shell.
```
mongosh
```

7. In the MongoDB shell, initiate the replica set.
```
rs.initiate()
```

8. Create and use a database.
```
use demo_order_website_1
```

9. Create a user with read-write permissions.
```
db.createUser({ user: 'samo', pwd: '123', roles: ['readWrite'] })
```

# Starting the ExpressJS Server

To run the ExpressJS server, follow these simple steps:

1. **Navigate to the project directory:**
```
cd path/to/your/project
```

2. **Install dependencies:**
```
npm install
```

3. **Start the server:**
```
npm start
```
