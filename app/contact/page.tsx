// app/contact/page.tsx
"use client";

import { useState } from "react";
import { MapPinAreaIcon } from "@phosphor-icons/react";
// ✅ Supabase 클라이언트 임포트 (이미 프로젝트에 있다고 가정)
import { supabase } from "@/lib/supabaseClient";

type FormState = {
  inquiry: string;
  title: string;
  content: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  agree: boolean;
};

const initialState: FormState = {
  inquiry: "",
  title: "",
  content: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  agree: false,
};

const inquiryOptions = ["SNS", "Digital Campaign", "BTL", "협력사 관련 문의"];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // ✅ 에러 메시지

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const toggleAgree = () =>
    setForm((prev) => ({ ...prev, agree: !prev.agree }));

  const isRequiredEmpty = (field: keyof FormState) => {
    const requiredFields: (keyof FormState)[] = [
      "inquiry",
      "title",
      "content",
      "name",
      "company",
      "email",
    ];
    if (!requiredFields.includes(field)) return false;
    return submitted && !form[field];
  };

  const canSubmit =
    form.inquiry &&
    form.title &&
    form.content &&
    form.name &&
    form.company &&
    form.email &&
    form.agree &&
    !loading;

  // ✅ Supabase 연동된 제출 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorMsg(null);

    if (!canSubmit) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("contacts").insert({
        inquiry: form.inquiry,
        title: form.title,
        content: form.content,
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone || null,
        agree: form.agree,
        // created_at은 DB default now() 쓰면 안 넣어도 됨
      });

      if (error) {
        console.error("SUPABASE INSERT ERROR:", error);
        setErrorMsg(
          "문의 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        return;
      }

      alert("문의가 접수되었습니다. 감사합니다!");
      console.log("CONTACT FORM DATA (saved to Supabase):", form);

      setForm(initialState);
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-16">
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Contact 타이틀 (About이랑 동일 스타일) */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
          Contact <span className="-ml-1">_</span>
        </h1>

        {/* 에러 메시지 표시 (옵션) */}
        {errorMsg && <p className="mb-6 text-sm text-red-500">{errorMsg}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-12"
        >
          {/* LEFT : Address / Tel / Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Address
              </h2>
              <div className="flex items-center">
                <p className="text-sm leading-relaxed">
                  서울특별시 강남구 도곡로7길12, 2층
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%8F%84%EA%B3%A1%EB%A1%9C7%EA%B8%B8%2012%2C%202%EC%B8%B5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex w-7 h-7 items-center justify-center text-[11px]"
                >
                  <MapPinAreaIcon size={18} weight="fill" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Tel
              </h2>
              <p className="text-sm font-semibold">02-556-5557</p>
            </div>
          </div>

          {/* RIGHT : Form */}
          <div className="space-y-10">
            {/* 문의사항 선택 */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                문의사항 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                {inquiryOptions.map((option) => {
                  const active = form.inquiry === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, inquiry: option }))
                      }
                      className={`h-12 text-sm border transition ${
                        active
                          ? "border-black bg-gray-100 font-semibold"
                          : "border-gray-200 bg-gray-100 hover:border-black"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {isRequiredEmpty("inquiry") && (
                <p className="mt-2 text-xs text-red-500">
                  *필수 입력 항목이에요.
                </p>
              )}
            </div>

            {/* 제목 */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={onChange("title")}
                className={`w-full border-b py-2 text-sm outline-none ${
                  isRequiredEmpty("title")
                    ? "border-red-400"
                    : "border-gray-300 focus:border-black"
                }`}
              />
              {isRequiredEmpty("title") && (
                <p className="mt-2 text-xs text-red-500">
                  *필수 입력 항목이에요.
                </p>
              )}
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={form.content}
                onChange={onChange("content")}
                className={`w-full border p-3 text-sm resize-none outline-none ${
                  isRequiredEmpty("content")
                    ? "border-red-400"
                    : "border-gray-300 focus:border-black"
                }`}
              />
              {isRequiredEmpty("content") && (
                <p className="mt-2 text-xs text-red-500">
                  *필수 입력 항목이에요.
                </p>
              )}
            </div>

            {/* 성함 / 회사 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold mb-3">
                  성함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={onChange("name")}
                  className={`w-full border-b py-2 text-sm outline-none ${
                    isRequiredEmpty("name")
                      ? "border-red-400"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {isRequiredEmpty("name") && (
                  <p className="mt-2 text-xs text-red-500">
                    *필수 입력 항목이에요.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  회사 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={onChange("company")}
                  className={`w-full border-b py-2 text-sm outline-none ${
                    isRequiredEmpty("company")
                      ? "border-red-400"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {isRequiredEmpty("company") && (
                  <p className="mt-2 text-xs text-red-500">
                    *필수 입력 항목이에요.
                  </p>
                )}
              </div>
            </div>

            {/* 이메일 / 연락처 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold mb-3">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  className={`w-full border-b py-2 text-sm outline-none ${
                    isRequiredEmpty("email")
                      ? "border-red-400"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {isRequiredEmpty("email") && (
                  <p className="mt-2 text-xs text-red-500">
                    *필수 입력 항목이에요.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  연락처
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={onChange("phone")}
                  className="w-full border-b py-2 text-sm outline-none border-gray-300 focus:border-black"
                />
              </div>
            </div>

            {/* reCAPTCHA 자리 (MVP 더미) */}
            <div className="mt-6">
              <div className="w-full max-w-xs h-20 border border-gray-300 flex items-center justify-center text-xs text-gray-500 bg-gray-50">
                reCAPTCHA 영역 (MVP, 실제 서비스에서 교체)
              </div>
            </div>

            {/* 개인정보 동의 */}
            <div className="mt-6 flex items-center gap-3 text-sm">
              <button
                type="button"
                onClick={toggleAgree}
                className={`w-4 h-4 border flex items-center justify-center ${
                  form.agree ? "bg-black border-black" : "border-gray-400"
                }`}
              >
                {form.agree && <span className="w-2 h-2 bg-white block" />}
              </button>
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </div>

            {/* 제출 버튼 */}
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`px-10 py-3 text-sm font-semibold ${
                  canSubmit
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "전송 중..." : "제출"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
