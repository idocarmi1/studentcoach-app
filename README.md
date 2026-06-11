# StudentCoach

StudentCoach is a Hebrew RTL student productivity web app that helps students organize daily schedules, weekly planning, tasks, focus sessions, XP progress, and motivation in one calm interface.

The project is built as a polished frontend portfolio piece: it demonstrates product thinking, RTL interface design, responsive layouts, theme controls, phone preview mode, and interactive state-driven UI.

## Problem Statement

Students often manage academic deadlines, personal commitments, work tasks, and study sessions across several disconnected tools. This creates cognitive overload, makes priorities harder to see, and can reduce motivation.

StudentCoach addresses this by combining planning, focus, and encouragement into a single friendly dashboard designed to feel calm rather than stressful.

## Target Users

- University and college students
- High school students managing assignments and exams
- Students balancing school, work, and personal routines
- Hebrew-speaking users who need a native RTL productivity experience

## Main Features

- Home dashboard / לוח בקרה with daily flow and coach check-in
- AI Coach card / מאמן אישי with calm mock recommendations
- Weekly diary / יומן שבועי with academic, personal, and focus events
- Task manager / מנהל משימות with categories, statuses, and progress
- Analytics page / סטטיסטיקות with weekly metrics, progress bars, mini chart, and achievement summary
- Personal area / אזור אישי with habits, settings, and balance score
- Gamification center / מרכז הפוקוס with XP, badges, and focus tools
- About Project page / אודות הפרויקט for portfolio and case-study presentation
- Floating robot assistant that opens the focus center
- Pomodoro timer with start, pause, reset, and XP reward message
- Desktop view and phone preview mode
- Regular light mode and dark mode
- Full Hebrew RTL interface
- Reusable empty states, subtle micro-interactions, and a polished portfolio footer

## UI/UX Concept

StudentCoach is designed around reducing mental overload. The visual language uses soft cards, rounded surfaces, light blue tones, purple accents, clear hierarchy, and friendly micro-interactions.

The floating robot assistant acts as a playful entry point into focus mode, XP, achievements, and Pomodoro sessions. It keeps motivation visible without adding another full navigation item.

The latest UI pass turns the app into a more portfolio-ready product concept with clearer visual hierarchy, stronger navigation states, consistent cards, animated progress indicators, better dark-mode readability, and a more complete phone-preview experience.

## Portfolio Goals

StudentCoach is suitable for:

- University presentation
- Junior frontend portfolio
- Product / UX case study
- GitHub portfolio
- Vercel demo

## Tech Stack

- React
- Vite
- CSS variables
- Responsive CSS layouts
- Mock data for tasks, calendar events, XP, achievements, and profile content
- Component-based page structure
- Local React state management

## Design System

The app uses CSS tokens for:

- Typography sizes
- Spacing scale
- Light and dark theme colors
- Card, surface, border, primary, secondary, success, warning, text, and muted text colors
- Radius scale for small, medium, large, and pill shapes
- Card, elevated, and floating shadows

These tokens keep the dashboard, diary, tasks, analytics, profile, focus center, about page, phone preview, and dark mode visually consistent.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

On Windows PowerShell, if script execution is blocked, use:

```bash
npm.cmd run dev
npm.cmd run build
```

## Project Structure

```text
studentcoach-app/
├── docs/
│   ├── architecture.md
│   ├── ui-ux.md
│   └── use-case.md
├── src/
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Screenshots

Add screenshots here when presenting the project on GitHub:

- Dashboard / לוח בקרה: `docs/screenshots/dashboard.png`
- Analytics / סטטיסטיקות: `docs/screenshots/analytics.png`
- About Project / אודות הפרויקט: `docs/screenshots/about-project.png`
- Weekly diary / יומן שבועי: `docs/screenshots/weekly-diary.png`
- Task manager / מנהל משימות: `docs/screenshots/tasks.png`
- Focus center / מרכז הפוקוס: `docs/screenshots/focus-center.png`
- Phone preview mode: `docs/screenshots/phone-preview.png`
- Dark mode: `docs/screenshots/dark-mode.png`

## Vercel Demo

Add the deployed Vercel URL here:

```text
https://your-studentcoach-demo.vercel.app
```

## Future Improvements

- Google Calendar API integration
- User authentication
- Persistent task database
- Real notifications and reminders
- AI-powered personal coaching
- WhatsApp group and syllabus import workflows
- More advanced XP rules and achievement tracking

## Author

Ido Carmi
