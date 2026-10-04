"use client";
import { FaTimes } from 'react-icons/fa'
import Link from "next/link";
// import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleSidebar } from '@/features/user/userSlice';
import Wrapper from '@/assets/wrappers/SmallSidebar';
import NavLink from '@/utils/links';
// utils/types describes the type of the link object that is passed to the SmallSidebar component. It is imported from utils/types.ts
// eg string/number, string, React.ReactNode
// import { smallSidebarLink } from '@/utils/types';

function SmallSidebar() {
    // This connects to the store.user through the hook.ts file
    const isSidebarOpen = useAppSelector((state) => state.user.isSidebarOpen);
    const dispatch = useAppDispatch();
    
 
    return (
        <Wrapper>
             <div
                className={
                isSidebarOpen
                    ? "sidebar-container show-sidebar"
                    : "sidebar-container"
                }
            >

            <div className='content'>
                <button className='close-btn' onClick={() => dispatch(toggleSidebar())}>
                    <FaTimes />
                </button>
            </div>
            <div className='nav-links'>
                {NavLink.map((link) => {
                    // We pull out all the properties from the link object to use in the NavLink component
                    const { href, label, icon } = link;
                    return (
                        <Link
                            href={href}
                            key={href}
                            className="nav-link"
                            onClick={() => dispatch(toggleSidebar())}>
                            <span className='icon'>{icon}</span>
                            {label}
                      </Link>
                    )
                    })}  
            </div>
          </div>
       </Wrapper>
    )
}
export default SmallSidebar;