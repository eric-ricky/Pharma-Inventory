import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
import { Box, useTheme, useMediaQuery } from "@material-ui/core";

const data = [
  {
    name: "Jan",
    sales: 12000,
    scale: 11000,
  },
  {
    name: "Feb",
    sales: 45000,
    scale: 40000,
  },
  {
    name: "Mar",
    sales: 50000,
    scale: 40500,
  },
  {
    name: "Apr",
    sales: 42000,
    scale: 36200,
  },
  {
    name: "May",
    sales: 55000,
    scale: 40500,
  },
  {
    name: "Jun",
    sales: 50000,
    scale: 38000,
  },
  {
    name: "Jul",
    sales: 45000,
    scale: 32000,
  },
  {
    name: "Aug",
    sales: 42000,
    scale: 42000,
  },
  {
    name: "Sep",
    sales: 55000,
    scale: 45600,
  },
];

const Chart = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      component="div"
      sx={{ marginBottom: theme.spacing(10), marginTop: theme.spacing(7) }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          padding: "0",
        }}
      >
        <ComposedChart
          width={lgUp ? 1200 : 350}
          height={lgUp ? 500 : 400}
          data={data}
          style={{
            width: "100%",
            paddingLeft: "0",
            marginLeft: "0",
          }}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="sales"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="sales" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="scale" stroke="#ff7300" />
          <Scatter dataKey="sales" fill="red" />
        </ComposedChart>

        <h2>Sales Summary</h2>
      </Box>
    </Box>
  );
};

export default Chart;
