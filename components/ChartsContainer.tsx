'use client';

import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


function ChartsContainer() {
  const { data, isPending } = useQuery<{ date: string; count: number }[]>({
    queryKey :['charts'],
    // ⭐ use server action
    queryFn: () => fetch('/api/charts').then((res) => res.json()),
  });

  if (isPending) return <h2 className='text-xl font-medium'>Please wait...</h2>;
  if (!data || data.length < 1) return null;

    console.log("StatsContainer data:", data);
    // console.log("StatsContainer error:", error);
    console.log("StatsContainer isPending:", isPending);

  return (
    <section className='mt-16'>
      <h1 className='text-4xl font-semibold text-center'>
        Monthly Applications
      </h1>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#2563eb' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
export default ChartsContainer;