# Mental Health Chatbot 🧠💚

A comprehensive full-stack application designed to provide mental health support through an AI-powered conversational chatbot.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Interactive Chat**: Real-time conversation with a supportive AI chatbot
- **Chat History**: Access and manage previous conversations
- **User Profile**: Manage personal information and preferences
- **Mental Health Resources**: Curated list of crisis helplines and support services
- **Responsive Design**: Beautiful UI with gradient themes and smooth animations
- **Session Management**: Multiple chat sessions for different conversations

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios (HTTP client)
- Lucide React (Icons)
- CSS3 with Flexbox and Grid

### Backend
- Node.js with Express
- MongoDB
- JWT Authentication
- Bcrypt (Password hashing)
- Mongoose (ODM)

## Project Structure

```
MentalHealthChatBot/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.js
│   │   │   ├── ChatWindow.css
│   │   │   ├── Sidebar.js
│   │   │   ├── Sidebar.css
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Chat.js
│   │   │   ├── Chat.css
│   │   │   ├── Profile.js
│   │   │   ├── Profile.css
│   │   │   ├── Resources.js
│   │   │   ├── Resources.css
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Auth.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── api.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── chatController.js
│   ├── models/
│   │   ├── User.js
│   │   └── ChatSession.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── user.js
│   │   └── resources.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/mental-health-chatbot
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (if needed):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Chat
- `POST /api/chat/send` - Send a message (requires auth)
- `GET /api/chat/history/:sessionId` - Get chat history (requires auth)
- `GET /api/chat/sessions` - Get all chat sessions (requires auth)
- `DELETE /api/chat/session/:sessionId` - Delete a chat session (requires auth)

### User
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/update` - Update user profile (requires auth)

### Resources
- `GET /api/resources` - Get mental health resources

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Start Chatting**: Click on the chat area and start typing your message
3. **View Profile**: Click on Profile to view and edit your information
4. **Access Resources**: Browse mental health resources and crisis helplines
5. **Manage Sessions**: View all previous chat sessions and delete them if needed

## Features in Detail

### Chatbot Intelligence
The chatbot uses keyword matching to provide contextual responses to mental health-related topics including:
- Anxiety and panic
- Stress management
- Depression and sadness
- Sleep issues
- Exercise and wellness
- General wellness support

### Security
- Passwords are hashed using bcryptjs
- JWT tokens for session management
- Protected routes on frontend and backend
- Secure API endpoint authentication

### UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation
- Professional color scheme (purple gradient)
- Real-time message updates

## Mental Health Resources Included

- National Suicide Prevention Lifeline (1-800-273-8255)
- Crisis Text Line (Text 741741)
- SAMHSA National Helpline (1-800-662-4357)
- Mental Health America
- NAMI (National Alliance on Mental Illness)

## Future Enhancements

- Integration with OpenAI API for more advanced chatbot
- Voice chat support
- Mood tracking and analytics
- Guided meditation and exercises
- Appointment scheduling with therapists
- Mobile app (React Native)
- Advanced NLP for better understanding

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you're experiencing a mental health crisis, please reach out to:
- National Suicide Prevention Lifeline: 1-800-273-8255
- Crisis Text Line: Text HOME to 741741

## Disclaimer

This chatbot is designed to provide support and information, not a replacement for professional medical advice. If you're experiencing a mental health crisis, please seek immediate help from a mental health professional or crisis helpline.
