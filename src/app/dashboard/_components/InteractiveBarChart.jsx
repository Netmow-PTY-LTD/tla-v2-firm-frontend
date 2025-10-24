import React, { useState, useMemo } from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetFirmDashboardCasesStatsQuery } from "@/store/firmFeatures/firmApiService";

// ✅ Only using totalLeads and totalHired
const chartConfig = {
  totalLeads: {
    label: "Total Cases",
    color: "var(--chart-2)",
  },
  totalHired: {
    label: "Cases Hired",
    color: "var(--chart-1)",
  },
};

const FILTERS = [
  "Yearly",
  "6 Months",
  "3 Months",
  "Monthly",
  "15 Days",
  "7 Days",
];

const FilterType = {
  Yearly: "yearly",
  "6 Months": "six-months",
  "3 Months": "three-months",
  Monthly: "monthly",
  "15 Days": "fifteen-days",
  "7 Days": "seven-days",
};

export default function InteractiveBarChart() {
  const [filter, setFilter] = useState("Yearly");
  const { data: barChartData } = useGetFirmDashboardCasesStatsQuery(
    FilterType[filter]
  );

  const today = new Date();

  const chartData = useMemo(() => {
    if (!barChartData?.data) return [];

    let data = [...barChartData.data];

    // Clean and normalize values
    data = data.map((item) => {
      const cleaned = { ...item };
      Object.keys(chartConfig).forEach((key) => {
        cleaned[key] = Math.abs(item[key] || 0);
      });
      return cleaned;
    });

    const result = [];

    // Handle daily filters
    if (["Monthly", "15 Days", "7 Days"].includes(filter)) {
      let start = new Date(today);
      if (filter === "Monthly") start.setDate(today.getDate() - 29);
      if (filter === "15 Days") start.setDate(today.getDate() - 14);
      if (filter === "7 Days") start.setDate(today.getDate() - 6);

      const filled = [];
      const current = new Date(start);

      while (current <= today) {
        const dateStr = current.toISOString().split("T")[0];
        const existing = data.find((d) => d.date === dateStr);

        filled.push(
          existing || {
            date: dateStr,
            totalLeads: 0,
            totalHired: 0,
          }
        );

        current.setDate(current.getDate() + 1);
      }

      return filled;
    }

    // Handle monthly filters (Yearly, 6 Months, 3 Months)
    if (["Yearly", "6 Months", "3 Months"].includes(filter)) {
      const monthCount = {
        Yearly: 12,
        "6 Months": 6,
        "3 Months": 3,
      }[filter];

      const grouped = {};

      // Step 1: Group data into months
      data.forEach((item) => {
        const d = new Date(item.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}`; // "YYYY-MM"
        if (!grouped[key]) {
          grouped[key] = { date: key, totalLeads: 0, totalHired: 0 };
        }

        grouped[key].totalLeads += item.totalLeads || 0;
        grouped[key].totalHired += item.totalHired || 0;
      });

      // Step 2: Fill missing months
      const filled = [];
      const current = new Date(today);
      current.setDate(1); // set to first day of the current month
      current.setMonth(current.getMonth() - (monthCount - 1)); // go back (N - 1) months

      for (let i = 0; i < monthCount; i++) {
        const key = `${current.getFullYear()}-${String(
          current.getMonth() + 1
        ).padStart(2, "0")}`;

        filled.push(
          grouped[key] || {
            date: key,
            totalLeads: 0,
            totalHired: 0,
          }
        );

        current.setMonth(current.getMonth() + 1); // move forward by 1 month
      }

      return filled;
    }

    return data;
  }, [barChartData, filter]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div className="space-y-1">
          <CardTitle>Cases Overview</CardTitle>
          <CardDescription>
            Overview of <b>{filter.toLowerCase()}</b> data
          </CardDescription>
        </div>
        <div className="w-[200px] pb-4 flex justify-end">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              {FILTERS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const [year, month] = value.split("-");
                const date = new Date(`${year}-${month}-01`);
                return date.toLocaleString("en-US", { month: "short" }); // e.g., "Oct"
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[250px]"
                  indicator="dot"
                  labelFormatter={(value) => {
                    if (["Yearly", "6 Months", "3 Months"].includes(filter)) {
                      const [year, month] = value.split("-");
                      const date = new Date(`${year}-${month}-01`);
                      return date.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      });
                    }

                    // Daily formats
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartConfig[key].color}
                name={chartConfig[key].label}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing data for last{" "}
          <b>
            {filter === "Yearly"
              ? "year"
              : filter === "Monthly"
              ? "month"
              : filter}
          </b>
        </div>
      </CardFooter>
    </Card>
  );
}
