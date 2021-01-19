import Head from 'next/head';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import {
    DragDropContext,
    DraggableLocation,
    Droppable,
    DropResult
} from 'react-beautiful-dnd';
import AddForm from '../components/AddForm';
import { Layout } from '../components/Layout/Layout';
import { ThingList } from '../components/ThingList/ThingList';
import { getItems, useAppContext } from '../state';
import { Thing } from '../util/types';

interface ListProps {}
const reorder = (list: Thing[], startIdx: number, endIdx: number) => {
    const ret = Array.from(list);
    const [target]: Thing[] = ret.splice(startIdx, 1);
    ret.splice(endIdx, 0, target);
    return ret;
};

const move = (
    src: Thing[],
    des: Thing[],
    dropSrc: DraggableLocation,
    dropDes: DraggableLocation
) => {
    const srcClone = Array.from(src);
    const desClone = Array.from(des);
    const [removed]: Thing[] = srcClone.splice(dropSrc.index, 1);
    removed.status = dropDes.droppableId === 'todos' ? 'to-do' : 'finished';
    desClone.splice(dropDes.index, 0, removed);
    const result = {};
    result[dropSrc.droppableId] = srcClone;
    result[dropDes.droppableId] = desClone;
    // console.log(result);
    return result;
};
const arr1 = getItems(3, true);
const arr2 = getItems(3, false);
const ListContext = createContext(null);
const List: React.FC<ListProps> = ({}) => {
    const [winReady, setwinReady] = useState(false);
    useEffect(() => {
        setwinReady(true);
    }, []);
    // const { todos, setTodos, finished, setFinished } = useAppContext();
    const [items, setItems] = useState<Record<string, Thing[]>>({
        todos: arr1,
        finished: arr2
    });
    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { source, destination } = result;
            if (!destination) {
                return;
            }
            const srcDropId = source.droppableId;
            const desDropId = destination.droppableId;
            if (srcDropId === desDropId) {
                const result = reorder(
                    srcDropId === 'todos' ? items.todos : items.finished,
                    source.index,
                    destination.index
                );

                if (source.droppableId === 'finished') {
                    setItems({
                        todos: items.todos,
                        finished: result
                    });
                } else if (srcDropId === 'todos') {
                    setItems({
                        todos: result,
                        finished: items.finished
                    });
                }
            } else {
                const result = move(
                    srcDropId === 'todos' ? items.todos : items.finished,
                    desDropId === 'todos' ? items.todos : items.finished,
                    source,
                    destination
                );
                setItems(result);
            }
        },
        [items, setItems]
    );
    if (!winReady) {
        return <Layout></Layout>;
    }
    return (
        <ListContext.Provider value={[items, setItems]}>
            <Layout>
                <Head>
                    <title>List</title>
                </Head>
                <div className='flex gap-6 justify-start pl-8 pr-8'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='todos'>
                            {(provided, snapshot) => (
                                <ThingList
                                    isTodo={true}
                                    provided={provided}
                                    snapshot={snapshot}
                                    items={items.todos}
                                />
                            )}
                        </Droppable>
                        <Droppable droppableId='finished'>
                            {(provided, snapshot) => (
                                <ThingList
                                    isTodo={false}
                                    provided={provided}
                                    snapshot={snapshot}
                                    items={items.finished}
                                />
                            )}
                        </Droppable>
                    </DragDropContext>
                    <AddForm />
                </div>
            </Layout>
        </ListContext.Provider>
    );
};
export default List;
export const useListContext = () => {
    const [items, setItems] = useContext(ListContext);
    return [items, setItems] as const;
};
