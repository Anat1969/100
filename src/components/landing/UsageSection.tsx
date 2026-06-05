const steps = [
  {
    number: '1',
    title: 'הזן נתוני הפרויקט',
    detail:
      'שם הפרויקט, כתובת, מספר יחידות דיור, גוש וחלקה. הנתונים נשמרים אוטומטית.',
  },
  {
    number: '2',
    title: 'הזן ערכי פרמטרים',
    detail:
      'לכל אחד מ-10 הסעיפים — הזן את המדידה בפרויקט שלך. למשל: רוחב רצועת ההליכה הצרה ביותר.',
  },
  {
    number: '3',
    title: 'קבל חוות דעת בזמן אמת',
    detail:
      'המערכת מחשבת את הציות לכל פרמטר מיד עם הזנת הנתון ומציגה עובר / אזהרה / כשל.',
  },
  {
    number: '4',
    title: 'ייצא דוח PDF',
    detail:
      'לחץ על "ייצא דוח" לקבלת מסמך PDF מסכם לצירוף לבקשת היתר הבנייה.',
  },
]

const faqs = [
  {
    q: 'האם צריך להירשם?',
    a: 'לא. AgePlan פועל ישירות בדפדפן ללא הרשמה. הנתונים נשמרים באופן מקומי במכשיר שלך.',
  },
  {
    q: 'האם הנתונים נשמרים?',
    a: 'כן. כל הקלט נשמר אוטומטית ב-localStorage ונשאר זמין בין פגישות, גם לאחר סגירת הדפדפן.',
  },
  {
    q: 'האם הדוח מהווה מסמך רשמי?',
    a: 'הדוח מבוסס על ערכי התדריך הרשמי. הגשתו כחלק מהיתר הבנייה נתונה לשיקול הוועדה המקומית.',
  },
  {
    q: 'מה אם חלק מהנתונים חסרים?',
    a: 'פרמטרים ללא נתון יסומנו "ממתין" ולא ישפיעו על פרמטרים אחרים. ניתן להוסיף נתונים בכל עת.',
  },
]

export default function UsageSection() {
  return (
    <section id="usage" dir="rtl" className="w-full bg-white py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-2 text-sm text-gray-500 font-medium">יישום והשימוש</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          כיצד להשתמש ב-AgePlan?
        </h2>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
          תהליך פשוט בארבעה שלבים — מהזנת נתוני הפרויקט ועד ייצוא הדוח.
          לא נדרשת הכשרה מוקדמת.
        </p>

        <div className="space-y-5 mb-14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-5 items-start bg-gray-50 border border-gray-200 rounded-lg p-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D9E75] text-white text-xl font-bold flex items-center justify-center">
                {step.number}
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {step.title}
                </div>
                <p className="text-gray-600">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FAEEDA] border-2 border-[#BA7517] rounded-lg p-5 mb-12">
          <div className="text-lg font-bold text-[#BA7517] mb-2">
            שימו לב
          </div>
          <p className="text-gray-700">
            כל הנתונים נשמרים אוטומטית ב-localStorage תחת המפתח
            <span className="font-mono mx-1 bg-white px-1 rounded text-sm">ageplan_project_v1</span>
            — ניתן לערוך ולעדכן את כל שדה בכל עת, ללא צורך להתחיל מחדש.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-5">שאלות נפוצות</h3>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="border border-gray-200 rounded-lg p-5 bg-gray-50"
            >
              <div className="text-lg font-bold text-gray-800 mb-2">
                {faq.q}
              </div>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
