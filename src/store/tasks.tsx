import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Task, UseTasks } from '../types/stores';

export const useTasks = create<UseTasks>()(devtools((set) => ({
    tasks: [
        {
            id: 1,
            title: 'Subscribe YouHold channel',
            price: 150,
            completed: false,
            src: 'https://t.me/youhold',
        },
        {
            id: 2,
            title: 'Invite 1 friend',
            price: 150,
            completed: false,
            src: '',
        },
        {
            id: 3,
            title: 'Invite 3 friends',
            price: 600,
            completed: false,
            src: '',
        },
        {
            id: 4,
            title: 'Invite 10 friends',
            price: 2500,
            completed: false,
            src: '',
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
