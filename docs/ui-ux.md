# StudentCoach UI/UX

## Hebrew RTL Design

StudentCoach is designed as a native Hebrew RTL application. Layout direction, navigation, content flow, labels, and screen hierarchy are all built around right-to-left reading behavior.

This is important because productivity tools often feel less natural when Hebrew users are forced into left-to-right interface patterns.

## Calm Visual Theme

The regular theme uses a light blue background with soft purple accents. This palette supports the product goal: helping students feel organized, focused, and less overwhelmed.

The interface avoids aggressive colors, dense panels, and heavy visual noise. Cards, spacing, and soft shadows create a sense of calm structure.

## Dark Mode Accessibility

Dark mode uses deep navy and slate surfaces rather than pure black. Text is near-white, while secondary text uses readable soft blue-gray tones.

The dark palette is designed to keep page titles, card text, navigation labels, small labels, buttons, progress bars, badges, and Pomodoro content readable.

## Phone Preview vs Desktop View

StudentCoach includes two display modes:

- Desktop view: the full browser layout with desktop navigation
- Phone preview: the same app inside a centered phone-like frame

Phone preview is a presentation feature. It helps demonstrate how the app feels on a mobile device without creating a separate app or route.

The phone preview keeps content scrollable inside the device frame, preserves bottom navigation visibility, and supports dark mode so the portfolio demo can show both desktop and mobile behavior from the same codebase.

## Floating Robot UX Idea

The floating robot assistant is visible across the app and opens the focus center. It gives the product a friendly identity and makes the gamification area feel discoverable.

The robot is intentionally separate from the main navigation. This keeps the core navigation simple while making focus mode feel special.

## Reducing Cognitive Load

The app reduces cognitive load by separating information into clear areas:

- Daily flow for today's schedule
- Weekly diary for broader planning
- Task manager for categorized work
- Analytics for weekly progress, XP, focus sessions, and consistency
- Personal area for habits and settings
- Focus center for Pomodoro, XP, and motivation
- About Project for portfolio storytelling and product context

Each screen keeps copy short and uses visual grouping to reduce scanning effort.

## AI Coach Card

The dashboard includes a mock AI Coach card that gives calm recommendations without connecting to a real AI service. It helps the product feel smarter while keeping the prototype safe, local, and easy to present.

The recommendations focus on useful next steps:

- Upcoming exam awareness
- Suggested focus sessions
- Weekly consistency
- Open academic tasks

The card also supports a small question flow. Students can ask about exams, pressure, time, schedule, or another topic, and the app returns a useful mock answer. This keeps the experience interactive without external AI APIs or API keys.

## Analytics UX

The Analytics page turns progress into a quick scan:

- Metric cards summarize completed tasks, focus sessions, XP, and consistency
- Progress bars show goal balance
- A compact chart shows weekly progress
- Achievement cards reinforce momentum

The page uses mock data but is structured like a real product analytics surface.

Phone preview analytics rules keep the page readable inside the phone frame: metric cards stack cleanly, large numbers scale down, chart bars fit the available width, and achievement cards avoid horizontal overflow.

## Modal Interactions

StudentCoach uses reusable RTL modal panels for practical mock workflows:

- Calendar URL sync with Google Calendar export guidance
- WhatsApp group link storage and validation
- Manual task creation

The modals use the same tokens as the rest of the app, so light mode, dark mode, and phone preview stay visually consistent.

## Cards, Spacing, Colors, and Hierarchy

The UI uses rounded cards, generous spacing, and consistent typography hierarchy. Important actions use stronger gradients, while secondary actions remain softer.

Color coding helps students quickly identify event types:

- Academic: blue
- Personal: green
- Focus: purple

## Calm, Not Stressful

Student productivity tools can easily become stressful when they overemphasize deadlines and unfinished work. StudentCoach is designed to feel supportive instead.

The coach copy, soft visuals, and XP rewards encourage progress without guilt.

## Accessibility and Readability

Readability considerations include:

- Full RTL layout
- High-contrast dark mode
- Clear active navigation states
- Large Pomodoro timer typography
- Distinct task statuses
- Readable small labels and progress metadata
- Responsive layouts for mobile and desktop presentation
- Keyboard focus states for controls
- Reusable empty states for tasks, diary gaps, analytics, and achievements
- Subtle hover and page-transition feedback
