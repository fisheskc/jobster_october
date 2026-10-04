import type { ComponentType } from 'react';
import ChartsContainer from '@/components/ChartsContainer';// 
import StatsContainer from '@/components/StatsContainer';
// import { getChartsDataAction, getStatsAction } from '@/utils/actions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';



async function StatsPage() {

   return (
      <>
        <StatsContainer />
        <ChartsContainer />
      </>

   )
}
export default StatsPage;
