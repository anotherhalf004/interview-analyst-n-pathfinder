# Interview-Analyst-&-Pathfinder

Interview-Analyst is an AI-assisted interview preparation platform. It compares a candidate's experience with a target job description and turns that comparison into a practical preparation plan.

A user can create an account, provide a job description, upload a PDF resume or write a short self-description, and receive a personalized interview report containing:

- A job match score
- Technical interview questions with intent and suggested answer points
- Behavioral interview questions with intent and suggested answer points
- Identified skill gaps with severity levels
- A day-by-day preparation roadmap
- A tailored resume available as a generated PDF

The project is organized as two applications:

- `frontend/`: React 19 and Vite client application
- `backend/`: Express API with MongoDB persistence and Google GenAI integration

## Product Flow

1. Register a new account or sign in.
2. Paste the target job description.
3. Upload a PDF resume and optionally provide a self-description.
4. Generate an interview strategy with the AI service.
5. Review the report by technical questions, behavioral questions, or preparation roadmap.
6. Reopen previous reports from the home page.
7. Generate and download an ATS-oriented PDF resume tailored to the role.

## Technology Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Sass
- ESLint

### Backend

- Node.js with ECMAScript modules
- Express 5
- MongoDB with Mongoose
- Google GenAI SDK
- JWT authentication stored in an HTTP cookie
- Multer for in-memory PDF uploads
- `pdf-parse` for extracting resume text
- Puppeteer for PDF generation
- Zod for request and AI response validation
- Helmet, CORS, rate limiting, and DOMPurify for application security

## Prerequisites

Install the following before starting the project:

- Node.js 20 or newer
- npm
- A MongoDB database
- A Google GenAI API key
- A Chromium-compatible environment for Puppeteer PDF generation

The backend currently listens on port `3000`. The Vite development server normally listens on port `5173`.

## Getting Started

Clone the repository and install dependencies in both applications:

```bash
git clone https://github.com/anotherhalf004/interview-analyst-n-pathfinder
.git
cd interview-analyst-n-pathfinder


cd backend
npm install

cd ../frontend
npm install
```

### Configure the backend

Create `backend/.env` from the following template:

```env
MONGO_URI=mongodb://localhost:27017/interview-analyst-n-pathfinder

JWT_SECRET=replace-with-a-long-random-secret
GOOGLE_GENAI_API_KEY=replace-with-your-google-genai-key
NODE_ENV=development
```

Use a managed MongoDB connection string when running against MongoDB Atlas. Keep this file private. Never commit database credentials, JWT secrets, or API keys.

### Start the backend

From `backend/`:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

The backend development script uses `nodemon` through `npx`. If `nodemon` is not available locally or through the configured npm environment, install it as a development dependency or run the server directly:

```bash
node server.js
```

### Start the frontend

In a second terminal, from `frontend/`:

```bash
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The frontend API clients currently use `http://localhost:3000` as their base URL and send cookies with requests. The backend CORS configuration is also restricted to `http://localhost:5173` during local development.

## Available Scripts

### Frontend scripts

Run these commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Create a production build in `frontend/dist`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the frontend source. |

### Backend scripts

Run these commands from `backend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Express server with `nodemon`. |
| `node server.js` | Start the Express server without file watching. |

The backend currently does not include an automated test suite. Its `npm test` script is a placeholder and exits with an error by design.

## Frontend Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/login` | Public | Sign in to an existing account. |
| `/register` | Public | Create a new account. |
| `/` | Authenticated | Create a report and view recent reports. |
| `/interview/:interviewId` | Authenticated | View a complete interview report. |

## API Reference

All API routes are served from `http://localhost:3000`. Authenticated routes require the JWT cookie set during registration or login. Requests from the frontend must include credentials.

### Authentication

#### `POST /api/auth/register`

Create an account.

Request body:

```json
{
  "username": "jane-doe",
  "email": "jane@example.com",
  "password": "a-strong-password"
}
```

#### `POST /api/auth/login`

Authenticate an existing user.

Request body:

```json
{
  "email": "jane@example.com",
  "password": "a-strong-password"
}
```

#### `GET /api/auth/get-me`

Return the currently authenticated user's basic profile.

#### `GET /api/auth/logout`

Clear the authentication cookie and blacklist the current token.

### Interview Reports

#### `POST /api/interview`

Generate and store a new interview report. This endpoint requires authentication and accepts `multipart/form-data`.

Form fields:

- `jobDescription`: Required string between 10 and 10,000 characters.
- `selfDescription`: Optional string up to 5,000 characters.
- `resume`: Optional PDF file, maximum 5 MB.

The frontend describes the resume and self-description as alternative sources of candidate context, but the current backend generation controller expects an uploaded resume file when it extracts PDF text. In the current implementation, provide a PDF resume for reliable report generation. Resume uploads are held in memory while the text is extracted and are not stored as uploaded files; extracted resume text is stored with the report.

#### `GET /api/interview`

Return the authenticated user's reports, ordered from newest to oldest. Large source fields and detailed report sections are omitted from this list response.

#### `GET /api/interview/report/:interviewId`

Return one report belonging to the authenticated user.

#### `POST /api/interview/resume/pdf/:interviewReportId`

Generate a tailored resume PDF from a stored report and return it as a downloadable file.

### Example report shape

A generated report contains the following primary fields:

```json
{
  "title": "Frontend Engineer",
  "matchScore": 82,
  "technicalQuestions": [
    {
      "question": "...",
      "intention": "...",
      "answer": "..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "...",
      "intention": "...",
      "answer": "..."
    }
  ],
  "skillGaps": [
    {
      "skill": "System design",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Core concepts",
      "tasks": ["..."]
    }
  ]
}
```

## Project Structure

```text
.
├── backend/
│   ├── server.js                 # Backend entry point
│   └── src/
│       ├── app.js                # Express app and middleware
│       ├── config/               # Database configuration
│       ├── controllers/          # Request handlers
│       ├── middleware/           # Auth, validation, upload, and error handling
│       ├── models/               # Mongoose models
│       ├── routes/               # HTTP route definitions
│       └── servcies/             # AI and PDF generation services
├── frontend/
│   └── src/
│       ├── features/auth/        # Registration, login, and protected routes
│       ├── features/interview/   # Report creation and report views
│       ├── App.jsx               # Application providers and router
│       └── app.routes.jsx        # Client-side routes
└── README.md
```


## Troubleshooting

### The frontend cannot reach the API

Confirm that the backend is running on port `3000`, the frontend is running on port `5173`, and that the browser is allowed to send credentials. The current API clients use a hardcoded local backend URL.

### MongoDB connection fails

Check `MONGO_URI`, network access rules, database credentials, and whether the MongoDB server is running. The backend loads environment variables when `server.js` starts.

### Report generation fails

Confirm that `GOOGLE_GENAI_API_KEY` is valid, the request includes a job description, and any uploaded file is a PDF smaller than 5 MB. AI generation is rate-limited and can also fail because of provider availability or quota limits.

### PDF resume generation fails

Puppeteer must be able to launch its browser in the current environment. On restricted servers, configure the required Chromium dependencies and launch options for that hosting environment.

## License

This project is distributed under the terms in MIT License.

## // note //

--readme generated by AI
-- all code was hand-written and sometimes also using assisted autocomplete (living in times i have to literally type this!)