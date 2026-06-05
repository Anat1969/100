import parameters from '../../data/parameters.json'

export default function KnowledgeSection() {
  return (
    <section id="knowledge" dir="rtl" className="w-full bg-white py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-2 text-sm text-gray-500 font-medium">ידע</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          מה זה AgePlan?
        </h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          AgePlan מסייע לאדריכלים ומתכננים עירוניים לוודא שפרויקטים עומדים
          בדרישות תדריך משרד הבינוי והשיכון לתכנון סביבת מגורים לעת זקנה (2024).
          התדריך קובע ערכי סף כמותיים לנגישות, הצללה, ישיבה ושירותים — ועמידה
          בהם נדרשת לצורך קבלת היתר בנייה.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <div className="text-lg font-bold text-gray-800 mb-2">המקור הרשמי</div>
            <p className="text-gray-600">
              תדריך תכנון סביבת מגורים לעת זקנה — משרד הבינוי והשיכון, 2024.
              המסמך הרשמי שמחייב את כל פרויקטי הדיור לאוכלוסיה המבוגרת בישראל.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <div className="text-lg font-bold text-gray-800 mb-2">המשתמשים</div>
            <p className="text-gray-600">
              אדריכלים ומתכננים עירוניים הנדרשים להגיש דוח ציות עם בקשת
              היתר בנייה. AgePlan מייצר את הדוח הזה אוטומטית.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <div className="text-lg font-bold text-gray-800 mb-2">מה נבדק</div>
            <p className="text-gray-600">
              10 פרמטרים כמותיים: רצועות הליכה, שיפועים, מרחקי ספסלים,
              חדרי נוחיות, הצללה ומסלולי הליכה.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          הפרמטרים הנבדקים (10 סעיפים)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-right">
            <thead>
              <tr className="bg-[#1D9E75] text-white">
                <th className="p-3 text-right font-bold">פרמטר</th>
                <th className="p-3 text-right font-bold">ערך סף</th>
                <th className="p-3 text-right font-bold">מקור בתדריך</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, index) => (
                <tr
                  key={param.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="p-3 border-b border-gray-200 font-medium text-gray-800">
                    {param.name}
                  </td>
                  <td className="p-3 border-b border-gray-200 text-[#1D9E75] font-bold">
                    {param.threshold}
                  </td>
                  <td className="p-3 border-b border-gray-200 text-gray-500">
                    {param.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
