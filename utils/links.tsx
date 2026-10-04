"use client";

// import { ComponentType } from 'react';
import { LuLayers } from 'react-icons/lu';
// import { IoFolderOutline } from 'react-icons/io5';
import { IoBarChartSharp } from 'react-icons/io5';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};


export const links: NavLink[] = [
  { href: '/', label: 'home', icon: <LuLayers /> },
  { href: '/admin/all-jobs', label: 'all-jobs', icon: <LuLayers /> },
  { href: '/admin/profile', label: 'profile', icon: <LuLayers /> },
  { href: '/admin/stats', label: 'stats', icon: <IoBarChartSharp /> },
  // { href: '/register', label: 'register',  icon: <LuLayers />},

  // ⭐ Add a sign-in link instead (safe)
  { href: '/login', label: 'login', icon: <LuLayers /> },

  { href: '/landing', label: 'landing',  icon: <LuLayers />},

];

// export const adminLinks: NavLink[] = [
//   { href: '/admin/add-job', label: 'all-jobs',  icon:<IoBarChartSharp /> },
//   { href: '/admin/jobs', label: 'add-job', icon: <LuLayers /> },
//   { href: '/admin/profile', label: 'profile', icon: <LuLayers /> },
// ];


// export const sidebarLinks = [
//   {
//     id: 1,
//     text: 'stats',
//     path: '/admin/stats',
//     icon: <IoBarChartSharp />
//   },
//   {
//     id: 2,
//     text: 'all jobs',
//     path: '/admin/all-jobs',
//     icon: <LuLayers />
//   },
//   {
//     id: 3,
//     text: 'add job',
//     path: '/admin/add-job',
//     icon: <LuLayers />
//   },
//   {
//     id: 4,
//     text: 'profile',
//     path: '/admin/profile',
//     icon: <LuLayers />
//   }
// ];
 export default links; 