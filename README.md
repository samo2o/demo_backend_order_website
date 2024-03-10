# Short Rest API Documentation

## User Actions

### Signup
| Method | URL                                      | Body                              |
| ------ | ---------------------------------------- | --------------------------------- |
| POST   | http://localhost:500/api/v1/user/signup  | username, password, email         |

### Login
| Method | URL                                      | Body                  |
| ------ | ---------------------------------------- | --------------------- |
| POST   | http://localhost:500/api/v1/user/login   | username, password   |

### User Requests

#### Get All Food Data
| Method | URL                                      |
| ------ | ---------------------------------------- |
| GET    | http://localhost:500/api/v1/food         |

#### Get User Orders
| Method | URL                                      | Requires Token       |
| ------ | ---------------------------------------- | --------------------- |
| GET    | http://localhost:500/api/v1/food/my-orders | Yes                   |

#### Order Food Request
| Method | URL                                      | Requires Token       |
| ------ | ---------------------------------------- | --------------------- |
| POST   | http://localhost:500/api/v1/food/order/<food ID> | Yes              |

#### User Received Order Request
| Method | URL                                      | Requires Token       |
| ------ | ---------------------------------------- | --------------------- |
| POST   | http://localhost:500/api/v1/food/order/received/<food ID> | Yes      |

## Admin Actions

### Get All Orders
| Method | URL                                      | Requires Admin       |
| ------ | ---------------------------------------- | --------------------- |
| GET    | http://localhost:500/api/v1/admin/order  | Yes                   |

### Add New Food Data
| Method | URL                                      | Body                                  | Requires Admin       |
| ------ | ---------------------------------------- | ------------------------------------- | --------------------- |
| POST   | http://localhost:500/api/v1/admin/food/add | food_name, ingredients, price         | Yes                   |

### Edit Food Data
| Method | URL                                      | Body                                  | Requires Admin       |
| ------ | ---------------------------------------- | ------------------------------------- | --------------------- |
| PATCH  | http://localhost:500/api/v1/admin/food/<food ID> | food_name, ingredients, price    | Yes                   |

### Set Delivery Status
| Method | URL                                      | Body (newStatus: pending, delivering, completed, canceled, received) | Requires Admin       |
| ------ | ---------------------------------------- | ------------------------------------- | --------------------- |
| POST   | http://localhost:500/api/v1/admin/order/deliver/<food ID> | Yes             |

### Delete Food Data
| Method | URL                                      | Requires Admin       |
| ------ | ---------------------------------------- | --------------------- |
| DELETE | http://localhost:500/api/v1/admin/order/<food ID> | Yes             |
