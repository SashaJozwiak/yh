import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Task, UseTasks } from '../types/stores';

export const useTasks = create<UseTasks>()(devtools((set) => ({
    tasks: [
        {
            id: 1,
            title: 'Subs. YouHold',
            price: 150,
            completed: false,
            src: 'https://t.me/youhold',
            type: 'native',
        },
        {
            id: 2,
            title: 'Invite 1 friend',
            price: 150,
            completed: false,
            src: '',
            type: 'native',
        },
        {
            id: 3,
            title: 'Invite 3 friends',
            price: 500,
            completed: false,
            src: '',
            type: 'native',
        },
        {
            id: 4,
            title: 'Invite 10 friends',
            price: 2000,
            completed: false,
            src: '',
            type: 'native',
        },
        {
            id: 5,
            title: 'YouHold dev',
            price: 150,
            completed: false,
            src: '',
            type: 'affiliate',
        }
    ],
    completeTask: (id: number) => {
        set((state) => (
            {
                tasks: state.tasks.map((task: Task) => task.id === id ? { ...task, completed: true } : task),
            }
        ));
    }
})))
