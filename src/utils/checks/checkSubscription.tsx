import WebApp from "@twa-dev/sdk";

const checkSubFetch = async (userId: number, chatId: string) => {
    //const botToken = import.meta.env.VITE_SECRET_BOT_TOKEN;
    //console.log(userId, chatId)
   /*  try {
        const url = new URL(`https://api.telegram.org/bot${botToken}/getChatMember`);
        url.searchParams.append('chat_id', chatId);
        url.searchParams.append('user_id', userId.toString());

        const response = await fetch(url.toString(), {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const chatMemberStatus = data.result.status;

        return chatMemberStatus === 'member' || chatMemberStatus === 'administrator' || chatMemberStatus === 'creator';
    } catch (error) {
        console.error('Error checking channel membership:', error);
        return false;
    } */
    try {
        const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}tasks/checkSub?userId=${userId}&chatId=${chatId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data.isMember;
    } catch (error) {
        console.error('Error checking channel membership:', error);
        return false;
    }
}


export const checkSubscription = async (
    userId: number,
    taskId: number,
    src: string,
    completeTask: (taskId: number) => void) => {
    const isMember = await checkSubFetch(userId, src);
    //console.log(isMember);
    if (isMember) {
        await completeTask(taskId)
    } else {
        //window.location.href = `https://t.me/${src.slice(1)}`
        WebApp.openTelegramLink(`https://t.me/${src.slice(1)}`)
    }
}
