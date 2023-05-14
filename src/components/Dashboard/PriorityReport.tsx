import { memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Props = {};

const verify = (array: any) => {
  return !(
    array[0].value === 0 &&
    array[1].value === 0 &&
    array[2].value === 0
  );
};

const reserve = [{ value: 1 }];
const PriorityReport = memo(({ session, data: { priority, status } }: any) => {
  const COLORS = ["#d12626", "#FFBB28", "#00C49F"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        fontSize={12}
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="gridElem">
      <h2 className="text-lg font-boldcapitalize text-textPrimary ">
        Priorities and Status
      </h2>
      {priority && status && (
        <div className="flex flex-col justify-center items-center space-x-2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart width={200} height={200}>
              <Pie
                className="cursor-pointer will-change-auto"
                data={verify(priority) ? priority : reserve}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#a7a7a8"
                dataKey="value"
                // label={renderCustomizedLabel}
              >
                {verify(priority) &&
                  priority.map((entry: any, index: any) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              {verify(priority) && <Tooltip />}
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-row justify-center items-center gap-4 w-full">
            <div className="bg-white/10 flex-1 cursor-pointer hover:bg-white/40 transition-colors min-w-[150px] h-16 border-2 border-green rounded-md flex justify-center items-center text-green font-bold text-xl">
              {status.open}
            </div>
            <div className=" bg-white/10 flex-1 cursor-pointer hover:bg-white/40 transition-colors min-w-[150px] h-16 border-2 border-red rounded-md flex justify-center items-center text-red font-bold text-xl">
              {status.closed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
export default PriorityReport;
