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
    adReward: {
        id: 0,
        title: 'Ad reward (soon)',
        completed: false,
        price: 0,
        src: '',
        type: 'permanent',
        timer: null,
        counter: 0,
    },
    tasks: [
    ],
    loadStatus: false,
    completeTask: async (taskId: number) => {
        const internalId = useUserData.getState().user.internalId;
        const getAllTasks = useTasks.getState().getAllTasks;

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}tasks/completeTask`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    internalId: internalId, taskId: taskId
                }),
            });

            if (!response.ok) {
                throw new Error('complete task failed');
            }

            await getAllTasks(internalId);

        } catch (e) {
            console.error('error complete task: ', e);
        }
    },
    completeAdTask: async (userId: number) => {
        const externalId = useUserData.getState().user.id;
        //const getAllTasks = useTasks.getState().getAllTasks;
        console.log('userId: ', userId)

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}adReward?userId=${externalId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('complete task failed');
            }

    //const newAdRewardData = await response.json();
    //console.log('newAdRewardData: ', newAdRewardData);


    /*  await getAllTasks(userId); */

        } catch (e) {
            console.error('error complete task: ', e);
        }
    },
    getAllTasks: async (userId: number) => {
        set({ loadStatus: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}tasks?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

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

            console.log('updated tasks: ', updatedTasks);

            const activeFriendsTask = updatedTasks.find((task: Task) => task.title === 'Active Friends');
            const dailyRewardTask = updatedTasks.find((task: Task) => task.title === 'Daily Reward');
            const adRewardTask = updatedTasks.find((task: Task) => task.id === 8);

            set(() => ({
                activeFriends: activeFriendsTask,
                dailyReward: dailyRewardTask,
                adReward: adRewardTask,
                tasks:
                    updatedTasks.filter((task: Task) => task.title !== 'Active Friends' && task.title !== 'Daily Reward' && task.id !== 8),
            }));

        } catch (e) {
            console.error('error get all tasks: ', e);
        } finally {
            set({ loadStatus: false });
        }
    }
})));
