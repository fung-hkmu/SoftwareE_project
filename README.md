# SoftwareE_project
COMP 3500SEF 9-12/2024 - Group3 - Food Ordering and Tracking App
# | Frontend |
1. Enter your phone number and password, and click the "Log In" button to log in. If you don't have an account, click "Registration" to register.
2. Fill all the required information and click "Submit" button to finish registration.
3. Click "Order now" button to start ordering food.
4. Click the button on the right hand side of your targeted food kind.
5. Click the item that you want.
6. Click the "Add to shopping bag" button to add item to your shopping cart.
7. If you want to order more food, click "Purchase additional food" button. If you finish ordering, click "Choose how to pick up your meal".
8. In the payment page, you can select the payment method you want and click "Confirm payment" button to confirm. 
9. You can review your order record in the record page. Click the record row that you want to detail information.

# | Backend |
## Usage
Start the server with:
```bash
npm start
```
## API Documentation

### Authentication

#### Register User
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created:** 
    ```json
    {
      "message": "register success"
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "message": "Username already exists"
    }
    ```
  - **500 Internal Server Error:** 
    ```json
    {
      "message": "register fail",
      "error": "error details"
    }
    ```

#### Login User
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** 
    ```json
    {
      "accessToken": "string"
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "message": "wrong username or password"
    }
    ```

### Account Management

#### Get User Data
- **Endpoint:** `POST /api/acct/userData`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Include the access token obtained during login)
- **Response:**
  - **200 OK:** 
    ```json
    {
      "username": "string",
      ...
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "message": "user not found"
    }
    ```
  - **500 Internal Server Error:** 
    ```json
    {
      "message": "Internal server error"
    }
    ```

### Image Management

#### Upload Image
- **Endpoint:** `POST /api/image/upload`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Request Body:** Form-data with `image` field and `imageID` parameter
  - **Form-data Example:**
    - Key: `image` (file)
    - Key: `imageID` (string)
- **Response:**
  - **201 Created:** 
    ```json
    {
      "message": "File uploaded successfully.",
      "file": {
        "filename": "string",
        "size": "number",
        "contentType": "string"
      }
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "message": "No file uploaded."
    }
    ```

#### Get Image by Filename
- **Endpoint:** `GET /api/image/:filename`
- **Response:**
  - **200 OK:** Returns the image file
  - **404 Not Found:** 
    ```json
    {
      "message": "File not found."
    }
    ```
### Menu Management

#### Get Menu
- **Endpoint:** `GET /api/meun/menu`
- **Response:**
  - **200 OK:** 
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "price": "number",
        ...
      }
    ]
    ```

#### Get Menu Item by ID
- **Endpoint:** `GET /api/meun/menu/:id`
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "name": "string",
      ...
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Menu item not found."
    }
    ```

#### Get Disabled Menu Items
- **Endpoint:** `GET /api/meun/disabledmenu`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **200 OK:** 
    ```json
    [
      {
        "id": "string",
        "name": "string",
        ...
      }
    ]
    ```
  - **403 Forbidden:** 
    ```json
    {
      "message": "Access denied."
    }
    ```

#### Get Disabled Menu Item by ID
- **Endpoint:** `GET /api/meun/disabledmenu/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "name": "string",
      ...
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Disabled menu item not found."
    }
    ```

---

#### Add Menu Item
- **Endpoint:** `POST /api/meun/addmenu`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "withDrink": "boolean",
    "category": "string",
    "available": "boolean",
    "provideTime": {
      "startTime": "string",
      "endTime" : "string"
    }
  }
  ```
- **Response:**
  - **201 Created:** 
    ```json
    {
      "id": "string",
      "menu": {"menu details"}
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error adding menu item."
    }
    ```
#### Edit Menu Item
- **Endpoint:** `PUT /api/meun/editmenu/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "withDrink": "boolean",
    "category": "string",
    "available": "boolean",
    "provideTime": {
      "startTime": "string",
      "endTime" : "string"
    }
  }
  ```
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "menu": {"updated menu details"}
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Menu item not found."
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error editing menu item."
    }
    ```

#### Delete Menu Item
- **Endpoint:** `DELETE /api/meun/deletemenu/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **204 No Content:** Successfully deleted
  - **404 Not Found:** 
    ```json
    {
      "error": "Menu item not found."
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error deleting menu item."
    }
    ```

#### Disable Menu Item
- **Endpoint:** `PATCH /api/meun/disablemenu/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "name": "string",
      ...
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Menu item not found."
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error disabling menu item."
    }
    ```

### Drink Management

#### Get Drinks
- **Endpoint:** `GET /api/meun/drink`
- **Response:**
  - **200 OK:** 
    ```json
    [
      {
        "id": "string",
        "name": "string",
        ...
      }
    ]
    ```

#### Get Drink by ID
- **Endpoint:** `GET /api/meun/drink/:id`
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "name": "string",
      ...
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Menu item not found."
    }
    ```

#### Get Disabled Drinks
- **Endpoint:** `GET /api/meun/alldrink`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **200 OK:** 
    ```json
    [
      {
        "id": "string",
        "name": "string",
        ...
      }
    ]
    ```

#### Get Disabled Drink by ID
- **Endpoint:** `GET /api/meun/alldrink/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "name": "string",
      ...
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Drink not found."
    }
    ```

#### Add Drink
- **Endpoint:** `POST /api/meun/adddrink`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "priceWithSet": "number",
    "available": "boolean",
    "provideTime": {
      "startTime": "string",
      "endTime" : "string"
    }
  }
  ```
- **Response:**
  - **201 Created:** 
    ```json
    {
      "id": "string",
      "drink": {"drink details"}
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error adding drink."
    }
    ```
#### Edit Drink
- **Endpoint:** `PUT /api/meun/editDrink/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "priceWithSet": "number",
    "available": "boolean",
    "provideTime": {
      "startTime": "string",
      "endTime" : "string"
    }
  }
  ```
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "drink": {"updated drink details"}
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Drink not found."
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error editing drink."
    }
    ```

#### Delete Drink
- **Endpoint:** `DELETE /api/meun/deleteDrink/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **204 No Content:** Successfully deleted
  - **404 Not Found:** 
    ```json
    {
      "error": "Drink not found."
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error deleting drink."
    }
    ```

#### Disable Drink
- **Endpoint:** `PATCH /api/meun/disableDrink/:id`
- **Headers:**
    - **Authorization:** Bearer <access_token> (Requires admin role)
- **Response:**
  - **200 OK:** 
    ```json
    {
      "id": "string",
      "name": "string",
      ...
    }
    ```
  - **404 Not Found:** 
    ```json
    {
      "error": "Drink not found."
    }
    ```
  - **400 Bad Request:** 
    ```json
    {
      "error": "Error disabling drink."
    }
    ```

### Notes
- Make sure to include the **Authorization** header in your requests for endpoints that require authentication.
- The format for the authorization header should be: `Bearer <access_token>`, where `<access_token>` is the token returned during login.
- All endpoints that modify data require appropriate authorization.
