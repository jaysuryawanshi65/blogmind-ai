# ✨ BlogMind.ai — AI-Powered Blogging Platform

<p align="center">
  <strong>Write Smarter. Share Stories. Inspire Minds.</strong>
</p>

<p align="center">
  A full-stack blogging platform where creators can publish stories,
  discover ideas, engage with readers, and generate blog drafts using AI.
</p>

---

## 📌 About the Project

**BlogMind.ai** is a full-stack blogging platform designed to make
content creation and sharing easier.

Users can create accounts, publish blog posts, explore stories,
like articles, and interact with other writers through comments.

The platform also includes an **AI-powered Blog Writer** that uses
the Google Gemini API to generate blog drafts from a topic and
selected writing tone.

The goal is to combine a modern blogging experience with AI-assisted
content creation in one application.

---

## ✨ Features

### 👤 Authentication

- User registration
- User login
- Authentication-protected features
- Current-user authentication endpoint

### 📝 Blog Management

- Create and publish blog posts
- Add blog titles and content
- Organize posts by category
- View published stories
- Open individual blog detail pages

### 🔍 Discover & Search

- Discover published blog posts
- Search stories by keywords
- Filter posts by category
- Explore content created by other writers

### ❤️ Reader Engagement

- Like blog posts
- Add comments to articles
- Read blog content and discussions

### 🤖 AI Blog Writer

- Generate blog drafts from a topic
- Choose a writing tone
- Generate structured Markdown content
- Get a title, introduction, headings, examples,
  takeaways, and conclusion
- Automatic retries for selected temporary Gemini API errors

### 🎨 User Interface

- Clean, modern blogging interface
- Dedicated AI Writer page
- Responsive layouts
- Simple navigation between application sections

---

## 🛠️ Tech Stack

### Frontend

- React.js
- TypeScript
- Vite
- CSS

### Backend

- Node.js
- Express.js
- TypeScript
- REST API

### Database

- MongoDB

### Artificial Intelligence

- Google Gemini API
- `@google/genai`

### Development Tools

- Git
- GitHub
- npm
- Visual Studio Code
- Chrome DevTools

> Note: The stack above describes the technologies used or identified
> in the project. Check the package files before documenting any
> additional libraries or versions.

---

## 🏗️ Application Architecture

BlogMind.ai follows a client-server architecture.

```text
                 ┌─────────────────────────┐
                 │        User             │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ React + TypeScript      │
                 │ Frontend                │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Express REST API         │
                 │ Node.js + TypeScript    │
                 └──────┬───────────┬──────┘
                        │           │
                        ▼           ▼
              ┌──────────────┐ ┌──────────────┐
              │   MongoDB    │ │ Gemini API   │
              │ Blog Data    │ │ AI Writer    │
              └──────────────┘ └──────────────┘

📂 Project Structure

The project is organized into frontend and backend applications.

blogmind-ai/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── ai.ts
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md

The structure above is representative. Refer to the actual project
folders for the complete directory tree.

⚙️ Getting Started

Follow these steps to run BlogMind.ai locally.

1. Prerequisites

Install the following:

Node.js
npm
MongoDB or a MongoDB connection string
Git
Google Gemini API key
2. Clone the Repository
git clone https://github.com/YOUR_USERNAME/blogmind-ai.git

Navigate into the project:

cd blogmind-ai

Replace YOUR_USERNAME with your GitHub username.

3. Install Frontend Dependencies
cd client
npm install
4. Install Backend Dependencies

Open another terminal at the project root and run:

cd server
npm install
5. Configure Environment Variables

Create a .env file inside the server directory.

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_available_gemini_model

Add the database connection variable required by the application.

For example, if the backend expects MONGODB_URI, configure it as:

MONGODB_URI=your_mongodb_connection_string

Important: Use the exact database environment variable name
expected by your backend configuration.

If the application requires other environment variables, configure
them according to the server code.

Getting a Gemini API Key

Create or manage your API key through
Google AI Studio.

Choose a model that is currently available to your API key and set
its identifier in GEMINI_MODEL.

Never commit API keys, passwords, or .env files to GitHub.

6. Start the Backend

From the server directory, run the development script defined
in its package.json.

A common command is:

npm run dev
7. Start the Frontend

Open another terminal:

cd client
npm run dev

Vite will display the local frontend address in the terminal.

Open that address in your browser.

For this project, the frontend has been running locally at:

http://localhost:5173
🤖 How the AI Writer Works

The AI Writer helps users create a first draft from a topic.

Workflow
Open the AI Writer page.
Enter a topic.
Select a writing tone.
Click Generate.
The frontend sends the request to the backend.
The backend validates the topic and checks its configuration.
The backend sends a prompt to the Gemini API.
Gemini generates a structured Markdown draft.
The backend returns the generated text to the frontend.
Example Input

Topic:

How to Become a Full Stack Developer in 2026

Tone:

Warm and insightful
Expected Output

The generated draft can contain:

An engaging title
An introduction
Structured headings
Practical examples
Actionable takeaways
A conclusion
Error Handling

The backend also handles common API failures, including:

Temporary service unavailability
Rate limits and quota errors
Authentication failures
Unavailable models
Empty AI responses

Selected temporary errors can trigger automatic retries.

AI generation depends on the selected model's availability,
API quota, and Google Gemini service status.

🔐 Security Notes
Keep API keys in environment variables.
Never commit .env files.
Do not expose API secrets in frontend code.
Keep authentication-protected operations on the backend.
Review environment variables before every Git commit.
Use appropriate authentication and authorization checks
for protected operations.
🧪 Testing the Application

After starting the application, verify the following workflows:

 Register a new account.
 Log in with valid credentials.
 Open the Discover page.
 Search for published stories.
 Filter posts by category.
 Open a blog detail page.
 Create and publish a blog post.
 Like a post.
 Add a comment.
 Open the AI Writer.
 Generate a draft using a topic and writing tone.
 Verify that API errors are displayed appropriately.
🚧 Future Enhancements

Potential improvements for future releases include:

Rich-text or Markdown editing for generated drafts
Save and manage unpublished drafts
Edit and delete published posts
AI draft regeneration
Copy generated content to the clipboard
User profile pages
Author dashboards
Pagination and improved search
Image uploads for blog posts
Reading-time estimates
SEO-friendly metadata
Automated frontend and backend tests
Deployment with production environment configuration

These are planned improvements, not necessarily features available
in the current version.

🎯 Learning Outcomes

Building BlogMind.ai provides practical experience with:

Full-stack application development
React and TypeScript
REST API development using Express
Frontend-backend integration
Authentication-protected routes
Database integration
Third-party AI API integration
Environment variable management
API error handling and retry logic
Git and GitHub workflows
👨‍💻 Author

Jay Suryavanshi

Full-Stack Developer | React.js | TypeScript | Node.js | AI Integration

GitHub: @jaysuryawanshi65
```
