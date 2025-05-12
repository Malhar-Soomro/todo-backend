# Todo Backend

## Project Setup Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Malhar-Soomro/todo-backend
cd todo-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=5000
MONGO_URI=mongo_connection_string
JWT_SECRET=jwt_secret
```

### 4. Run the Project

```bash
npm start
```

---

## Deployment on Render

### Steps to Deploy:

1. Push this project to a GitHub repository.
2. Go to [Render](https://render.com).
3. Create a new **Web Service**.
4. Connect your GitHub repository.
5. Set the following configurations:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
6. Add the following environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`

And then click on deploy.

> **Live Example:** https://todo-backend-1v3r.onrender.com/

---

## API Usage Examples

### Auth

#### Register

**POST** `/api/auth/register`

```json
{
  "firstName": "Malhar",
  "lastName": "Soomro",
  "email": "malharsoomro2@gmail.com",
  "password": "123456"
}
```

#### Login

**POST** `/api/auth/login`

```json
{
  "email": "malharsoomro2@gmail.com",
  "password": "123456"
}
```

#### Get Authenticated User

**GET** `/api/auth/user`

**Headers:**

```
Authorization: Bearer <token>
```

---

### Todos

#### Get All Todos

**GET** `/api/todos/`

**Headers:**

```
Authorization: Bearer <token>
```

#### Add a Todo

**POST** `/api/todos/add-todo`

```json
{
  "title": "Task title",
  "description": "Task description"
}
```

#### Mark or unmark todo

**PUT** `/api/todos/update-status/:id`

```json
{
  "completed": true
}
```

#### Delete a Todo

**DELETE** `/api/todos/delete/:id`

**Headers:**

```
Authorization: Bearer <token>
```
