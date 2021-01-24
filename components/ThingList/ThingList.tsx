import React from 'react';
import {
    Draggable,
    DroppableProvided,
    DroppableStateSnapshot
} from 'react-beautiful-dnd';
import { useAppContext } from '../../state';
import { Thing } from '../../util/types';
import { ThingItem } from '../ThingItem/ThingItem';
interface ThingListProps {
    isTodo: boolean;
    provided: DroppableProvided;
    snapshot: DroppableStateSnapshot;
    items: Thing[];
}
import { FaPlusCircle } from 'react-icons/fa';
// const getStyle = (isDraggingOver) => ({
//     backgroundColor:isDraggingOver
// })
export const ThingList: React.FC<ThingListProps> = ({
    isTodo,
    provided,
    snapshot,
    items
}) => {
    // const { todos, setTodos, finished, setFinished } = useAppContext();
    return (
        <div ref={provided.innerRef}>
            <div
                className={`${
                    isTodo ? 'bg-yellow-500' : 'bg-blue-600'
                } rounded-md p-4 mb-4 text-white`}
                style={{ minWidth: '18rem' }}
            >
                {isTodo ? 'In Progress' : 'Finished'}
            </div>
            <div
                className={`flex flex-col gap-4 items-center ${
                    items.length === 0 ? 'bg-gray-200 h-full rounded-md' : ''
                } pb-8`}

                // style={getStyle(snapshot.isDraggingOver)}
            >
                {items.length > 0 ? (
                    <>
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={'' + item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <ThingItem
                                        item={item}
                                        provided={provided}
                                        snapshot={snapshot}
                                    />
                                )}
                            </Draggable>
                        ))}
                        <p
                            className='p-3 m-2 rounded-md text-center cursor-pointer hover:bg-gray-300 flex items-center justify-center text-gray-500 transition-all duration-300 ease-in-out'
                            style={{ width: '90%' }}
                        >
                            <FaPlusCircle className='mr-2' /> Add Task
                        </p>
                    </>
                ) : (
                    <p
                        className='p-3 m-2 rounded-md text-center cursor-pointer hover:bg-gray-300 flex items-center justify-center text-gray-500 transition-all duration-300 ease-in-out'
                        style={{ width: '90%' }}
                    >
                        <FaPlusCircle className='mr-2' /> Add Task
                    </p>
                )}
                {provided.placeholder}
            </div>
        </div>
    );
};
