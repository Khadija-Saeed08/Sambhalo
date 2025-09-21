import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#4E79A7",
  "#F28E2B",
  "#E15759",
  "#76B7B2",
  "#59A14F",
  "#EDC948",
];

export default function IncomeSourcePie({ data }) {
  return (
    <div className="chart-host">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            nameKey="name" 
            innerRadius={50} 
            outerRadius={100} 
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
