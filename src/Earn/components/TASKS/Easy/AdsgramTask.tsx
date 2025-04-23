import { useEffect, useRef } from "react";
import styles from "./task.module.css";
import { useUhsTasks } from "../../../earnStore/uhstasks";

interface TaskProps {
    debug: boolean;
    blockId: string;
    /*  timeLeft: number; */
}

export const AdsgramTask = ({ debug, blockId/* , timeLeft */ }: TaskProps) => {
    const taskRef = useRef<HTMLElement | null>(null);

    const { /* isOk, */ setAdTask, setIsOk } = useUhsTasks(state => state)

    useEffect(() => {
        const handler = (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log('reward event:', customEvent, customEvent.detail);
            setAdTask(true);
            //alert(`reward detail: ${customEvent.detail}`);
        };

        const noBanner = (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log(`Can't found banner for block: `, customEvent, customEvent.detail);
            setIsOk(false);
        };

        const onError = (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log(`Error during loading or render for block: `, customEvent, customEvent.detail);
            setIsOk(false);
        };

        const onTooLongSession = (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log(`The session is too long. Please restart the app to get ads: `, customEvent, customEvent.detail);
            setIsOk(false);
        };

        const task = taskRef.current;

        if (task /* && timeLeft <= 0 */) {
            task.addEventListener("reward", handler);
            task.addEventListener("onBannerNotFound", noBanner);
            task.addEventListener("onError", onError);
            task.addEventListener("onTooLongSession", onTooLongSession);
        }

        return () => {
            if (task) {
                task.removeEventListener("reward", handler);
                task.removeEventListener("onBannerNotFound", noBanner);
                task.removeEventListener("onError", onError);
                task.removeEventListener("onTooLongSession", onTooLongSession);
                setIsOk(true);
            }
        };
    }, [setAdTask, setIsOk]);

    if (!customElements.get("adsgram-task")) {
        return null;
    }

    console.log('taskRef:', taskRef)

    return (
        <adsgram-task
            className={styles.task}
            data-block-id={blockId}
            data-debug={debug}
            ref={taskRef}
        >
            <span slot="reward" /* className={styles.reward} */>
                +0.01 USDT
            </span>
            <div slot="button" style={{ width: '4rem', height: '1.6rem', alignContent: 'center', fontSize: '1rem', backgroundColor: 'rgb(30 150 23)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'/* , opacity: timeLeft <= 0 ? '1' : '0.5' */ }} /* className={styles.button} */>
                GO
            </div>
            <div slot="done" /* className={styles.button_done} */>
                DONE
            </div>
        </adsgram-task> 
    );
};
