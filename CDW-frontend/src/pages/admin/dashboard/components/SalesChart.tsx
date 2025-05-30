import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartProps {
  salesData: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

export const SalesChart = ({ salesData }: SalesChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const dates = salesData.map((item) => item.date);
  const revenues = salesData.map((item) => item.revenue);
  const orders = salesData.map((item) => item.orders);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Revenue',
        data: revenues,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'Orders',
        data: orders,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Sales Performance',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Revenue ($)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Orders',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sales Performance</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded ${
              chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded ${
              chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      {chartType === 'line' ? (
        <Line options={options} data={data} />
      ) : (
        <Bar options={options} data={data} />
      )}
    </div>
  );
};
