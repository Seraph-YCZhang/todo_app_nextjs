import React, { ChangeEvent } from 'react';

interface indexProps {
    id?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const index: React.FC<indexProps> = ({
    value,
    onChange,
    type = 'text',
    id
}) => {
    return <input value={value} onChange={onChange} type={type} id={id} className='p-4 border border-gray-200 rounded mb-1' />;
};

export default index;
