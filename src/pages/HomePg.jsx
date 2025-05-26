import React, { useReducer } from "react";
import { useNavigate } from "react-router";

const initialState = {
  fullName: "",
  birth: "",
  city: "",
  income: "",
  motive: "",
  answers: {
    exp: "",
    pressure: "",
    relocate: "",
  },
  errors: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.question]: action.value },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

const questions = [
  { key: "exp", label: "هل سبق لك العمل في وظيفة مشابهة؟" },
  { key: "pressure", label: "هل تستطيع العمل تحت ضغط؟" },
  { key: "relocate", label: "هل توافق على الانتقال بين المدن؟" },
];

export default function ApplicationForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const calculateAge = (date) => {
    const ageDiff = Date.now() - new Date(date).getTime();
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const validate = () => {
    const err = {};
    const age = calculateAge(state.birth);

    if (state.fullName.trim().length < 4)
      err.fullName = "الاسم يجب أن لا يقل عن ٤ أحرف";
    if (!state.birth || age < 18 || age > 70) err.birth = "العمر غير مناسب";
    if (!state.city) err.city = "اختر المدينة";
    if (!state.income) err.income = "حدد الراتب المتوقع";
    if (!state.motive.trim()) err.motive = "اذكر سبب التقديم";
    if (Object.values(state.answers).some((v) => !v))
      err.answers = "أجب على جميع الأسئلة";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    dispatch({ type: "SET_ERRORS", errors });

    if (Object.keys(errors).length === 0) {
      navigate("/status", { state });
    }
  };

  return (
    <main className="bg-neutral-100 min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl w-full max-w-4xl px-8 py-10 space-y-6 border-l-4 border-green-400"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          📝 طلب تقديم وظيفة
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormInput
            label="الاسم الكامل"
            value={state.fullName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "fullName",
                value: e.target.value,
              })
            }
            error={state.errors.fullName}
          />
          <FormInput
            label="تاريخ الميلاد"
            type="date"
            value={state.birth}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "birth",
                value: e.target.value,
              })
            }
            error={state.errors.birth}
          />
          <FormSelect
            label="المدينة"
            options={["الرياض", "جدة", "مكة", "الخبر"]}
            value={state.city}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "city",
                value: e.target.value,
              })
            }
            error={state.errors.city}
          />
          <FormSelect
            label="الراتب المتوقع"
            options={["3000 - 8000", "9000 - 13000", "15000+"]}
            value={state.income}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "income",
                value: e.target.value,
              })
            }
            error={state.errors.income}
          />
        </div>

        <FormTextarea
          label="سبب التقديم"
          value={state.motive}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "motive",
              value: e.target.value,
            })
          }
          error={state.errors.motive}
        />

        <div className="space-y-4">
          <p className="font-semibold">الأسئلة العامة:</p>
          {questions.map(({ key, label }) => (
            <div key={key} className="bg-green-50 p-4 rounded-md">
              <p className="mb-2">{label}</p>
              <div className="flex gap-6">
                {["نعم", "لا"].map((val) => (
                  <label key={val} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={key}
                      value={val}
                      checked={state.answers[key] === val}
                      onChange={() =>
                        dispatch({
                          type: "UPDATE_ANSWER",
                          question: key,
                          value: val,
                        })
                      }
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {state.errors.answers && (
            <p className="text-red-500 text-sm">{state.errors.answers}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition duration-200"
        >
          إرسال الطلب
        </button>
      </form>
    </main>
  );
}

function FormInput({ label, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function FormSelect({ label, options, value, onChange, error }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400"
      >
        <option value="">-- اختر --</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function FormTextarea({ label, value, onChange, error }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border border-gray-300 rounded-md p-2 resize-none focus:ring-2 focus:ring-green-400"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
