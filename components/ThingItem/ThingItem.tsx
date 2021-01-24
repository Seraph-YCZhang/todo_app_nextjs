import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useListContext } from '../../pages/list';
import { Thing } from '../../util/types';
import { RiEditLine } from 'react-icons/ri';
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
    const [, , , setShow, , setEditItem] = useListContext();
    return (
        <div
            className={`${
                snapshot.isDragging ? 'bg-green-200' : ''
            } relative rounded-md p-4 select-none border border-gray-200 w-72 cursor-pointer  h-32 shadow-md hover:shadow-lg hover:border-gray-400 transition-colors duration-500`}
            ref={provided.innerRef}
            style={{
                ...provided.draggableProps.style
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div>{item.title}</div>
            <div>{item.date}</div>
            <div>{item.description}</div>
            <div
                className={`${
                    item.completed === false ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {item.completed === false ? 'In progress' : 'Finished'}
            </div>
            <div
                role='button'
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.stopPropagation;
                    setEditItem(item);
                    setShow(true);
                }}
                className='hover:bg-gray-200 p-2 absolute top-2 right-2'
                style={{ borderRadius: '50%', width: 'fit-content' }}
            >
                <RiEditLine />
            </div>
        </div>
    );
};
