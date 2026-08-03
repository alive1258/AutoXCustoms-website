"use client";

import { stats } from "@/src/utils/data";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [counters, setCounters] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const initial: Record<string, number> = {};
      stats.forEach((stat) => {
        const num = parseInt(stat.value.replace("+", ""));
        initial[stat.id] = isNaN(num) ? 0 : num;
      });
      setCounters(initial);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12 bg-indigo-700 text-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
          {stats?.map((stat) => (
            <div key={stat.id}>
              <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-sm text-indigo-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
