import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import type { DataType } from "../../pages/transaction/buy/[name]/[id]";

const RenderLineChart = ({ data }: { data: DataType[] }) => {
  return (
    <LineChart
      height={300}
      width={800}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="Close" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis hide />
      <YAxis />
    </LineChart>
  );
};

export default RenderLineChart;
