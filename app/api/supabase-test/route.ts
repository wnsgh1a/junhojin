import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  // 👉 'test_table' 부분을 네가 Supabase에서 만든 실제 테이블 이름으로 바꿔
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .limit(5);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, data });
}
