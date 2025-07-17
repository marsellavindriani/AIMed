"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import BaseSection from "@/components/base-section"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function StatisticsSection() {
  return (
    <BaseSection title="Statistics">
      <div className="flex flex-col flex-wrap justify-center gap-y-4 md:flex-row md:gap-y-8 md:pt-8">
        <div className="md:basis-1/3 md:p-4">
          <div className="border p-4 md:p-8">
            <p className="text-4xl font-medium text-primary md:text-7xl">727</p>
            <h3>Visitors</h3>
          </div>
        </div>
        <div className="md:basis-1/3 md:p-4">
          <div className="border p-4 md:p-8">
            <p className="text-4xl font-medium text-primary md:text-7xl">727</p>
            <h3>Visitors</h3>
          </div>
        </div>
        <div className="md:basis-1/3 md:p-4">
          <div className="border p-4 md:p-8">
            <p className="text-4xl font-medium text-primary md:text-7xl">727</p>
            <h3>Visitors</h3>
          </div>
        </div>
        <div className="md:basis-1/3 md:p-4">
          <ChartContainer config={chartConfig} className="w-full">
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="md:basis-1/3 md:p-4">
          <ChartContainer config={chartConfig} className="w-full">
            <LineChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="md:basis-1/3 md:p-4">
          <ChartContainer config={chartConfig} className="w-full">
            <AreaChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
              <Area
                dataKey="mobile"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </BaseSection>
  )
}
