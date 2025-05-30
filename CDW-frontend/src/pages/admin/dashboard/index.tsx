import { useEffect, useState } from 'react';
import { DashboardStats } from './components/DashboardStats';
import { SalesChart } from './components/SalesChart';
import { TopProducts } from './components/TopProducts';
import { RecentOrders } from './components/RecentOrders';
import { DateRangePicker } from './components/DateRangePicker';
import { getDashboard } from '@/services/dashboard';
import { DashboardResponse } from '@/models';

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const startDateStr = dateRange.startDate.toISOString().split('T')[0];
      const endDateStr = dateRange.endDate.toISOString().split('T')[0];

      const response = await getDashboard(startDateStr, endDateStr);
      setDashboardData(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      {dashboardData && (
        <>
          <DashboardStats data={dashboardData} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <SalesChart salesData={dashboardData.salesData} />
            </div>
            <div>
              <TopProducts products={dashboardData.topProducts} />
            </div>
          </div>

          <div className="mt-6">
            <RecentOrders orders={dashboardData.recentOrders} />
          </div>
        </>
      )}
    </div>
  );
};
