import React, { useEffect, useState } from 'react';
import { achievements, analytics, dailyFlow, taskCategories, tasks as mockTasks, user, weeklyEvents } from './data/mockData.js';

const USER_TASKS_STORAGE_KEY = 'studentcoach-user-tasks';

const navItems = [
  { id: 'home', label: 'לוח בקרה' },
  { id: 'diary', label: 'יומן' },
  { id: 'tasks', label: 'משימות' },
  { id: 'analytics', label: 'סטטיסטיקות' },
  { id: 'profile', label: 'אזור אישי' },
  { id: 'about', label: 'אודות' }
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
  const [activeModal, setActiveModal] = useState(null);
  const [userTasks, setUserTasks] = useState(() => readStoredUserTasks());
  const [toast, setToast] = useState('');

  const allTasks = [...mockTasks, ...userTasks];

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function openModal(name) {
    setActiveModal(name);
  }

  function closeModal() {
    setActiveModal(null);
  }

  function addTask(task) {
    const newTask = {
      id: createTaskId(),
      title: task.title.trim(),
      category: task.category,
      status: task.status
    };

    setUserTasks((currentTasks) => {
      const nextTasks = [...currentTasks, newTask];
      window.localStorage.setItem(USER_TASKS_STORAGE_KEY, JSON.stringify(nextTasks));
      return nextTasks;
    });

    closeModal();
    setActivePage('tasks');
    setToast('המשימה נוספה בהצלחה');
  }

  const pages = {
    home: <HomePage goTo={setActivePage} openModal={openModal} />,
    diary: <DiaryPage />,
    tasks: <TasksPage taskList={allTasks} openModal={openModal} />,
    analytics: <AnalyticsPage />,
    profile: <ProfilePage />,
    about: <AboutProjectPage />,
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
      <InteractionModal activeModal={activeModal} onClose={closeModal} onAddTask={addTask} />
      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <button onClick={() => setActivePage('tasks')}>מעבר למשימות</button>
        </div>
      )}
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
        <PortfolioFooter />
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

function HomePage({ goTo, openModal }) {
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
          <button className="secondary-btn" onClick={() => openModal('calendar')}>סנכרון יומן</button>
        </article>
      </div>
      <AICoachCard />
      <QuickActions openModal={openModal} />
      <DailyFlow />
      <UpcomingSchedule />
    </section>
  );
}

function AICoachCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const recommendations = [
    'יש לך מבחן בעוד 4 ימים',
    'מומלץ להשלים 2 סשני פוקוס היום',
    'השבוע אתה עומד ב-82% מהיעדים שלך',
    'נשארו 3 משימות אקדמיות פתוחות'
  ];

  function askCoach(event) {
    event.preventDefault();
    const normalizedQuestion = question.trim();

    if (!normalizedQuestion) return;

    if (/מבחן|בחינה/.test(normalizedQuestion)) {
      setAnswer('מומלץ לפרק את ההכנה לבלוקים של 25 דקות ולסמן 2 נושאים חשובים להיום.');
    } else if (/עומס|לחץ/.test(normalizedQuestion)) {
      setAnswer('נראה שיש עומס. כדאי לבחור משימה אחת קריטית ולהעביר משימות פחות חשובות למחר.');
    } else if (/זמן|לו״ז|לוז|יומן/.test(normalizedQuestion)) {
      setAnswer('כדאי לבדוק את היומן השבועי ולסגור חלונות פוקוס קצרים בין התחייבויות.');
    } else {
      setAnswer('אני ממליץ להתחיל ממשימה אחת קטנה, להפעיל פומודורו, ואז לבדוק מחדש את ההתקדמות.');
    }
  }

  return (
    <section className="card ai-coach-card" aria-labelledby="ai-coach-title">
      <div className="ai-coach-icon" aria-hidden="true">AI</div>
      <div>
        <SectionTitle title="מאמן אישי" text="המלצות רגועות שמתרגמות את השבוע לצעד הבא." id="ai-coach-title" />
        <div className="coach-recommendations">
          {recommendations.map((item) => (
            <div className="recommendation" key={item}>
              <span aria-hidden="true">•</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <form className="coach-chat" onSubmit={askCoach}>
          <label htmlFor="coach-question">שאל את המאמן</label>
          <div className="inline-form-row">
            <input
              id="coach-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="שאל את המאמן שאלה..."
            />
            <button className="primary-btn" type="submit">שאל</button>
          </div>
          {answer && (
            <div className="coach-answer" role="status">
              <strong>תשובת המאמן</strong>
              <p>{answer}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function QuickActions({ openModal }) {
  const actions = [
    { label: 'סנכרון יומן', onClick: () => openModal('calendar') },
    { label: 'קבוצות וואטסאפ', onClick: () => openModal('whatsapp') },
    {
      label: 'פתיחת ידיעון הקריה האקדמית אונו',
      onClick: () => window.open('https://yedion.ono.ac.il/yedion/fireflyweb.aspx', '_blank', 'noopener,noreferrer')
    },
    { label: 'משימה חדשה', onClick: () => openModal('task') }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action) => (
        <button key={action.label} onClick={action.onClick}>{action.label}</button>
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
            {!weeklyEvents.some((event) => event.day === day) && (
              <EmptyState title="מרווח נשימה" text="אין אירועים מתוכננים ליום הזה." compact />
            )}
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

function TasksPage({ taskList, openModal }) {
  const hasTasks = taskList.length > 0;

  return (
    <section className="page">
      <PageHeader eyebrow="מנהל משימות" title="משימות בלי עומס" text="מחלקים לפי אזורים, סוגרים בקצב שלך." />
      <button className="primary-btn add-task" onClick={() => openModal('task')}>+ משימה חדשה</button>
      <div className="category-grid">
        {taskCategories.map((category) => (
          <article className="card category-card" key={category.name}>
            <Progress label={category.name} value={category.progress} />
          </article>
        ))}
      </div>
      <div className="task-list">
        {hasTasks ? (
          taskList.map((task) => (
            <article className="task-card" key={task.id}>
              <div>
                <span>{task.category}</span>
                <strong>{task.title}</strong>
              </div>
              <small className={`status ${task.status.replace(' ', '-')}`}>{task.status}</small>
            </article>
          ))
        ) : (
          <EmptyState
            title="אין משימות פתוחות"
            text="זה זמן מצוין לתכנן את היעד הבא שלך."
            action="צור משימה חדשה"
          />
        )}
      </div>
    </section>
  );
}

function InteractionModal({ activeModal, onClose, onAddTask }) {
  if (!activeModal) return null;

  const modalTitles = {
    calendar: 'סנכרון יומן',
    whatsapp: 'קבוצות וואטסאפ',
    task: 'הוספת משימה חדשה'
  };

  return (
    <Modal title={modalTitles[activeModal]} onClose={onClose}>
      {activeModal === 'calendar' && <CalendarSyncPanel />}
      {activeModal === 'whatsapp' && <WhatsAppPanel />}
      {activeModal === 'task' && <NewTaskForm onAddTask={onAddTask} onClose={onClose} />}
    </Modal>
  );
}

function Modal({ title, children, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" role="presentation">
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" dir="rtl">
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="סגירת חלון">×</button>
        </header>
        {children}
      </section>
    </div>
  );
}

function CalendarSyncPanel() {
  const [calendarUrl, setCalendarUrl] = useState(() => window.localStorage.getItem('studentcoach.calendarUrl') || '');
  const [message, setMessage] = useState('');

  function saveCalendarUrl(event) {
    event.preventDefault();
    window.localStorage.setItem('studentcoach.calendarUrl', calendarUrl.trim());
    setMessage('הקישור נשמר בהצלחה');
  }

  return (
    <div className="modal-content">
      <article className="modal-option">
        <h3>פתח Google Calendar</h3>
        <p>כדי לחבר יומן Google אמיתי, ניתן לפתוח את Google Calendar ולהעתיק קישור iCal/URL ציבורי אם קיים.</p>
        <button
          className="secondary-btn"
          onClick={() => window.open('https://calendar.google.com/calendar/u/0/r/settings/export', '_blank', 'noopener,noreferrer')}
        >
          פתח Google Calendar
        </button>
      </article>
      <form className="modal-option" onSubmit={saveCalendarUrl}>
        <h3>סנכרון באמצעות URL</h3>
        <input
          value={calendarUrl}
          onChange={(event) => {
            setCalendarUrl(event.target.value);
            setMessage('');
          }}
          placeholder="הדבק כאן קישור iCal / Calendar URL"
        />
        <button className="primary-btn" type="submit">שמור קישור</button>
        {message && <p className="form-message success" role="status">{message}</p>}
      </form>
    </div>
  );
}

function WhatsAppPanel() {
  const [whatsAppUrl, setWhatsAppUrl] = useState(() => window.localStorage.getItem('studentcoach.whatsappUrl') || '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const hasValidSavedLink = isValidWhatsAppLink(whatsAppUrl);

  function saveWhatsAppUrl(event) {
    event.preventDefault();
    const trimmedUrl = whatsAppUrl.trim();

    if (!isValidWhatsAppLink(trimmedUrl)) {
      setError('נא להזין קישור WhatsApp תקין');
      setMessage('');
      return;
    }

    window.localStorage.setItem('studentcoach.whatsappUrl', trimmedUrl);
    setWhatsAppUrl(trimmedUrl);
    setError('');
    setMessage('הקישור נשמר בהצלחה');
  }

  return (
    <form className="modal-content" onSubmit={saveWhatsAppUrl}>
      <div className="modal-option">
        <label htmlFor="whatsapp-link">קישור לקבוצת WhatsApp</label>
        <input
          id="whatsapp-link"
          value={whatsAppUrl}
          onChange={(event) => {
            setWhatsAppUrl(event.target.value);
            setError('');
            setMessage('');
          }}
          placeholder="הדבק קישור לקבוצת WhatsApp"
        />
        <button className="primary-btn" type="submit">שמור קישור</button>
        {error && <p className="form-message error" role="alert">{error}</p>}
        {message && <p className="form-message success" role="status">{message}</p>}
      </div>
      {hasValidSavedLink && (
        <button
          className="secondary-btn"
          type="button"
          onClick={() => window.open(whatsAppUrl, '_blank', 'noopener,noreferrer')}
        >
          פתח קבוצת וואטסאפ
        </button>
      )}
    </form>
  );
}

function NewTaskForm({ onAddTask, onClose }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('לימודים');
  const [status, setStatus] = useState('פתוח');
  const [error, setError] = useState('');

  function submitTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError('נא להזין כותרת משימה');
      return;
    }

    onAddTask({
      title: title.trim(),
      category,
      status
    });
  }

  return (
    <form className="modal-form" onSubmit={submitTask}>
      <label>
        <span>כותרת משימה</span>
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError('');
          }}
          placeholder="לדוגמה: לסיים עבודה להגשה"
        />
      </label>
      <label>
        <span>קטגוריה</span>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>לימודים</option>
          <option>אישי</option>
          <option>עבודה</option>
          <option>חשוב להיום</option>
        </select>
      </label>
      <label>
        <span>סטטוס</span>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>פתוח</option>
          <option>בתהליך</option>
          <option>הושלם</option>
        </select>
      </label>
      {error && <p className="form-message error" role="alert">{error}</p>}
      <div className="modal-actions">
        <button className="primary-btn" type="submit">הוסף משימה</button>
        <button className="ghost-btn" type="button" onClick={onClose}>ביטול</button>
      </div>
    </form>
  );
}

function AnalyticsPage() {
  const hasAchievements = analytics.achievements.length > 0;

  return (
    <section className="page analytics-page">
      <PageHeader eyebrow="סטטיסטיקות" title="התקדמות שאפשר להבין מהר" text="מבט שבועי על משימות, פוקוס, XP ועקביות." />
      <div className="metric-grid">
        {analytics.metrics.map((metric) => (
          <article className="card metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.helper}</p>
          </article>
        ))}
      </div>
      <div className="analytics-grid">
        <section className="card chart-card">
          <SectionTitle title="התקדמות שבועית" text="שיאים קטנים לאורך השבוע." />
          <div className="mini-chart" aria-label="גרף התקדמות שבועית">
            {analytics.weeklyProgress.map((item) => (
              <div className="chart-bar" key={item.day}>
                <span style={{ '--value': `${item.value}%` }} />
                <small>{item.day}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="card progress-summary-card">
          <SectionTitle title="סיכום יעדים" text="החלוקה בין לימודים, פוקוס וזמן אישי." />
          <div className="balance-bars">
            {analytics.focusBreakdown.map((item) => (
              <Progress key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </section>
      </div>
      <section className="card achievements-card">
        <SectionTitle title="סיכום הישגים" text="מה כבר עבד טוב השבוע." />
        {hasAchievements ? (
          <div className="badges">
            {analytics.achievements.map((badge) => (
              <article className="badge" key={badge.title}>
                <span>{badge.icon}</span>
                <strong>{badge.title}</strong>
                <small>{badge.text}</small>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="אין הישגים עדיין" text="השלם סשן פוקוס ראשון כדי לפתוח הישג." compact />
        )}
      </section>
    </section>
  );
}

function AboutProjectPage() {
  const sections = [
    {
      title: 'Problem',
      text: 'סטודנטים מנהלים עומס אקדמי, אחריות אישית, עבודה וזמן פוקוס בכמה כלים מפוזרים. הפיזור הזה מקשה להבין מה חשוב עכשיו ומעודד דחיינות.'
    },
    {
      title: 'Solution',
      text: 'StudentCoach מרכז יומן, משימות, פומודורו, XP והמלצות מאמן אישי בחוויית RTL עברית אחת, כדי להפוך שבוע עמוס לרצף פעולות ברור.'
    },
    {
      title: 'Target Users',
      text: 'סטודנטים באוניברסיטה או מכללה, תלמידים עם עומס הגשות, ומשתמשים דוברי עברית שרוצים כלי תכנון רגוע ונגיש.'
    },
    {
      title: 'UX Decisions',
      text: 'המערכת משתמשת בהיררכיה חזותית ברורה, כרטיסים עקביים, תצוגת טלפון להצגה, מצב כהה קריא ורובוט צף שמוביל למרכז הפוקוס בלי להעמיס על הניווט.'
    },
    {
      title: 'Technology',
      text: 'React, Vite, נתוני mock, ארכיטקטורת רכיבים, ניהול state מקומי, CSS variables, Hebrew RTL, dark mode ו-phone preview.'
    },
    {
      title: 'Future Roadmap',
      text: 'חיבור עתידי ל-Google Calendar API, אימות משתמשים, שמירת נתונים אמיתית ומאמן AI אמיתי שייצר המלצות מותאמות אישית.'
    }
  ];

  return (
    <section className="page about-page">
      <PageHeader eyebrow="אודות הפרויקט" title="StudentCoach UI/UX Case Study" text="קונספט מוצרי שמראה איך כלי סטודנטיאלי יכול להיות שימושי, רגוע וראוי לפרזנטציה." />
      <div className="about-hero card">
        <div>
          <span className="pill">Portfolio Project 2026</span>
          <h2>עוזרים לסטודנטים להפוך עומס למסלול פעולה.</h2>
          <p>הפרויקט מדגים חשיבה מוצרית, עיצוב RTL, רכיבי React, מצב כהה, תצוגת מובייל ומערכת עיצוב עקבית על בסיס נתוני mock.</p>
        </div>
        <div className="case-study-stats" aria-label="נקודות עיקריות בפרויקט">
          <strong>RTL</strong>
          <strong>React</strong>
          <strong>Vite</strong>
        </div>
      </div>
      <div className="about-grid">
        {sections.map((section) => (
          <article className="card about-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
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
  const hasAchievements = achievements.length > 0;

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
          {hasAchievements ? (
            <div className="badges">
              {achievements.map((badge) => (
                <article className="badge" key={badge.title}>
                  <span>{badge.icon}</span>
                  <strong>{badge.title}</strong>
                  <small>{badge.text}</small>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="אין הישגים עדיין" text="סיים סשן פוקוס כדי לקבל את ההישג הראשון." compact />
          )}
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

function SectionTitle({ title, text, id }) {
  return (
    <div className="section-title">
      <h2 id={id}>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function EmptyState({ title, text, action, compact = false }) {
  return (
    <div className={`empty-state ${compact ? 'compact' : ''}`}>
      <span aria-hidden="true">◎</span>
      <strong>{title}</strong>
      <p>{text}</p>
      {action && <button className="secondary-btn">{action}</button>}
    </div>
  );
}

function PortfolioFooter() {
  return (
    <footer className="portfolio-footer">
      <span>Built by Ido Carmi</span>
      <span>React + Vite</span>
      <span>Portfolio Project 2026</span>
      <span>StudentCoach UI/UX Case Study</span>
    </footer>
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

function readStoredJson(key, fallbackValue) {
  if (typeof window === 'undefined') return fallbackValue;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function readStoredUserTasks() {
  const storedTasks = readStoredJson(USER_TASKS_STORAGE_KEY, []);

  if (!Array.isArray(storedTasks)) return [];

  return storedTasks
    .filter((task) => task && typeof task === 'object' && typeof task.title === 'string' && task.title.trim())
    .map((task, index) => ({
      id: task.id || `stored-${index}-${Date.now()}`,
      title: task.title.trim(),
      category: task.category || 'לימודים',
      status: task.status || 'פתוח'
    }));
}

function createTaskId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `manual-${crypto.randomUUID()}`;
  }

  return `manual-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isValidWhatsAppLink(value) {
  return value.startsWith('https://chat.whatsapp.com/') || value.startsWith('https://wa.me/');
}

export default App;
