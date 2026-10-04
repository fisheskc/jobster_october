'use client';
import { useQuery } from '@tanstack/react-query';
// import { getStatsAction } from '@/utils/actions';
import StatsCard from './StatsCard';
// import { getStatsAction } from '@/utils/actions/stats';

type StatsData = {
  pending: number;
  interview: number;
  declined: number;
};

function StatsContainer() {
  const { data, isPending, error } = useQuery<StatsData>({
    queryKey: ['stats'],
    // ⭐ use server action
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) {
        throw new Error("Stats API failed");
      }

      return res.json();
    },
  });

  console.log("StatsContainer data:", data);
  console.log("StatsContainer error:", error);
  console.log("StatsContainer isPending:", isPending);

  // function StatsContainer() {
  // const { data } = useQuery<StatsData>({
  //   queryKey: ['stats'],
  //   queryFn: async () => {
  //     const res = await fetch('/api/stats');
  //     return res.json();
  //   },
  // });
  if (isPending) {
    return <h2 className="text-xl font-medium">Loading stats…</h2>;
  }

  if (error) {
    return <h2 className="text-xl font-medium text-red-500">
      Stats failed to load
    </h2>;
  }

  return (
    <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <StatsCard title='pending jobs' value={data?.pending || 0} />
      <StatsCard title='interviews set' value={data?.interview || 0} />
      <StatsCard title='jobs declined' value={data?.declined || 0} />
    </div>
  );
}
export default StatsContainer;