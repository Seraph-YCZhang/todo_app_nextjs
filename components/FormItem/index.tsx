import React from 'react';

interface indexProps {
    col?: boolean;
}

const index: React.FC<React.PropsWithChildren<indexProps>> = ({
    children,
    col = true
}) => {
    return <div className={`flex ${col ? 'flex-col' : ''}`}>{children}</div>;
};
export default index;
