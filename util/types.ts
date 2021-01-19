export type Thing = {
    id: string;
    name?: string;
    description: string;
    date: string;
    status: 'to-do' | 'finished';
};

export type DropId = 'todo' | 'finish';
