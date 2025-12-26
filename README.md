# Sentiment Analysis App

Overview
This repository contains a full-stack Sentiment Analysis application for analyzing YouTube comments and generating high-level insights. It includes a Django REST backend (API + ML integration) and a React frontend (UI + Redux).

Contents
- **backend/**: Django project and app code. Key module: `base` contains models, prediction logic, serializers, views, and services that call the Gemini API.
- **frontend/**: React application (Create React App style) with routing and Redux state management.

Quick summary
- The backend ingests YouTube comments (via scraping utilities in `base.comment`), runs a language-aware sentiment classifier (XLM-R / torchtext) in `base.predict`, stores results in models defined in `base.models`, and exposes endpoints in `base.views`.
- The backend also calls Google Generative AI (Gemini) via `base.services.generate_insight` to create textual insights from comments.

Requirements
See [requirements.txt](requirements.txt) for the Python dependencies required by the backend. The frontend dependencies live in `frontend/package.json` and are managed with npm/yarn.

Environment variables and secrets
- `GEMINI_API_KEY`: required for `base.services` to call Gemini. Do NOT commit this key into source control.
- `DJANGO_SECRET_KEY`: a Django secret key. Replace the one currently in `backend/backend/settings.py` with an environment variable in production.

Important deployment / runtime notes
- The sentiment model and some NLP components are large and require a suitable environment:
	- `torch`/`torchtext` and model weights (loaded in `base.predict`) may require GPU or substantial CPU memory.
	- `VnCoreNLP` is used for Vietnamese tokenization and expects a JVM + the VnCoreNLP JAR. Place the JAR where `base.predict` can access it, or set an environment variable and update `base/predict.py`.
- `base/predict.py` currently uses absolute Windows paths (e.g., C:\\YoutubeCommentAnalysis\\). Consider updating it to use an environment variable `YTA_BASE_DIR` or relative paths before deploying.

Local setup (backend)
1. Create and activate a Python virtual environment (recommended):

```bash
pip install virtualenv
virtualenv <myenv>
myenv\Scripts\activate
pip install django
django-admin startproject <backend>
.
# Windows (PowerShell)
.venv\\Scripts\\Activate.ps1
# Windows (cmd)
.venv\\Scripts\\activate.bat
# macOS / Linux
source .venv/bin/activate
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Set required environment variables (example, PowerShell syntax):

```powershell
$env:GEMINI_API_KEY = "your_gemini_key"
$env:DJANGO_SECRET_KEY = "replace_this"
```

4. Place model weights and VnCoreNLP jar where `base/predict.py` expects them, or update `base/predict.py` to use a configurable path. The settings in the file reference `C:\\YoutubeCommentAnalysis\\` – change before running.

5. Run migrations and start the backend:

```bash
python backend/manage.py migrate
python backend/manage.py runserver
```

Local setup (frontend)
1. Change into the frontend folder and install node dependencies:

```bash
cd frontend
npm install
npm start
```

API / usage
- The React app talks to the Django API endpoints protected by JWT (SimpleJWT). Use the login screen to obtain tokens and call protected endpoints. Important backend endpoints live in `base.views` — see `chat_views.py`, `chat_insight.py`, and `user_views.py`.

Developer notes and recommended improvements
- Move secret keys to environment variables or a `.env` and load via `python-dotenv`.
- Avoid loading heavy ML models on module import in `base/predict.py`. Instead, lazy-load models on first prediction or on server startup managed by a management command.
- Replace absolute paths in `base/predict.py` with a configurable base directory (e.g., `YTA_BASE_DIR` environment variable) and add checks for model/asset existence.
- Consider extracting the Gemini wrapper logic (currently in `base/services.py`) behind a small retry/backoff wrapper and error handling.

Troubleshooting
- If model loading fails: verify `DEMO_MODEL_PATH` exists and that `torch` matches the device (CPU vs GPU). Check `DEVICE` logic in `base/predict.py`.
- If Vietnamese tokenization fails: ensure the JVM is installed and `VnCoreNLP` jar path is correct.
- If Gemini calls fail: confirm `GEMINI_API_KEY` is valid and network access is available.

Files changed
- Updated root README: [README.md](README.md)
- Added Python dependencies: [requirements.txt](requirements.txt)

License / attribution
This repository contains third-party models and tools; follow their licenses (torch, torchtext, VnCoreNLP, and Google AI usage rules).

2025 — Sentiment Analysis App