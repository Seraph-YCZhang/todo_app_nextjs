import React from 'react';
import Link from 'next/link';
import { BsFillCalendarFill } from 'react-icons/bs';
import { NavItem } from '../NavItem/NavItem';
export const Layout: React.FC<React.PropsWithChildren<{}>> = ({
    children
}): JSX.Element => {
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='bg-green-500 bg-opacity-90 p-6'>
                <div className='flex max-w-7xl text-white m-auto place-items-center'>
                    <NavItem url='/' size='text-4xl'>
                        <div className='flex items-center'>
                            <BsFillCalendarFill className='mr-4' /> Todo It!
                        </div>
                    </NavItem>

                    <div className='flex ml-auto'>
                        <NavItem url='/list'>LIST</NavItem>
                    </div>
                </div>
            </div>
            <main className='pb-44 max-w-6xl min-h-full py-8 flex-grow mx-auto'>
                {children}
            </main>
            <div className='bg-green-500 bg-opacity-90  bottom-0 w-full p-8'>
                <div className='flex max-w-6xl text-whiteml-auto'>
                    {/* <div className='text-2xl mb-4'>TODO IT!</div> */}
                    <div className='ml-auto text-sm text-white'>
                        CREATED BY YUCHEN 2020
                    </div>
                </div>
            </div>
        </div>
    );
};
