import AppointmentDashboard from "@/component/AppointmentChart"; // Path check karein
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  // Fetch data
  const { data: appointments, error } = await supabase
    .from('appointment')
    .select('service, amount, date')
    .order('date', { ascending: true });

  if (error) {
    return <div className="p-10 text-red-500">Error: {error.message}</div>;
  }

  // Clean data
  const chartData = (appointments || []).map((item: any) => ({
    date: item.date ? new Date(item.date).toLocaleDateString() : 'N/A',
    service: item.service || 'N/A',
    amount: Number(item.amount) || 0,
    patients: 1, // Agar column nahi hai toh default 1
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <AppointmentDashboard data={chartData} />
      </div>
    </main>
  );
}