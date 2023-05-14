import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

type Props = {};
const TicketsDateChart = ({ data }: any) => {
  return (
    <div className="gridElem">
      <h2 className="font-bold text-lg mb-6 text-textPrimary">Tendance</h2>
      {data && (
        <ResponsiveContainer width="100%" height={250} className="pointer">
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1DBF82" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1DBF82" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              strokeWidth={0.4}
              dataKey="date"
              tickSize={15}
              tickLine={false}
              tick={{ fontSize: "10px" }}
            />
            <YAxis
              strokeWidth={0.2}
              tickSize={5}
              tickLine={false}
              tick={{ fontSize: "12px" }}
            />
            <CartesianGrid
              strokeDasharray="4 0"
              vertical={false}
              strokeWidth={0.4}
            />
            <Tooltip
              itemStyle={{}}
              contentStyle={{
                scale: "0.8",
                borderRadius: "4px",
              }}
              formatter={(value, name, props) => [value, "Tickets"]}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#178f62"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
export default TicketsDateChart;
