import axios from 'axios';
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
// import { getItems, useAppContext } from '../state';
import { Thing } from '../util/types';
import Modal from '../components/Modal';
import dayjs from 'dayjs';
import Alert from '../components/Alert';
interface ListProps {}
const reorder = async (list: Thing[], startIdx: number, endIdx: number) => {
    // console.log(list, startIdx, endIdx);
    const ret = Array.from(list);
    let prev: number, next: number;
    if (endIdx === 0) {
        prev = -100;
        next = ret[0].position;
    } else if (endIdx === ret.length - 1) {
        prev = ret[ret.length - 1].position;
        next = ret[ret.length - 1].position + 200;
    } else {
        prev = ret[endIdx - 1].position;
        next = ret[endIdx].position;
    }
    // console.log(prev, next)
    const [target]: Thing[] = ret.splice(startIdx, 1);

    const addItem: Thing = {
        ...target,
        position: Math.round((prev + next) / 2)
    };
    // console.log(addItem);
    await axios.put(`http://localhost:8000/api/todos/${addItem.id}/`, addItem);
    ret.splice(endIdx, 0, target);
    return ret;
};

const move = async (
    src: Thing[],
    des: Thing[],
    dropSrc: DraggableLocation,
    dropDes: DraggableLocation
) => {
    const srcClone = Array.from(src);
    const desClone = Array.from(des);
    const [removed]: Thing[] = srcClone.splice(dropSrc.index, 1);
    removed.completed = dropDes.droppableId === 'todos' ? false : true;
    const endIdx = dropDes.index;
    let prev: number, next: number;
    // console.log(endIdx)
    if (endIdx === 0) {
        prev = -100;
        next = desClone[0].position;
    } else if (endIdx === desClone.length - 1) {
        prev = desClone[desClone.length - 1].position;
        next = desClone[desClone.length - 1].position + 200;
    } else {
        prev = desClone[endIdx - 1].position;
        next = desClone[endIdx].position;
    }
    desClone.splice(endIdx, 0, removed);
    const result = {};
    result[dropSrc.droppableId] = srcClone;
    result[dropDes.droppableId] = desClone;
    const addItem: Thing = {
        ...removed,
        position: Math.round((prev + next) / 2)
    };
    await axios.put(`http://localhost:8000/api/todos/${addItem.id}/`, addItem);
    return result;
};

const ListContext = createContext(null);
const List: React.FC<ListProps> = ({}) => {
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState<
        'Order Saved!' | 'Task Created!'
    >('Order Saved!');
    const [editItem, setEditItem] = useState<Thing>({
        title: '',
        description: '',
        completed: false,
        date: dayjs().toISOString(),
        position: 1000
    });
    const [winReady, setwinReady] = useState(false);
    useEffect(() => {
        setwinReady(true);
        refreshList();
    }, []);
    // const { todos, setTodos, finished, setFinished } = useAppContext();
    const [items, setItems] = useState<Record<string, Thing[]>>({
        todos: [],
        finished: []
    });
    const refreshList = useCallback(() => {
        axios
            .get('http://localhost:8000/api/todos/')
            .then(res => {
                console.log(res.data);
                setItems({
                    todos: res.data.filter((t: Thing) => t.completed === false),
                    finished: res.data.filter(
                        (t: Thing) => t.completed === true
                    )
                });
            })
            .catch(err => console.log(err));
    }, []);
    const onDragEnd = useCallback(
        async (result: DropResult) => {
            const { source, destination } = result;
            if (!destination) {
                return;
            }
            const srcDropId = source.droppableId;
            const desDropId = destination.droppableId;
            if (srcDropId === desDropId) {
                const result = await reorder(
                    srcDropId === 'todos' ? items.todos : items.finished,
                    source.index,
                    destination.index
                );
                setAlert(true);
                setAlertContent('Order Saved!');
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
                const result = await move(
                    srcDropId === 'todos' ? items.todos : items.finished,
                    desDropId === 'todos' ? items.todos : items.finished,
                    source,
                    destination
                );
                setItems(result);
                setAlert(true);
                setAlertContent('Order Saved!');
            }
        },
        [items, setItems]
    );
    if (!winReady) {
        return <Layout></Layout>;
    }
    return (
        <ListContext.Provider
            value={[
                items,
                setItems,
                showModal,
                setShowModal,
                editItem,
                setEditItem,
                refreshList
            ]}
        >
            <Layout>
                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    editItem={editItem}
                />
                <Alert
                    color={'blue'}
                    showAlert={alert}
                    setShowAlert={setAlert}
                    content={alertContent}
                />
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
                    <AddForm setAlertContent={setAlertContent} />
                </div>
            </Layout>
        </ListContext.Provider>
    );
};
export default List;
export const useListContext = () => {
    const [
        items,
        setItems,
        show,
        setShow,
        editItem,
        setEditItem,
        refreshList
    ] = useContext(ListContext);
    return [
        items,
        setItems,
        show,
        setShow,
        editItem,
        setEditItem,
        refreshList
    ] as const;
};
