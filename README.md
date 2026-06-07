# Wahdat Portfolio – Full Stack

A modern portfolio website for **Rahmatullah Wahdat**, built with Django (backend) and React (frontend).

## Project Structure

```
portfolio/
├── backend/          # Django REST API
│   ├── portfolio_api/    # Main app (models, views, serializers)
│   ├── settings.py
│   ├── urls.py
│   ├── requirements.txt
│   └── manage.py
└── frontend/         # React + Vite
    ├── src/
    │   ├── components/   # Sidebar
    │   ├── pages/        # All pages + Admin
    │   ├── hooks/        # useAuth, useCrud
    │   ├── utils/        # axios api client
    │   └── styles/       # global CSS design system
    ├── package.json
    └── vite.config.js
```

## Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env          # edit values
python manage.py makemigrations portfolio_api
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data    # populates CV data
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env          # set VITE_API_URL
npm run dev
```

Open http://localhost:3000

## API Endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/skills/ | No | List all skills |
| POST | /api/skills/ | Yes | Create skill |
| PUT/PATCH | /api/skills/{id}/ | Yes | Update skill |
| DELETE | /api/skills/{id}/ | Yes | Delete skill |
| GET | /api/projects/ | No | List projects |
| GET | /api/education/ | No | List education |
| GET | /api/certifications/ | No | List certifications |
| GET | /api/resume/ | No | Active resume |
| POST | /api/resume/ | Yes | Upload resume |
| POST | /api/auth/login/ | No | Get auth token |
| POST | /api/auth/logout/ | Yes | Invalidate token |

## Deployment

- **Backend → Render**: Set `Start Command` to `gunicorn wsgi:application`, use `build.sh`
- **Frontend → Vercel**: Set `VITE_API_URL` to your Render backend URL

## GitHub

https://github.com/rahmat530
