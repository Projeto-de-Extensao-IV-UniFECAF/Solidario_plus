import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Donation } from "@/types/database";

type PeriodType = "week" | "month" | "year";

interface DonationsLineChartProps {
  donations: Donation[];
}

const DonationsLineChart = ({ donations }: DonationsLineChartProps) => {
  const [period, setPeriod] = useState<PeriodType>("week");

  // Dados mockados para exemplo
  const mockData = [
    { "data": "01/08", "valor": 100 },
    { "data": "08/08", "valor": 170 },
    { "data": "15/08", "valor": 220 },
    { "data": "22/08", "valor": 180 },
    { "data": "29/08", "valor": 280 },
    { "data": "05/09", "valor": 320 },
    { "data": "12/09", "valor": 300 }
  ];

  // Formatar valor para o tooltip
  const formatTooltipValue = (value: number) => {
    return `R$ ${value}k`;
  };

  // Formatar valor para o eixo Y
  const formatYAxis = (value: number) => {
    return `R$${value}k`;
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Evolução de Doações</CardTitle>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as PeriodType)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mês</SelectItem>
            <SelectItem value="year">Ano</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="data" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                domain={[50, 340]}
              />
              <Tooltip 
                formatter={(value: number) => [formatTooltipValue(value), 'Valor']}
                labelFormatter={(label) => `Data: ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="valor" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationsLineChart;