import axios from 'axios';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useListContext } from '../../pages/list';
import { Thing } from '../../util/types';
import FormItem from '../FormItem';
import Input from '../Input';
import Label from '../Label';
import DatePicker from 'react-datepicker';

interface indexProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    editItem: Thing;
}

const index: React.FC<indexProps> = ({ editItem, showModal, setShowModal }) => {
    const [title, setTitle] = useState<string>(editItem.title);
    const [desc, setDesc] = useState<string>(editItem.description);
    const [date, setDate] = useState<Date>(
        dayjs(new Date(editItem.date)).toDate()
    );
    const [status, setStatus] = useState<boolean>(editItem.completed);
    const [items, setItems,,,,,refreshList] = useListContext();
    const reset = useCallback(() => {
        setTitle('');
        setDesc('');
        setDate(new Date());
        setStatus(false);
    }, []);
    useEffect(() => {
        setTitle(editItem.title);
        setDesc(editItem.description);
        setDate(dayjs(editItem.date).toDate());
        setStatus(editItem.completed);
    }, [editItem]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (title === '' || desc === '' || !dayjs(date).isValid()) {
            return;
        }
        try {
            edit();
            setShowModal(false);
            refreshList();
        } catch (e) {
            console.error(e);
        }
    };
    const edit = async () => {
        // console.log(status);
        try {
            const changedArray: Thing[] =
                status === true
                    ? Array.from(items.finished)
                    : Array.from(items.todos);
            const prefix = status === true ? 'finish' : 'todo';
            const addItem: Thing = {
                title,
                description: desc,
                date: dayjs(date).format('YYYY-MM-DD'),
                completed: status,
                position: editItem.position
            };
            console.log(addItem);
            const res = await axios.put(
                `http://localhost:8000/api/todos/${editItem.id}/`,
                addItem
            );
            console.log(res.data);
            // const backItem = res.data;
            // const retArray: Thing[] = changedArray.map(ele =>
            //     ele.id === editItem.id ? backItem : ele
            // );
            // const anotherArray: Thing[] =
            //     status === true
            //         ? Array.from(items.todos)
            //         : Array.from(items.finished);
            // if (prefix === 'todo') {
            //     setItems({
            //         todos: retArray,
            //         finished: anotherArray
            //     });
            // } else {
            //     setItems({
            //         todos: anotherArray,
            //         finished: retArray
            //     });
            // }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            {showModal ? (
                <>
                    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                        <div className='relative w-auto my-6 mx-auto max-w-sm'>
                            {/*content*/}
                            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                {/*header*/}
                                <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
                                    <h3 className='text-3xl font-semibold'>
                                        Edit Task
                                    </h3>
                                    <button
                                        className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className='relative p-6 flex-auto'>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='mx-4 content'
                                    >
                                        <FormItem>
                                            <Label htmlFor='task-name'>
                                                Name
                                            </Label>
                                            <Input
                                                id='task-name'
                                                value={title}
                                                onChange={e => {
                                                    e.stopPropagation();
                                                    setTitle(e.target.value);
                                                }}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label htmlFor='desc'>
                                                Description
                                            </Label>
                                            <Input
                                                id='desc'
                                                value={desc}
                                                onChange={e => {
                                                    e.stopPropagation();
                                                    setDesc(e.target.value);
                                                }}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label htmlFor='date'>Date</Label>
                                            <DatePicker
                                                selected={date}
                                                onChange={date => e => {
                                                    e.stopPropagation();
                                                    setDate(date as Date);
                                                }}
                                            />
                                        </FormItem>
                                        <FormItem col={false}>
                                            <Label htmlFor='status'>
                                                Finished
                                            </Label>
                                            <input
                                                id='status'
                                                type='checkbox'
                                                checked={status}
                                                onChange={e => {
                                                    e.stopPropagation();
                                                    setStatus(e.target.checked);
                                                }}
                                                className='self-center ml-2'
                                            />
                                        </FormItem>
                                        <button className='ml-auto block p-4 px-6 bg-green-500 rounded-lg text-white mt-2 hover:bg-blue-400 transition-all'>
                                            Save
                                        </button>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
                                    <button
                                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                                        type='button'
                                        style={{ transition: 'all .15s ease' }}
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    {/* <button
                                        className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                                        type='button'
                                        style={{ transition: 'all .15s ease' }}
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
                </>
            ) : null}
        </>
    );
};
export default index;
