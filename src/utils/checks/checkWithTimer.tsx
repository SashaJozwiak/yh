import WebApp from "@twa-dev/sdk";

export const checkWithTimer = async (
    //userId: number,
    taskId: number,
    src: string,
    completeTask: (taskId: number) => void,
    setLoadBtn: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Запускаем таймер на кнопку загрузки
    setLoadBtn(true);

    // Переходим по ссылке
    console.log('link', `https://t.me/${src.slice(1)}`)
    if (taskId === 10) {
        window.open(`https://x.com/youhold_ton`, '_blank', 'noopener,noreferrer');
    } else {
        WebApp.openTelegramLink(`https://t.me/${src.slice(1)}`);
    }


    // Ждем 4 секунды
    setTimeout(async () => {
        // По окончании таймера отмечаем задачу как выполненную
        await completeTask(taskId);
        console.log('выполнено', taskId)
        console.log('setLoadBtn', setLoadBtn)

        // Отключаем кнопку загрузки
        setLoadBtn(false);
    }, 4000);
}
