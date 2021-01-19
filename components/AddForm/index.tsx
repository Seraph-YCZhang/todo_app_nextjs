import React, { useCallback, useState } from 'react';
import { useListContext } from '../../pages/list';
import { Thing } from '../../util/types';
import Input from '../Input';
import Label from '../Label';
import FormItem from '../FormItem';
import { default as dayjs } from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface indexProps {}

const index: React.FC<indexProps> = ({}): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [status, setStatus] = useState<boolean>(false);
    const [items, setItems] = useListContext();
    const reset = useCallback(() => {
        setName('');
        setDesc('');
        setDate(new Date());
        setStatus(false);
    }, []);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name === '' || desc === '' || !dayjs(date).isValid()) {
            return;
        }
        try {
            addItem();
            reset();
        } catch (e) {
            console.error(e);
        }
    };
    const addItem = () => {
        // console.log(status);
        const changedArray: Thing[] =
            status === true
                ? Array.from(items.finished)
                : Array.from(items.todos);
        const prefix = status === true ? 'finish' : 'todo';
        const addItem: Thing = {
            name,
            id: prefix + ' ' + Date.now(),
            description: desc,
            date: dayjs(date).format('DD/MM/YYYY'),
            status: status === true ? 'finished' : 'to-do'
        };
        const retArray: Thing[] = [...changedArray, addItem];
        const anotherArray: Thing[] =
            status === true
                ? Array.from(items.todos)
                : Array.from(items.finished);
        if (prefix === 'todo') {
            setItems({
                todos: retArray,
                finished: anotherArray
            });
        } else {
            setItems({
                todos: anotherArray,
                finished: retArray
            });
        }
    };
    return (
        <div
            className='w-96 border border-gray-500 rounded-lg p-4 pb-8'
            style={{ height: 'fit-content' }}
        >
            <h3 className='text-2xl mb-2 p-4' style={{ color: '3f3844' }}>
                Create a new Task
            </h3>
            <form onSubmit={handleSubmit} className='mx-4 content'>
                <FormItem>
                    <Label htmlFor='task-name'>Name</Label>
                    <Input
                        id='task-name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormItem>
                <FormItem>
                    <Label htmlFor='desc'>Description</Label>
                    <Input
                        id='desc'
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </FormItem>
                <FormItem>
                    <Label htmlFor='date'>Date</Label>
                    <DatePicker
                        selected={date}
                        onChange={date => setDate(date)}
                    />
                </FormItem>
                <FormItem col={false}>
                    <Label htmlFor='status'>Finished</Label>
                    <input
                        id='status'
                        type='checkbox'
                        checked={status}
                        onChange={e => setStatus(e.target.checked)}
                        className='self-center ml-2'
                    />
                </FormItem>
                <button className='p-4 px-6 bg-blue-500 rounded-lg text-white mt-2 hover:bg-blue-400 transition-all'>
                    Create
                </button>
            </form>
        </div>
    );
};

export default index;
