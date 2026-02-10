# Mental Health Chatbot - Setup Guide

## ✅ Installation Complete

Both frontend and backend dependencies have been successfully installed and secured.

## 📦 What Was Installed

### Frontend (React)
- React 18
- React Router v6
- Axios
- Lucide React Icons
- React Scripts
- All dependencies: **1301 packages**
- Security vulnerabilities: **Fixed ✓**

### Backend (Node.js)
- Express.js
- MongoDB/Mongoose
- JWT & Bcrypt for authentication
- All dependencies secured
- Security vulnerabilities: **Fixed ✓**

## 🚀 Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on: **http://localhost:5000**

You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### 2. Start the Frontend Application

In a **new terminal** window:

```bash
cd frontend
npm start
```

The frontend will open at: **http://localhost:3000**

## ⚙️ Initial Configuration

### Backend Environment Setup

1. Create `.env` file in the `backend` directory:

```bash
cp backend/.env.example backend/.env
```

2. Edit `backend/.env` and update:

```env
MONGODB_URI=mongodb://localhost:27017/mental-health-chatbot
PORT=5000
JWT_SECRET=your_secure_jwt_secret_key_here
NODE_ENV=development
```

### MongoDB Setup Options

**Option 1: Local MongoDB**
```
Install MongoDB Community Edition
Start MongoDB service
Use: mongodb://localhost:27017/mental-health-chatbot
```

**Option 2: MongoDB Atlas (Cloud)**
```
Create free cluster at https://www.mongodb.com/cloud/atlas
Get connection string
Use in MONGODB_URI
```

## 🧪 Testing the Application

### 1. User Registration
- Go to http://localhost:3000
- Click "Sign up"
- Fill in details (name, email, password)
- Account created ✓

### 2. Login
- Use credentials you registered
- You'll be redirected to chat page

### 3. Chat
- Type messages and get responses
- Try keywords like: "anxiety", "stress", "sad", "sleep"
- View chat history

### 4. Profile
- Edit your profile information
- Update preferences

### 5. Resources
- View mental health resources
- Access crisis helplines

## 📋 Project Structure

```
MentalHealthChatBot/
├── frontend/                 (React App)
│   ├── node_modules/        (Dependencies installed ✓)
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── api.js
│   └── ...
│
├── backend/                  (Node.js Server)
│   ├── node_modules/        (Dependencies installed ✓)
│   ├── package.json
│   ├── package-lock.json
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env.example
│
├── README.md                 (Full documentation)
├── SETUP.md                  (This file)
└── .git/                     (GitHub repository)
```

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Chat
- `POST /api/chat/send` - Send message
- `GET /api/chat/sessions` - Get all sessions
- `GET /api/chat/history/:sessionId` - Get chat history
- `DELETE /api/chat/session/:sessionId` - Delete session

### User
- `GET /api/user/profile` - Get profile
- `PUT /api/user/update` - Update profile

### Resources
- `GET /api/resources` - Get mental health resources

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error
**Solution:** 
- Verify MongoDB is running locally OR
- Update MONGODB_URI in .env to your MongoDB Atlas connection string
- Check .env file is in the backend directory

### Issue: Port Already in Use
**Solution:**
- Change PORT in backend/.env to another port (e.g., 5001)
- Clear terminal and restart

### Issue: npm command not found
**Solution:**
- Use `npm.cmd` instead of `npm` on Windows PowerShell
- Or use Command Prompt (cmd.exe) instead
- Verify Node.js is installed: `node --version`

### Issue: CORS Errors  
**Solution:**
- Verify both frontend and backend are running
- Check API URL in frontend/src/api.js matches backend port
- Restart both servers

## 📝 Development Notes

- **Frontend** hot-reloads automatically on file changes
- **Backend** requires manual restart after code changes (use nodemon in dev)
- Check browser console for frontend errors
- Check terminal for backend errors

## 🔐 Security

- Passwords are hashed using bcryptjs
- JWT tokens expire in 7 days
- API routes are protected with authentication middleware
- Environment variables store sensitive data

## 📂 GitHub Repository

```
Repository: https://github.com/rakshith123-cyber/Personal-Mental-Health-Advisor
Status: ✓ All files pushed to GitHub
Commits: 1 (Initial commit)
```

## 🎯 Next Steps

1. ✅ Install dependencies (DONE)
2. ✅ Push to GitHub (DONE)
3. Setup MongoDB connection
4. Start backend server
5. Start frontend server
6. Test the application
7. Deploy to production (optional)

## 📞 Support

For issues or questions:
- Check README.md for full documentation
- Review error messages in terminal/console
- Verify all environment variables are set correctly

---

**Setup completed on:** February 10, 2026
**All security vulnerabilities:** Fixed ✓
**Dependencies installed:** ✓
**GitHub status:** Pushed ✓
