
import { supabase } from '@/lib/supabase';
import AppointmentBarChart from '@/component/AppointmentBarChart';

export default async function Page() {
  // Fetch data on the server
  const { data: appointments } = await supabase
    .from('appointment')
    .select('date')
    .order('date', { ascending: true });

  // Simple aggregation: { "2026-02-14": 5, "2026-02-15": 3 }
  const safeAppointments = appointments ?? [];

  const chartData = safeAppointments.reduce((acc:Record<string, number>, curr) => {
    const date = curr.date.split('T')[0]; // Get YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const formattedData = Object.entries(chartData).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Patient Volume</h1>
      <div className="h-100 w-full bg-white rounded-xl shadow-sm border p-4">
        <AppointmentBarChart data={formattedData} />
      </div>
    </div>
  );
}