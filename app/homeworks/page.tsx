"use client";

import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function HomeworksPage() {
  const { data: homeworks } = useQuery({
    queryKey: ["homeworks"],
    queryFn: async () => {
      const res = await fetch("http://localhost:1337/api/homeworks", {
        headers: {
          "Authorization": "Bearer f1d513f27a254e2ac692ace0888c152351f43d6cdb867db2c6260746c984011c7d0589e2c96e1af03f073afef5ed1b6673f6696fb90df0a8eb4c60924bb96f1cbeaca3963e9a71cdd9abd5e2c914d5fb9ae0c5f2b7d60c7957c6a67912793c60361bbe07466a2812f3a038150e899c086087c4ada3a23cca6da0b811d1839f16"
        }
      })

      const data =res.json();

      return data;
    }
  })

  console.log(homeworks);

  return (
    <div>HomeworksPage</div>
  )
}

