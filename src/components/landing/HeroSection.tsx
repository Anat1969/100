export default function HeroSection() {
  return (
    <section
      dir="rtl"
      className="w-full bg-white border-b-4 border-[#1D9E75] py-16 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-4xl font-bold text-[#1D9E75]">AgePlan</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          כלי ציות תכנוני לסביבת מגורים לעת זקנה
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          בדיקת ציות אוטומטית לתדריך תכנון סביבת מגורים לעת זקנה —
          משרד הבינוי והשיכון, 2024.
          המערכת בודקת פרמטרים כמותיים מול ערכי סף מוגדרים ומפיקה
          דוח ציות לצירוף להיתר בנייה.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            className="bg-[#1D9E75] text-white text-lg font-bold px-8 py-3 rounded-lg hover:bg-[#17866300] hover:bg-[#158f68] transition-colors"
            onClick={() => alert('האפליקציה בפיתוח — בקרוב!')}
          >
            כניסה לאפליקציה
          </button>
          <a
            href="#knowledge"
            className="border-2 border-[#1D9E75] text-[#1D9E75] text-lg font-bold px-8 py-3 rounded-lg hover:bg-[#E1F5EE] transition-colors"
          >
            למד עוד
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          מיועד לאדריכלים ומתכננים עירוניים — ללא צורך בהרשמה
        </p>
      </div>
    </section>
  )
}
