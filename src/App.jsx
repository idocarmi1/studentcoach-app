import React, { useEffect, useState } from 'react';
import { achievements, dailyFlow, taskCategories, tasks, user, weeklyEvents } from './data/mockData.js';

const navItems = [
  { id: 'home', label: 'לוח בקרה' },
  { id: 'diary', label: 'יומן' },
  { id: 'tasks', label: 'משימות' },
  { id: 'profile', label: 'אזור אישי' }
];

const typeLabels = {
  academic: 'לימודים',
  personal: 'אישי',
  focus: 'פוקוס'
};

function App() {
  const [activePage, setActivePage] = useState('home');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [theme, setTheme] = useState('light');

  const pages = {
    home: <HomePage goTo={setActivePage} />,
    diary: <DiaryPage />,
    tasks: <TasksPage />,
    profile: <ProfilePage />,
    focus: <GamificationPage />
  };

  return (
    <div className={`studentcoach-root preview-${previewMode} theme-${theme}`} dir="rtl">
      <ControlBar
        previewMode={previewMode}
        theme={theme}
        onTogglePreview={() => setPreviewMode((mode) => (mode === 'desktop' ? 'mobile' : 'desktop'))}
        onToggleTheme={() => setTheme((mode) => (mode === 'light' ? 'dark' : 'light'))}
      />
      <div className="app-viewport">
        <AppShell activePage={activePage} onNavigate={setActivePage}>
          {pages[activePage]}
        </AppShell>
      </div>
    </div>
  );
}

function ControlBar({ previewMode, theme, onTogglePreview, onToggleTheme }) {
  return (
    <div className="control-bar" aria-label="פקדי תצוגה">
      <button onClick={onTogglePreview}>
        {previewMode === 'desktop' ? 'תצוגת טלפון' : 'תצוגת מחשב'}
      </button>
      <button onClick={onToggleTheme}>
        {theme === 'light' ? 'מצב כהה' : 'מצב רגיל'}
      </button>
    </div>
  );
}

function AppShell({ activePage, onNavigate, children }) {
  return (
    <div className="app-shell" dir="rtl">
      <Navigation activePage={activePage} onNavigate={onNavigate} />
      <main className="page-frame" key={activePage}>
        {children}
      </main>
      <FloatingRobot onClick={() => onNavigate('focus')} />
    </div>
  );
}

