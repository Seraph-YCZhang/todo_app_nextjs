import React from 'react';
import Link from 'next/link';
interface NavItemProps {
    url: string;
    size?: string;
}

export const NavItem: React.FC<React.PropsWithChildren<NavItemProps>> = ({
    url,
    children,
    size
}) => {
    return (
        <div
            className={`${
                size ? size : 'text-2xl'
            } cursor-pointer hover:underline transition-all ease-in-out duration-300`}
        >
            <Link href={url}>{children}</Link>
        </div>
    );
};
