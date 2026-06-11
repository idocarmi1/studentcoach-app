export const user = {
  name: 'עידו',
  greeting: 'בוקר טוב',
  level: 'מאסטר פוקוס - רמה 5',
  xp: 1840,
  nextLevelXp: 2200,
  healthScore: 86
};

export const dailyFlow = [
  { time: '08:30', title: 'תרגול חדו"א', type: 'academic', note: '45 דקות לפני השיעור' },
  { time: '11:00', title: 'שיעור מבוא למדעי המחשב', type: 'academic', note: 'כיתה 204' },
  { time: '14:30', title: 'הפסקת צהריים רגועה', type: 'personal', note: 'לנשום, לא לרוץ' },
  { time: '17:00', title: 'פוקוס על עבודה להגשה', type: 'focus', note: 'סשן אחד מספיק להתחלה' }
];

export const weeklyEvents = [
  { day: 'ראשון', title: 'אלגברה', time: '09:00', type: 'academic' },
  { day: 'ראשון', title: 'הליכה קצרה', time: '18:00', type: 'personal' },
  { day: 'שני', title: 'פוקוס 25', time: '10:30', type: 'focus' },
  { day: 'שלישי', title: 'מעבדה', time: '12:00', type: 'academic' },
  { day: 'רביעי', title: 'מפגש חברים', time: '19:30', type: 'personal' },
  { day: 'חמישי', title: 'חזרה למבחן', time: '16:00', type: 'focus' }
];

export const tasks = [
  { id: 1, title: 'לסכם הרצאה 4', category: 'לימודים', status: 'בתהליך' },
  { id: 2, title: 'לשלוח קורות חיים', category: 'עבודה', status: 'פתוח' },
  { id: 3, title: 'לקבוע אימון', category: 'אישי', status: 'הושלם' },
  { id: 4, title: 'להגיש תרגיל עד 20:00', category: 'חשוב להיום', status: 'פתוח' },
  { id: 5, title: 'לעבור על סילבוס', category: 'לימודים', status: 'הושלם' }
];

export const taskCategories = [
  { name: 'לימודים', progress: 62 },
  { name: 'אישי', progress: 78 },
  { name: 'עבודה', progress: 44 },
  { name: 'חשוב להיום', progress: 35 }
];

export const achievements = [
  { icon: '★', title: '5 ימי רצף', text: 'הגעת לפוקוס יומי' },
  { icon: '✓', title: 'משימות נסגרו', text: '7 משימות השבוע' },
  { icon: '◐', title: 'איזון שבועי', text: 'שמרת על קצב בריא' },
  { icon: '25', title: 'פומודורו נקי', text: '25 דקות בלי הסחות' }
];

export const analytics = {
  metrics: [
    { label: 'משימות הושלמו השבוע', value: '14', helper: '4 יותר מהשבוע הקודם' },
    { label: 'סשני פוקוס', value: '6', helper: '150 דקות לימוד נקי' },
    { label: 'XP שנצבר', value: '420', helper: 'מתקרבים לרמה הבאה' },
    { label: 'עקביות שבועית', value: '82%', helper: 'קצב יציב ובריא' }
  ],
  weeklyProgress: [
    { day: 'א', value: 68 },
    { day: 'ב', value: 82 },
    { day: 'ג', value: 54 },
    { day: 'ד', value: 76 },
    { day: 'ה', value: 92 },
    { day: 'ו', value: 48 },
    { day: 'ש', value: 63 }
  ],
  focusBreakdown: [
    { label: 'לימודים', value: 74 },
    { label: 'פוקוס', value: 62 },
    { label: 'אישי', value: 58 }
  ],
  achievements: [
    { icon: '14', title: 'שבוע פרודוקטיבי', text: '14 משימות נסגרו בלי עומס' },
    { icon: '6', title: 'פוקוס יציב', text: '6 סשנים הושלמו השבוע' },
    { icon: '82%', title: 'עקביות גבוהה', text: 'עמדת ברוב היעדים שלך' }
  ]
};
