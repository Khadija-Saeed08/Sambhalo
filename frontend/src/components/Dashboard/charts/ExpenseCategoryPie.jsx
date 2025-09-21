import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#FF6384", // pink/red
  "#36A2EB", // blue
  "#FFCE56", // yellow
  "#4BC0C0", // teal
  "#9966FF", // purple
  "#FF9F40", // orange
];

export default function ExpenseCategoryPie({ data }) {
  return (
    <div className="chart-host">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            nameKey="name" 
            outerRadius={110} 
            label 
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

