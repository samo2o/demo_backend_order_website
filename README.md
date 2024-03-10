# Rest API Documentation

## User Actions

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
