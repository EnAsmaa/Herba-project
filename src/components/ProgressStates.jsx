import React from "react";
import { PieChart, Pie, Label, ResponsiveContainer, Cell } from "recharts";

export default function ProgressStates({
  completedCount = 0,
  totalQuizzes = 10,
}) {
  const remainingQuizzes =
    totalQuizzes - completedCount >= 0 ? totalQuizzes - completedCount : 0;

  const data = [
    { name: "Completed", value: completedCount, fill: "#4E7355" },
    { name: "Remaining", value: remainingQuizzes, fill: "#6BB68333" },
  ];

  // حساب النسبة المئوية بدقة
  const total = completedCount + remainingQuizzes;
  const percentage =
    total > 0 ? ((completedCount / total) * 100).toFixed(0) : 0;

  return (
    <div className="flex flex-wrap w-full max-w-[350px] min-h-[300px] p-2.5 justify-around items-stretch">
      <div className="w-[33%] flex-1 flex-shrink-0 basis-[200px] aspect-square h-[calc(100%-20px)]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              innerRadius="60%"
              isAnimationActive={true}
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#446C4F" : "#E8F3EE"} // استخدام الأخضر والترابي
                />
              ))}
            </Pie>

            <Label
              position="center"
              fill="currentColor"
              className="text-[#3E4E36] dark:text-[#E2E8F0] font-black text-2xl"
            >
              {`${percentage}%`}
            </Label>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
