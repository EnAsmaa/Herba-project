import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function MostUsedHerbasStates({ usageData = [] }) {
  
  // في حال كان المستخدم جديدًا ولم يطلب أي منتج طبي بعد من المتجر
  if (!usageData || usageData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8 bg-gray-50 dark:bg-zinc-900/10 rounded-xl border border-dashed border-gray-200 dark:border-green-900/30 w-full">
        <span className="text-4xl mb-3">📦</span>
        <h3 className="text-lg font-bold text-slate-700 dark:text-zinc-300">No Orders Placed Yet</h3>
        <p className="text-gray-400 dark:text-zinc-500 text-sm max-w-sm mt-1">
          Explore our Market, order some healthy and medicinal herbs, and your top purchased plants analysis will appear here!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
      <h3 className="text-base font-semibold text-gray-400 dark:text-zinc-400 mb-6 self-start px-2">
        Analysis of Your Most Purchased Herbs
      </h3>

      <div className="flex items-center w-full max-w-[800px] h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={usageData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: "currentColor" }} 
              className="text-gray-600 dark:text-zinc-400 text-xs font-medium"
              axisLine={{ stroke: '#94a3b8', strokeWidth: 0.5 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: "currentColor" }} 
              className="text-gray-600 dark:text-zinc-400 text-xs font-medium"
              axisLine={{ stroke: '#94a3b8', strokeWidth: 0.5 }}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "var(--tw-chart-bg, #ffffff)",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
              itemStyle={{ color: "#4E7355", fontWeight: "bold" }}
              cursor={{ fill: 'rgba(78, 115, 85, 0.05)' }}
            />
            <Bar dataKey="uv" fill="#4E7355" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}