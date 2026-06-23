# ChristCounsel 🕊️

ChristCounsel is a premium full-stack spiritual guidance companion designed in custom modern styling. It integrates deep biblical wisdom, real-time audio devotions, active prayer scheduling, and live Christian media broadcasts directly with custom, comforting **Integrated AI Voice Assistance**.

---

## Key Features

1. **Integrated AI Voice Assistance**:
   * Simulates a soft, smooth, incredibly compassionate direct conversational experience (reflecting Jesus's caring spoken tone).
   * Fully limited to your specific shared concern or situation, always quoting appropriate Holy Scripture, explaining it with grace, and concluding with: *"Don't fear, I am with you."*
   2. **Sacred Live Streams & Media**:
   * Curated live feeds from globally prominent Christian broadcasters including Eucharistic Perpetual Adoration and Holy Mass links. It includes a custom modern video player optimized for YouTube integrations.
3. **Daily Scripture Promises**:
   * Categorized Bible databases covering peace, strength, anxiety, hope, and decision-making when the client-side/server-side neural systems have slow connection periods.
4. **Interactive Devotionals**:
   * Personal diary, notes logging, and customized scripture reminders with customizable local triggers.

---

## Directory Structure

```text
├── .github/workflows/          # Automated GitHub Actions
│   └── node-ci.yml             # Automatic build and lint integration validation
├── src/
│   ├── assets/                 # Generated divine oil paintings & sacred icon images
│   ├── components/             # React View interfaces (HomeScreen, CounselScreen, MediaFeedScreen)
│   ├── data.ts                 # Devotional models and pre-seeded database
│   ├── types.ts                # TypeScript contracts and structures
│   └── main.tsx                # Client-side mounting
├── server.ts                   # Express Backend handling secure proxy requests to Gemini API
├── Dockerfile                  # Container building instructions
├── .dockerignore               # Optimizes builds by preventing local asset bloat
├── package.json                # Project dependencies and script runner
└── vite.config.ts              # Vite configurations
```

---

## Local Development Setup

To run or work on this application locally, ensure you have **Node.js (v20+)** installed, then complete these steps:

1. **Clone the Repository**:
   ```bash
   git clone <your-github-repo-url>
   cd christ-counsel
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Secrets**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_google_gemini_api_key_here
   PORT=3000
   ```

4. **Boot the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000` to interact with the application.

---

## Deployment & Hosting

### 🐋 Container Deployment (Dockerfile)

A production-optimized, secure multi-stage `Dockerfile` is included in the root folder. You can build and deploy the container locally or directly to cloud platforms like GCP Cloud Run:

1. **Build Container Image**:
   ```bash
   docker build -t christ-counsel:latest .
   ```

2. **Run Container Locally**:
   ```bash
   docker run -p 3000:3000 --env GEMINI_API_KEY="your-gemini-key" christ-counsel:latest
   ```

### ⛵ GitHub Actions (CI/CD Workflow)

Your GitHub repository contains an automated continuous integration pipeline (`.github/workflows/node-ci.yml`). Every time you push a code change or open a pull request on the `main` or `master` branch:
1. It initializes an isolated environment.
2. It restores production dependencies.
3. It performs compile actions and checks for TS errors automatically.
