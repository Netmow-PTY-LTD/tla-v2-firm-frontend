"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Cases",
  },
  totalCases: {
    label: "Total Cases",
    color: "var(--chart-2)",
  },
  casesHired: {
    label: "Cases Hired",
    color: "var(--chart-1)",
  },
};

// Dummy daily data for October 2025
const chartData = [
  { date: "2025-10-01", totalCases: 35, casesHired: 10 },
  { date: "2025-10-02", totalCases: 30, casesHired: 24 },
  { date: "2025-10-03", totalCases: 36, casesHired: 21 },
  { date: "2025-10-04", totalCases: 30, casesHired: 21 },
  { date: "2025-10-05", totalCases: 29, casesHired: 20 },
  { date: "2025-10-06", totalCases: 22, casesHired: 8 },
  { date: "2025-10-07", totalCases: 35, casesHired: 14 },
  { date: "2025-10-08", totalCases: 31, casesHired: 23 },
  { date: "2025-10-09", totalCases: 19, casesHired: 14 },
  { date: "2025-10-10", totalCases: 24, casesHired: 18 },
  { date: "2025-10-11", totalCases: 28, casesHired: 20 },
  { date: "2025-10-12", totalCases: 33, casesHired: 17 },
  { date: "2025-10-13", totalCases: 27, casesHired: 12 },
  { date: "2025-10-14", totalCases: 34, casesHired: 19 },
  { date: "2025-10-15", totalCases: 25, casesHired: 14 },
  { date: "2025-10-16", totalCases: 37, casesHired: 28 },
  { date: "2025-10-17", totalCases: 32, casesHired: 16 },
  { date: "2025-10-18", totalCases: 26, casesHired: 15 },
  { date: "2025-10-19", totalCases: 38, casesHired: 22 },
  { date: "2025-10-20", totalCases: 21, casesHired: 12 },
  { date: "2025-10-21", totalCases: 33, casesHired: 26 },
  { date: "2025-10-22", totalCases: 29, casesHired: 17 },
  { date: "2025-10-23", totalCases: 31, casesHired: 15 },
  { date: "2025-10-24", totalCases: 36, casesHired: 19 },
  { date: "2025-10-25", totalCases: 28, casesHired: 13 },
  { date: "2025-10-26", totalCases: 34, casesHired: 25 },
  { date: "2025-10-27", totalCases: 27, casesHired: 18 },
  { date: "2025-10-28", totalCases: 39, casesHired: 21 },
  { date: "2025-10-29", totalCases: 23, casesHired: 14 },
  { date: "2025-10-30", totalCases: 30, casesHired: 20 },
  { date: "2025-10-31", totalCases: 32, casesHired: 18 },
];

export function InteractiveBarChart() {
  const [activeChart, setActiveChart] = React.useState("totalCases");

  const total = React.useMemo(
    () => ({
      totalCases: chartData.reduce((acc, curr) => acc + curr.totalCases, 0),
      casesHired: chartData.reduce((acc, curr) => acc + curr.casesHired, 0),
    }),
    []
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Daily Case Statistics</CardTitle>
          <CardDescription>
            Showing total cases and hired cases for October 2025
          </CardDescription>
        </div>
        <div className="flex">
          {["totalCases", "casesHired"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 cursor-pointer flex-shrink-0"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="cases"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
