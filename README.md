 News Aggregator API

A simple Node.js + Express application that allows users to:

Sign up & log in (JWT authentication)

Manage personal news preferences (movies, comics, etc.)

Fetch personalized news based on saved preferences

Built with Express, Tap (for testing), and Supertest.

Features

User Authentication – Sign up & log in with JWT

Preferences – Save and update categories of interest

News Aggregation – Fetches top headlines from NewsAPI

Protected Routes – Only accessible with a valid token

Installation
1. Clone the repository
git clone https://github.com/your-username/news-aggregator-api.git
cd news-aggregator-api

2. Install dependencies
npm install

3. Set up environment variables

Create a .env file in the root with:

PORT=3000
JWT_SECRET=your-secret-key
NEWS_API_KEY=your-newsapi-key

4. Run the server
npm start


Server runs on: http://localhost:3000

5. Run tests
npm test

API Documentation
 Authentication
POST /users/signup

Create a new user.

Request Body:

{
  "name": "Clark Kent",
  "email": "clark@superman.com",
  "password": "Krypt()n8",
  "preferences": ["movies", "comics"]
}


Response:

{
  "message": "User registered successfully"
}

POST /users/login

Log in with email & password.

Request Body:

{
  "email": "clark@superman.com",
  "password": "Krypt()n8"
}


Response:

{
  "token": "your-jwt-token"
}

Preferences
GET /users/preferences

Get user preferences.
Headers: Authorization: Bearer <token>

Response:

{
  "preferences": ["movies", "comics"]
}

PUT /users/preferences

Update user preferences.
Headers: Authorization: Bearer <token>

Request Body:

{
  "preferences": ["movies", "comics", "games"]
}


Response:

{
  "preferences": ["movies", "comics", "games"]
}


GET /news

Fetch personalized news.
Headers: Authorization: Bearer <token>

Response:

{
  "news": [
    {
      "source": { "id": null, "name": "BBC News" },
      "author": "BBC",
      "title": "Breaking news headline",
      "url": "https://bbc.com/...",
      "publishedAt": "2025-08-28T12:34:56Z"
    }
  ]
}

Testing

We use Tap + Supertest. Example command:

npm test