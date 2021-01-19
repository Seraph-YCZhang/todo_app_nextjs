import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Thing } from '../../util/types';

interface ThingProps {
    item: Thing;
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
}

export const ThingItem: React.FC<ThingProps> = ({
    item,
    provided,
    snapshot
}) => {
    return (
        <div
            className={`${
                snapshot.isDragging ? 'bg-green-200' : ''
            } rounded-md p-4 select-none border border-gray-200 w-72 cursor-pointer  h-32 shadow-md hover:shadow-lg hover:border-gray-400 transition-colors duration-500`}
            ref={provided.innerRef}
            style={{
                ...provided.draggableProps.style
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div>{item.name}</div>
            <div>{item.date}</div>
            <div>{item.description}</div>
            <div
                className={`${
                    item.status === 'to-do' ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {item.status === 'to-do' ? 'In progress' : 'Finished'}
            </div>
        </div>
    );
};
