export type Thing = {
    id?: string;
    title?: string;
    description: string;
    date: string;
    position: number;
    completed: boolean;
};

export type DropId = 'todo' | 'finish';
