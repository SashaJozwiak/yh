import { useEffect, useRef } from "react";
import styles from "./task.module.css";

interface TaskProps {
    debug: boolean;
    blockId: string;
    /*  timeLeft: number; */
}

export const AdsgramTask = ({ debug, blockId/* , timeLeft */ }: TaskProps) => {
    const taskRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handler = (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log('reward event:', customEvent);
            //alert(`reward detail: ${customEvent.detail}`);
        };

        const task = taskRef.current;

        if (task /* && timeLeft <= 0 */) {
            task.addEventListener("reward", handler);
        }

        return () => {
            if (task) {
                task.removeEventListener("reward", handler);
            }
        };
    }, [/* timeLeft */]);

    if (!customElements.get("adsgram-task")) {
        return null;
    }

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