function Navigation({ activePage, onNavigate }) {
  return (
    <nav className="navigation" aria-label="ניווט ראשי">
      <div className="brand">
        <div className="brand-mark">SC</div>
        <div>
          <strong>StudentCoach</strong>
          <span>מאמן לימודים אישי</span>
        </div>
      </div>
      <div className="nav-list">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activePage === item.id ? 'active' : ''}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function FloatingRobot({ onClick }) {
  return (
    <button className="floating-robot" onClick={onClick} aria-label="פתיחת מרכז הפוקוס">
      <RobotFace compact />
      <span>פוקוס</span>
    </button>
  );
}

function HomePage({ goTo }) {
  return (
    <section className="page">
      <PageHeader eyebrow="לוח בקרה" title={`${user.greeting}, ${user.name}`} text="יום מסודר מתחיל בצעד קטן וברור." />
      <div className="dashboard-grid">
        <article className="card coach-card">
          <span className="pill">צ'ק אין מאמן</span>
          <h2>איך האנרגיה שלך היום?</h2>
          <p>בחר משימה אחת חשובה, ואז תן לעצמך חלון פוקוס קצר. לא צריך לנצח את כל היום בבת אחת.</p>
          <button className="primary-btn" onClick={() => goTo('focus')}>להתחיל פוקוס</button>
        </article>
        <article className="card sync-card">
          <h3>סנכרון Google Calendar</h3>
          <p>חבר אירועים אישיים ואקדמיים לתמונה אחת רגועה.</p>
          <button className="secondary-btn">סנכרון יומן</button>
        </article>
      </div>
      <QuickActions />
      <DailyFlow />
      <UpcomingSchedule />
    </section>
  );
}

function QuickActions() {
  return (
    <div className="quick-actions">
      {['סנכרון יומן', 'קבוצות וואטסאפ', 'סילבוס', 'משימה חדשה'].map((action) => (
        <button key={action}>{action}</button>
      ))}
    </div>
  );
}

function DailyFlow() {
  return (
    <section className="card">
      <SectionTitle title="הזרימה היומית" text="לימודים, חיים ופוקוס במקום אחד." />
      <div className="flow-list">
        {dailyFlow.map((item) => (
          <div className={`flow-item ${item.type}`} key={`${item.time}-${item.title}`}>
            <time>{item.time}</time>
            <div>
              <strong>{item.title}</strong>
              <span>{item.note}</span>
            </div>
            <small>{typeLabels[item.type]}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function UpcomingSchedule() {
  return (
    <section className="bottom-section">
      <SectionTitle title="מה קרוב?" text="הדברים הבאים בתור, בלי רעש מיותר." />
      <div className="mini-cards">
        {dailyFlow.slice(1, 4).map((item) => (
          <article className="mini-card" key={item.title}>
            <span>{item.time}</span>
            <strong>{item.title}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function DiaryPage() {
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  return (
    <section className="page">
      <PageHeader eyebrow="יומן שבועי" title="שבוע שמרגיש אפשרי" text="צבעים עדינים עוזרים לראות איפה להשקיע ומתי לנוח." />
      <div className="legend">
        <span className="academic">לימודים</span>
        <span className="personal">אישי</span>
        <span className="focus">פוקוס</span>
      </div>
      <div className="week-grid">
        {days.map((day) => (
          <article className="day-card" key={day}>
            <h3>{day}</h3>
            {weeklyEvents.filter((event) => event.day === day).map((event) => (
              <div className={`event ${event.type}`} key={`${event.day}-${event.title}`}>
                <time>{event.time}</time>
                <strong>{event.title}</strong>
              </div>
            ))}
            {!weeklyEvents.some((event) => event.day === day) && <p className="empty-day">מרווח נשימה</p>}
          </article>
        ))}
      </div>
      <section className="card balance-card">
        <SectionTitle title="איזון שבועי" text="כרגע השבוע שלך נוטה לפוקוס בריא עם מספיק זמן אישי." />
        <div className="balance-bars">
          <Progress label="לימודים" value={68} />
          <Progress label="אישי" value={52} />
          <Progress label="פוקוס" value={74} />
        </div>
      </section>
    </section>
  );
}

function TasksPage() {
  return (
    <section className="page">
      <PageHeader eyebrow="מנהל משימות" title="משימות בלי עומס" text="מחלקים לפי אזורים, סוגרים בקצב שלך." />
      <button className="primary-btn add-task">+ משימה חדשה</button>
      <div className="category-grid">
        {taskCategories.map((category) => (
          <article className="card category-card" key={category.name}>
            <Progress label={category.name} value={category.progress} />
          </article>
        ))}
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-card" key={task.id}>
            <div>
              <span>{task.category}</span>
              <strong>{task.title}</strong>
            </div>
            <small className={`status ${task.status.replace(' ', '-')}`}>{task.status}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="page">
      <PageHeader eyebrow="אזור אישי" title="הקצב שלך חשוב" text="התראות עדינות והרגלים קטנים שומרים על שבוע יציב." />
      <div className="profile-grid">
        <article className="card score-card">
          <span>בריאות איזון שבועית</span>
          <strong>{user.healthScore}</strong>
          <p>מצוין. יש מקום לעוד מנוחה קטנה בין משימות ארוכות.</p>
        </article>
        <article className="card settings-card">
          <SectionTitle title="הגדרות מאמן" text="תזכורות חכמות בלי להציף." />
          <Toggle label="התראות מאמן פעילות" checked />
          <Toggle label="נגיעות עדינות כל 30 דקות" checked />
          <Toggle label="סיכום שבועי ביום חמישי" />
        </article>
        <article className="card habits-card">
          <SectionTitle title="הרגלים קבועים" text="שלושה עוגנים קטנים ליום רגוע." />
          {['מים ליד השולחן', 'סשן פוקוס אחד', 'סגירת משימה לפני ערב'].map((habit) => (
            <div className="habit" key={habit}>✓ {habit}</div>
          ))}
        </article>
        <article className="card account-card">
          <SectionTitle title="חשבון" text="פרופיל, סנכרונים והעדפות תצוגה." />
          <button className="secondary-btn">עריכת הגדרות</button>
        </article>
      </div>
    </section>
  );
}

function GamificationPage() {
  return (
    <section className="page focus-page">
      <PageHeader eyebrow="מרכז הפוקוס" title="בונים מומנטום קטן" text="פוקוס, XP והישגים במקום אחד." />
      <div className="focus-hero card">
        <RobotFace />
        <div>
          <h2>{user.level}</h2>
          <XPProgress current={user.xp} target={user.nextLevelXp} />
          <p className="xp-total">{user.xp.toLocaleString('he-IL')} נקודות XP</p>
        </div>
      </div>
      <div className="focus-grid">
        <PomodoroTimer />
        <section className="card achievements-card">
          <SectionTitle title="הישגים" text="סימנים קטנים לזה שאתה מתקדם." />
          <div className="badges">
            {achievements.map((badge) => (
              <article className="badge" key={badge.title}>
                <span>{badge.icon}</span>
                <strong>{badge.title}</strong>
                <small>{badge.text}</small>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [reward, setReward] = useState(false);

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  useEffect(() => {
    if (!running) return undefined;
    if (secondsLeft === 0) {
      completeSession();
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, secondsLeft]);

  function completeSession() {
    setSecondsLeft(25 * 60);
    setRunning(false);
    setReward(true);
  }

  return (
    <section className={`card timer-card ${running ? 'running' : ''}`}>
      <SectionTitle title="פומודורו 25 דקות" text="מתחילים קטן, נשארים בעניינים." />
      <div className="timer-display">{minutes}:{seconds}</div>
      <div className="timer-actions">
        <button className="primary-btn" onClick={() => { setRunning(true); setReward(false); }}>התחלה</button>
        <button className="secondary-btn" onClick={() => setRunning(false)}>השהיה</button>
        <button className="ghost-btn" onClick={() => { setSecondsLeft(25 * 60); setRunning(false); setReward(false); }}>איפוס</button>
      </div>
      <button className="complete-btn" onClick={completeSession}>סיימתי סשן</button>
      {reward && <p className="reward">כל הכבוד! קיבלת 25 נקודות XP</p>}
    </section>
  );
}

function XPProgress({ current, target }) {
  const percentage = Math.round((current / target) * 100);
  return (
    <div className="xp-progress">
      <div className="progress-meta">
        <span>התקדמות לרמה הבאה</span>
        <strong>{percentage}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill xp-fill" style={{ '--value': `${percentage}%` }} />
      </div>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div className="progress">
      <div className="progress-meta">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ '--value': `${value}%` }} />
      </div>
    </div>
  );
}

function Toggle({ label, checked = false }) {
  return (
    <label className="toggle">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={checked} />
      <i />
    </label>
  );
}

function PageHeader({ eyebrow, title, text }) {
  return (
    <header className="page-header">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </header>
  );
}

function SectionTitle({ title, text }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function RobotFace({ compact = false }) {
  return (
    <div className={`robot ${compact ? 'compact' : ''}`} aria-hidden="true">
      <div className="robot-antenna" />
      <div className="robot-head">
        <div className="robot-eye" />
        <div className="robot-eye" />
        <div className="robot-smile" />
      </div>
      {!compact && <div className="robot-body"><span /><span /><span /></div>}
    </div>
  );
}

export default App;
