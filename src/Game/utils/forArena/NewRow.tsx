// useCardRowAnimation.ts
import { useState } from 'react';
import { ArenaCard } from '../../types/Arena';
import { generateCard } from '../../exmpl/arenaObjects';

interface UseCardRowAnimationProps {
    row1: ArenaCard[];
    row2: ArenaCard[];
    floor: number;
    setRow1: (row: ArenaCard[]) => void;
    setRow2: (row: ArenaCard[]) => void;
    setRow3: (row: ArenaCard[]) => void;
}

export const useCardRowAnimation = ({
    row1,
    row2,
    floor,
    setRow1,
    setRow2,
    setRow3,
}: UseCardRowAnimationProps) => {
    const [removingBottom, setRemovingBottom] = useState(false);
    const [slidingDown, setSlidingDown] = useState(false);
    const [newRowVisible/* , setNewRowVisible */] = useState(false);

    const animateRows = () => {
        setRemovingBottom(true);
        setSlidingDown(true);

        setTimeout(() => {
            const newRow1: ArenaCard[] = [
                { ...generateCard(floor), multiplier: 3 } as ArenaCard,
                { ...generateCard(floor), multiplier: 3 } as ArenaCard,
                { ...generateCard(floor), multiplier: 3 } as ArenaCard,
            ];

            console.log(row1)
            /* const newRow2: ArenaCard[] = [...row1];
            const newRow3: ArenaCard[] = [...row2]; */

            const newRow2: ArenaCard[] = row1.map((card) => ({
                ...card,
                multiplier: 2,
            }));

            const newRow3: ArenaCard[] = row2.map((card) => ({
                ...card,
                multiplier: 1,
            }));


            //copy снизу закомменченное

            setSlidingDown(false);
            setRow1(newRow1);
            //setNewRowVisible(true); //отсюда
            setRow2(newRow2);
            setRow3(newRow3);
            setRemovingBottom(false);


            //setNewRowVisible(true); //перемещенное сверху

            //прошлое решение

            /* setTimeout(() => {
                setSlidingDown(false);
                setRow1(newRow1);
                setNewRowVisible(true);
                setRow2(newRow2);
                setRow3(newRow3);
                setRemovingBottom(false);

                setTimeout(() => {
                    setNewRowVisible(false);
                }, 100);
            }, 250); */
        }, 500);
    };

    return { animateRows, removingBottom, slidingDown, newRowVisible };
};
