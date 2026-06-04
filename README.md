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
- Weekly diary / יומן שבועי with academic, personal, and focus events
- Task manager / מנהל משימות with categories, statuses, and progress
- Personal area / אזור אישי with habits, settings, and balance score
- Gamification center / מרכז הפוקוס with XP, badges, and focus tools
- Floating robot assistant that opens the focus center
- Pomodoro timer with start, pause, reset, and XP reward message
- Desktop view and phone preview mode
- Regular light mode and dark mode
- Full Hebrew RTL interface

## UI/UX Concept

StudentCoach is designed around reducing mental overload. The visual language uses soft cards, rounded surfaces, light blue tones, purple accents, clear hierarchy, and friendly micro-interactions.

The floating robot assistant acts as a playful entry point into focus mode, XP, achievements, and Pomodoro sessions. It keeps motivation visible without adding another full navigation item.

## Tech Stack

- React
- Vite
- CSS variables
- Responsive CSS layouts
- Mock data for tasks, calendar events, XP, achievements, and profile content

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
- Weekly diary / יומן שבועי: `docs/screenshots/weekly-diary.png`
- Task manager / מנהל משימות: `docs/screenshots/tasks.png`
- Focus center / מרכז הפוקוס: `docs/screenshots/focus-center.png`
- Phone preview mode: `docs/screenshots/phone-preview.png`
- Dark mode: `docs/screenshots/dark-mode.png`

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
