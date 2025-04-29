"use client";

import { createClient } from '@/lib/supabase/browserClient';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function Lesson29() {
  const supabase = createClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await supabase.from("users").select("*");

      return res.data;
    }
  })

  const { data: works = [] } = useQuery({
    queryKey: ["works"],
    queryFn: async () => {
      const res = await supabase.from("works").select("*");

      return res.data;
    }
  })

  console.log(users, works);

  const deleteWorks = async (vacationId: string) => {
    await supabase.from("works").delete().eq("id", vacationId);
    window.location.reload();
  }

  const createUser = async () => {
    await supabase.from("users").insert({
      fullname: "Помидор",
    });
    window.location.reload();
  }

  const createWork = async () => {
    await supabase.from("works").insert({
      // id: Math.round(Math.random(), * 200000000),
      name: "Помидор",
      desc: "2+4",
      subject: "математика",
      body: "6",
      student: "1"
    });
    window.location.reload();
  }

  
  return (
    <div>
      <div>
        Пользователи:
        {users.map((user) => (<div>{user.fullname}<div>{user.group}</div></div>))}
      </div>
      <div>
        Отпуска:
        {works.map((work) => (<div><div>{work.desc}<div>{work.body}</div></div><button className='bg-red-500 cursor-pointer' onClick={() => deleteWorks(work.id)}>Удалить</button></div>))}
      </div>
      <div>
        <input type='text' className='border border-black' />
        <button className='bg-green-500 cursor-pointer' onClick={() => createUser()}>Добавить пользователя</button>
      </div>
      <div>
        <input type='text' className='border border-black' />
        <button className='bg-green-500 cursor-pointer' onClick={() => createWork()}>Добавить работу</button>
      </div>
    </div>
  )
}


