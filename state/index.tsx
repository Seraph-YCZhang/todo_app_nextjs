import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState
} from 'react';
import { Thing } from '../util/types';

interface AppState {
    todosAndSetTodos: [Thing[], React.Dispatch<React.SetStateAction<Thing[]>>];
    finishesAndSetFinishes: [
        Thing[],
        React.Dispatch<React.SetStateAction<Thing[]>>
    ];
}
export const AppStateContext = createContext<AppState>(null);
export const getItems = (count: number, todo: boolean, offset: number = 0) => {
    console.log('trigger');
    return Array.from({ length: count }, (v, k) => k).map(
        k =>
            ({
                name: 'Task ' + k,
                id: `item-${todo ? 'todo' : 'finished'}-${k}`,
                description: 'This is a mock data ' + k,
                date: `12/${parseInt('' + Math.random() * 10)}/2020`,
                status: todo ? 'to-do' : 'finished'
            } as Thing)
    );
};
export default function AppContext({ children }: React.PropsWithChildren<{}>) {
    const todosAndSetTodos = useState(getItems(10, true));
    const finishesAndSetFinishes = useState(getItems(10, false));
    return (
        <AppStateContext.Provider
            value={{ todosAndSetTodos, finishesAndSetFinishes }}
        >
            {children}
        </AppStateContext.Provider>
    );
}

export function useAppContext() {
    const { todosAndSetTodos, finishesAndSetFinishes } = useContext(
        AppStateContext
    );
    const [todos, setTodos] = todosAndSetTodos;
    console.log(todos);
    const [finished, setFinished] = finishesAndSetFinishes;
    return { todos, setTodos, finished, setFinished };
}
