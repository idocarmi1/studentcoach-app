# StudentCoach Architecture

## Overview

StudentCoach is a React + Vite frontend application. It currently runs entirely on the client and uses mock data for product demonstration.

The architecture is intentionally lightweight, making it easy to understand, run locally, and present as a portfolio project.

## Frontend Stack

- React for component-based UI
- Vite for development and production builds
- CSS variables for themes and design tokens
- Plain CSS for responsive layouts and animations
- Mock data stored in JavaScript modules

## Main Components

The main UI is implemented in `src/App.jsx`.

Key components:

- `App`: top-level state and page selection
- `AppShell`: shared app layout
- `Navigation`: desktop and mobile-friendly navigation
- `FloatingRobot`: focus center entry point
- `HomePage`: dashboard / לוח בקרה
- `AICoachCard`: mock personal coach recommendations on the dashboard
- `DiaryPage`: weekly diary / יומן שבועי
- `TasksPage`: task manager / מנהל משימות
- `AnalyticsPage`: weekly metrics, mini chart, progress summary, and achievement recap
- `ProfilePage`: personal area / אזור אישי
- `AboutProjectPage`: portfolio case-study page
- `GamificationPage`: focus center / מרכז הפוקוס
- `PomodoroTimer`: focus timer and XP reward interaction
- `XPProgress`: level progress visualization
- `EmptyState`: reusable friendly empty-state component
- `PortfolioFooter`: minimal footer shown across pages

## State Management

The app uses local React state with `useState` and `useEffect`.

Current state includes:

- `activePage`: controls which page is displayed
- `previewMode`: switches between desktop view and phone preview
- `theme`: switches between regular light mode and dark mode
- Pomodoro timer state inside `PomodoroTimer`

This is enough for the current single-user frontend demo. A larger production version could introduce a global store or server-backed state.

The current page-state approach still renders only one page at a time, including the Analytics and About Project pages.

## Mock Data

Mock data is stored in `src/data/mockData.js`.

It includes:

- User profile data
- Daily schedule items
- Weekly events
- Task categories and tasks
- XP and achievement data
- Analytics metrics, weekly progress, focus breakdown, and achievement summary

Mock data keeps the app runnable without a backend while still presenting realistic product behavior.

## Page Routing Approach

The project does not use a routing library. Instead, it uses a simple page-state approach:

```jsx
const [activePage, setActivePage] = useState('home');
```

The page map renders only the selected page:

```jsx
{pages[activePage]}
```

This keeps the app simple and avoids route complexity for a portfolio demo.

## Theme Toggle Logic

The theme toggle is controlled by top-level state:

```jsx
const [theme, setTheme] = useState('light');
```

The selected theme is applied as a class on the top-level wrapper:

```jsx
theme-light
theme-dark
```

CSS variables in `src/styles.css` define the actual colors, shadows, surfaces, and readability behavior for each theme.

The design-token layer covers typography, spacing, color roles, radius values, shadows, light theme, and dark theme. This keeps dashboard cards, navigation, analytics, empty states, dark mode, and phone preview aligned.

## Display Mode Toggle Logic

The display mode toggle is also controlled by top-level state:

```jsx
const [previewMode, setPreviewMode] = useState('desktop');
```

The selected mode applies a class:

```jsx
preview-desktop
preview-mobile
```

Desktop mode shows the app normally. Phone preview mode wraps the same app inside a centered phone-like frame, with internal scrolling for the active page.

The phone preview reflows the six primary navigation items into a compact bottom navigation while keeping the floating robot above the navigation area.

## Component Structure

The current project structure:

```text
src/
├── data/
│   └── mockData.js
├── App.jsx
├── main.jsx
└── styles.css
```

For a larger application, components could be split into folders such as:

```text
src/
├── components/
├── pages/
├── data/
├── hooks/
└── styles/
```

## Future Backend Options

StudentCoach can grow into a full production product with:

- Google Calendar API for real schedule sync
- Authentication for personal accounts
- A real task database
- Notifications and reminders
- AI personal coach for planning and nudges
- Syllabus parsing and assignment extraction
- WhatsApp group integration for student workflows

## Deployment

As a Vite frontend, the app can be deployed to platforms such as:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

The production build is generated with:

```bash
npm run build
```
