import { NextResponse } from "next/server";

import GigaChat from 'gigachat';
import { Agent } from 'node:https';
import { createClient } from "@/lib/supabase/serverClient";

const httpsAgent = new Agent({
    rejectUnauthorized: false,
});

const client = new GigaChat({
    timeout: 600,
    model: 'GigaChat',
    httpsAgent: httpsAgent,
    dangerouslyAllowBrowser: true,
    credentials: process.env.CHAT_KEY,
});
 
export async function POST(req) {
  const body = await req.json();
  const supabase = await createClient();

  const get_students = async () => {
    const { data: students = [] } = await supabase.from("students").select("*");
    return students;
  }

  try {
    const resp = await client.chat({
      messages: [{role: "system", content: "Ты умеешь получать список студентов при помощи функции get_students"}, { role: 'user', content: body.message }],
      functions: [{
        name: 'get_students',
        description: 'Получает список всех студенов',
        parameters: {
          type: 'object',
          properties: {
            arg: {
              type: 'string'
            }
          }
        }
      }],
      function_call: "auto",
    })


    if (resp.choices[0].message.function_call) {
      const functionToCall = resp.choices[0].message.function_call.name;
      if (functionToCall === "get_students") {
        const users = await get_students();
        return NextResponse.json({ type: "func", message: users, status: 200})
      }
    } else {
      return NextResponse.json({ message: resp.choices[0].message.content, status: 200})
    }
  } catch (e) {
    return NextResponse.json({message: e.message, status: 200})
  }
}
