import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import EcommerceMetrics from "@/components/ecommerce/EcommerceMetrics";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-6">
        <div className="h-10 w-1/3 bg-gray-200 rounded-xl" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-7 h-64 bg-gray-200 rounded-xl" />
          <div className="col-span-12 xl:col-span-5 h-64 bg-gray-200 rounded-xl" />
          <div className="col-span-12 h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }



  return (
    <>
      <PageMeta
        title="Dashboard | Cataloguei"
        description="Painel principal do sistema Cataloguei Dashboard"
      />

      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Bem-vindo, {user?.name}
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Última atualização
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Hoje
            </p>
          </div>
        </div>

        {/* Metrics */}
        <EcommerceMetrics />

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <MonthlySalesChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <MonthlyTarget />
          </div>

          <div className="col-span-12">
            <StatisticsChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <DemographicCard />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <RecentOrders />
          </div>
        </div>
      </div>
    </>
  );
}