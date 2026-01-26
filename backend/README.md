# ANE Backend Service

This is the backend service for the ANE application, built with Node.js and Express.

## 🚀 Getting Started

Follow these instructions to get the backend server up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 📥 Installation

1. Navigate to the backend directory:
   
   cd backend
   

2. Install dependencies:
   
   npm install
   
### ⚙️ Configuration

Create a `.env` file in the `backend` root directory if it doesn't exist. You can copy the structure from below:

```env
PORT=5000
NODE_ENV=development
```

- **PORT**: The port where the server will run (default: 5000).
- **NODE_ENV**: Environment mode (`development` or `production`).

### 🏃‍♂️ Running the Server

**Development Mode (Recommended)**
Runs with `nodemon` for hot-reloading (server restarts automatically on file changes).
```bash
npm run dev
```

**Production Mode**
Runs the server with standard node command.
```bash
npm start
```

Once running, the API will be accessible at: `http://localhost:5000`

### 🧪 Testing the API

You can test if the server is working correctly by visiting:
[http://localhost:5000/api/test](http://localhost:5000/api/test)

Response should be:
```json
{
  "message": "Backend is connected and working!"
}
```

## 📂 Project Structure

```
backend/
├── config/         # Database and app configuration
├── controllers/    # Logic for handling API requests
├── models/         # Database models/schemas
├── routes/         # API route definitions
├── server.js       # Application entry point
├── package.json    # Project dependencies and scripts
└── .env            # Environment variables (do not commit)
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Utilities**: 
  - `cors` (Cross-Origin Resource Sharing)
  - `dotenv` (Environment variables)
  - `nodemon` (Development tool)
