# DSA Sheet Tracker - Quick Setup Guide 🚀

## Prerequisites
- Node.js (v14+)
- MongoDB installed locally

## Quick Setup (5 minutes)

### 1 Setup Backend
```bash

mkdir backend
cd backend

npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon

echo "MONGODB_URI=mongodb://localhost:27017/dsa-sheet" > .env
echo "JWT_SECRET=mysecretkey123" >> .env
echo "PORT=5001" >> .env
```

### 3️⃣ Setup Frontend
```bash
cd ..
npx create-react-app frontend
cd frontend
npm install axios

# If Any
rm -rf src/App.test.js src/logo.svg src/setupTests.js src/reportWebVitals.js
```

### 4️⃣ Start MongoDB
```bash
# Mac
brew services start mongodb-community

net start MongoDB

sudo systemctl start mongod
```
