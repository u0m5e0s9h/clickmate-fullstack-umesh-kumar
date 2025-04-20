## Live Shopping App

A real-time live shopping web app built with **Next.js**, **NestJS**, **TypeORM**, **MySQL**, and **Socket.IO**.\
Buyers and sellers can chat live and place orders instantly.
 Live link: https://clickmate-frontend-yvjc.onrender.com/
---

## ⚙️ Setup Instructions
```
 # git clone https://github.com/u0m5e0s9h/clickmate-fullstack-umesh-kumar
```

### 📦 Backend

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install


# 5. Start the server
npm start
```

> 📍 Server runs on `http://localhost:3001`

---

### 💻 Frontend

```bash
# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run build

#4 Start frontend
 npm start
```

> 🖥️ App runs on `http://localhost:3000`

---

## 🛁 Socket.IO Usage

- Real-time chat between users using Socket.IO
- Emits:
  - `chat-message`: when a message is sent
- Listens:
  - `chat-message`: when a message is received
  - `new-order`: when an order is placed

> Used in: `chat.tsx` and `socket.gateway.ts`

---

## 🧪 API Specification

### ➕ Place Order

**URL**: `POST /orders`\
**Example**: `http://localhost:3001/orders`

**Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "productId": 101,
  "buyer": "Jane",
  "quantity": 1
}
```

**Success Response**:

```json
{
  "id": 1,
  "productId": 101,
  "buyer": "Jane",
  "quantity": 1
}
```

---

## 🧪 Postman Collection

✅ You can test the API using Postman.

---

## 📂 Project Structure

```
live-shopping-app/
├── backend/
│   ├── src/
│   │   ├── orders/
│   │   ├── socket/
│   │   └── ...
├── frontend/
│   ├── pages/index.tsx
│   └── components/Chat.tsx
│   
└── README.md
```

