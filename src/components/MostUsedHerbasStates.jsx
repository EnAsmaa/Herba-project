import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Sample data
const data = [
  { name: "Herba A", uv: 4000 },
  { name: "Herba B", uv: 3000 },
  { name: "Herba C", uv: 2000 },
  { name: "Herba D", uv: 2780 },
  { name: "Herba E", uv: 1890 },
  { name: "Herba F", uv: 2390 },
  { name: "Herba G", uv: 3490 },
];

export default function MostUsedHerbasStates() {
  return (
    <div className="flex items-center" style={{ width: "100%", maxWidth: "800px", height: "400px" }}>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          {/* X-axis labels */}
          <XAxis dataKey="name" tick={{fill: '#000'}} />

          {/* Y-axis */}
          <YAxis tick={{fill: '#000'}} />

          {/* Tooltip on hover */}
          <Tooltip />

          {/* Bar */}
          <Bar dataKey="uv" fill="#335D39cc" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
