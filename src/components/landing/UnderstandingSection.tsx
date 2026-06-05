const statuses = [
  {
    label: 'עובר',
    bg: '#E1F5EE',
    border: '#1D9E75',
    text: '#1D9E75',
    description: 'הפרמטר עומד בדרישת התדריך. לא נדרשת פעולה.',
    example: 'רצועת הליכה: 180 ס"מ (דרישה: 150 ס"מ)',
  },
  {
    label: 'אזהרה',
    bg: '#FAEEDA',
    border: '#BA7517',
    text: '#BA7517',
    description: 'חריגה של עד 20% מהדרישה. ניתן לתיקון לפני הגשת הבקשה.',
    example: 'שיפוע: 5.8% (דרישה: עד 5%)',
  },
  {
    label: 'כשל',
    bg: '#FCEBEB',
    border: '#A32D2D',
    text: '#A32D2D',
    description: 'חריגה מהותית. הפרמטר חוסם קבלת היתר בנייה — חובה לתקן.',
    example: 'מרחק ספסלים: 90 מ\' (דרישה: עד 50 מ\')',
  },
  {
    label: 'ממתין',
    bg: '#F3F4F6',
    border: '#9CA3AF',
    text: '#6B7280',
    description: 'לא הוזנו נתונים עדיין. הפרמטר ממתין לקלט מהמשתמש.',
    example: 'טרם הוזן ערך לפרמטר זה',
  },
]

const calculations = [
  {
    title: 'הצללה',
    detail:
      'חישוב אחוז שטח הרחוב המוצל בשעות 08:00–12:00 לפי אוריינטציה, גובה מבנים ועצים. יעד: 80% כיסוי.',
  },
  {
    title: 'שיפוע',
    detail:
      'חישוב שיפוע ממוצע ומרבי לאורך מסלולי ההליכה. שיפוע מעל 5% מהווה מכשול לבני הגיל השלישי.',
  },
  {
    title: 'מרחקי שירות',
    detail:
      'מדידת המרחק מכל נקודה במסלול לספסל הקרוב ביותר ולחדר הנוחיות הקרוב ביותר.',
  },
]

export default function UnderstandingSection() {
  return (
    <section
      id="understanding"
      dir="rtl"
      className="w-full bg-gray-50 py-14 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-2 text-sm text-gray-500 font-medium">הבנה</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          איך המערכת עובדת?
        </h2>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
          לכל פרמטר שהוזן, המערכת מחשבת אוטומטית את מצב הציות ומציגה
          סטטוס ברור. בסוף התהליך מיוצר דוח PDF מסכם לצירוף להיתר בנייה.
        </p>

        <h3 className="text-xl font-bold text-gray-800 mb-5">
          ארבעת סטטוסי הציות
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {statuses.map((status) => (
            <div
              key={status.label}
              className="rounded-lg p-5 border-2"
              style={{
                backgroundColor: status.bg,
                borderColor: status.border,
              }}
            >
              <div
                className="text-xl font-bold mb-2"
                style={{ color: status.text }}
              >
                {status.label}
              </div>
              <p className="text-gray-700 mb-3">{status.description}</p>
              <div
                className="text-sm font-medium px-3 py-2 rounded bg-white bg-opacity-60"
                style={{ color: status.text }}
              >
                דוגמה: {status.example}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-5">
          סוגי חישובים
        </h3>
        <div className="space-y-4 mb-10">
          {calculations.map((calc) => (
            <div
              key={calc.title}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="text-lg font-bold text-[#1D9E75] mb-2">
                {calc.title}
              </div>
              <p className="text-gray-600">{calc.detail}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#E1F5EE] border-2 border-[#1D9E75] rounded-lg p-6">
          <div className="text-lg font-bold text-[#1D9E75] mb-2">
            דוח הציות
          </div>
          <p className="text-gray-700">
            בסיום הזנת הנתונים, המערכת מפיקה דוח PDF רשמי הכולל את כל
            הפרמטרים, ערכי הסף, הערכים שהוזנו וסטטוס הציות לכל סעיף.
            הדוח מיועד לצירוף לבקשת היתר בנייה בוועדה המקומית לתכנון ובנייה.
          </p>
        </div>
      </div>
    </section>
  )
}
