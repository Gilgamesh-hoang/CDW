import InfoCard from '@/components/InfoCard';
import {
  FaUsers,
  FaShoppingBag,
  FaShoppingCart,
  FaMoneyBillWave,
  FaLayerGroup,
} from 'react-icons/fa';
import { formatCurrency } from '@/utils/format';
interface DashboardStatsProps {
  data: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalCategories: number;
  };
}

export const DashboardStats = ({ data }: DashboardStatsProps) => {
  const {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue,
    totalCategories,
  } = data;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <FaUsers className="text-blue-500" size={24} />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Products',
      value: totalProducts,
      icon: <FaShoppingBag className="text-green-500" size={24} />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: <FaShoppingCart className="text-purple-500" size={24} />,
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Revenue',
      value: `${formatCurrency(totalRevenue)}`,
      icon: <FaMoneyBillWave className="text-yellow-500" size={24} />,
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Total Categories',
      value: totalCategories,
      icon: <FaLayerGroup className="text-red-500" size={24} />,
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <InfoCard
          key={index}
          title={stat.title}
          description={stat.value}
          icon={stat.icon}
          iconBgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};
