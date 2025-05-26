import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function ConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  const { fullName, birth, city, income, motive, answers } = state;

  return (
    <main className="min-h-screen bg-gradient-to-tr from-white to-emerald-100 flex items-center justify-center p-6">
      <section className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 space-y-8 border-t-4 border-emerald-400">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            🎉 تم استلام طلبك
          </h1>
          <p className="text-gray-600">
            شكرًا لك على التقديم، سيتم مراجعة معلوماتك قريبًا
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 text-gray-800">
          <InfoCard label="👤 الاسم الكامل" value={fullName} />
          <InfoCard label="🎂 تاريخ الميلاد" value={birth} />
          <InfoCard label="🏙️ المدينة" value={city} />
          <InfoCard label="💰 الراتب المتوقع" value={income} />
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
          <h3 className="font-semibold text-emerald-800 mb-2">
            📌 سبب اهتمامك بالوظيفة:
          </h3>
          <p className="text-gray-700 leading-relaxed">{motive}</p>
        </div>

        <div className="bg-sky-50 border border-sky-200 p-5 rounded-xl">
          <h3 className="font-semibold text-sky-800 mb-3">🧠 إجاباتك:</h3>
          <ul className="space-y-2 list-inside list-disc text-gray-700">
            <li>هل لديك خبرة؟: {answers.exp}</li>
            <li>العمل تحت الضغط: {answers.pressure}</li>
            <li>الانتقال بين المدن: {answers.relocate}</li>
          </ul>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 font-semibold text-lg transition"
          >
            الرجوع للرئيسية
          </button>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
