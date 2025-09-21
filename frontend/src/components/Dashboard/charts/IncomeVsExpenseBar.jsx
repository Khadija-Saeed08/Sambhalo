import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function IncomeVsExpenseBar({ data }) {
  return (
    <div className="chart-host">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3b82f6" /> 
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
