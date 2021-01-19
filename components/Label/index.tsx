import React from 'react';

interface indexProps {
    htmlFor?: string;
}

const index: React.FC<React.PropsWithChildren<indexProps>> = ({
    children,
    htmlFor
}) => {
    return <label htmlFor={htmlFor} className='text-gray-500 text-lg mb-1' >{children}</label>;
};
export default index;
