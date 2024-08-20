import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Task, UseTasks } from '../types/stores';
import { useUserData } from './main';

export const useTasks = create<UseTasks>()(devtools((set) => ({
    activeFriends: {
        id: 0,
        title: 'Active Friends',
        price: 150,
        completed: true,
        src: 'https:',
        type: 'permanent',
        timer: null,
    },
    dailyReward: {
        id: 0,
        title: 'Daily Reward',
        completed: false,
        price: 10,
        src: '',
        type: 'permanent',
        timer: null,
    },
    tasks: [
    ],
    completeTask: async (taskId: number) => {
        /* const task = get().tasks.find((task: Task) => task.id === taskId); */
        const internalId = useUserData.getState().user.internalId;
        const getAllTasks = useTasks.getState().getAllTasks;
        console.log('taskId: ', taskId)

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/completeTask`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    internalId: internalId, taskId: taskId
                }),
            })

            if (!response.ok) {
                throw new Error('complete task failed');
            }

            const data = await response.json();
            console.log('complete task: ', data)

            await getAllTasks(internalId);

        } catch (e) {
            console.error('error complete task: ', e)
        }

        /* set((state) => (
            {
                tasks: state.tasks.map((task: Task) => task.id === id ? { ...task, completed: true } : task),
            }
        )); */
    },
    getAllTasks: async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks?userId=${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error('get all tasks failed');
            }

            const data = await response.json();
            const updatedTasks = data.map((task: Task) => {
                if (task.title === 'Active Friends') {
                    return { ...task, completed: true };
                }
                return task;
            });

            console.log('all tasks: ', updatedTasks);

            const activeFriendsTask = updatedTasks.find((task: Task) => task.title === 'Active Friends');
            const dailyRewardTask = updatedTasks.find((task: Task) => task.title === 'Daily Reward');

            set(() => ({
                activeFriends: activeFriendsTask /* || {
                    id: 0,
                    title: 'Active Friends',
                    price: 150,
                    completed: true,
                    src: 'https:',
                    type: 'permanent',
                } */,
                dailyReward: dailyRewardTask /* || {
                    id: 0,
                    title: 'Daily Reward',
                    completed: false,
                    price: 10,
                    src: '',
                    type: 'permanent',
                } */,
                tasks: updatedTasks.filter((task: Task) => task.title !== 'Active Friends' && task.title !== 'Daily Reward'),
            }));

        } catch (e) {
            console.error('error get all tasks: ', e)
        }
    }
})))
