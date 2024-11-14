import { useEffect, useState } from 'react';
import s from './top.module.css'
import { useGameNav } from '../../state/gameNav';
import { useTopHeroes } from '../../state/top';
import { useUserData } from '../../../store/main';
//import { swichLang } from '../../utils/lang';

export const Top = () => {
    const [close, setClose] = useState<boolean>(false);
    const setNav = useGameNav(state => state.setPageNav);

    const myId = useUserData(state => state.user.internalId)
    const userLang = useUserData(state => state.user.languageCode)
    const topList = useTopHeroes(state => state.topList);
    const isLoading = useTopHeroes(state => state.isLoading);
    const fetchTopList = useTopHeroes(state => state.fetchTopList);

    const handleClose = () => {
        setClose(true);
        setTimeout(() => {
            setNav('main');
            //setClose(false);
        }, 500);
    }

    useEffect(() => {
        if (topList.length === 0) {
            fetchTopList();
        }

    }, [fetchTopList, topList.length])

    console.log('toplist: ', topList)

    return (
        <div className={`${s.container} ${close ? s.containerclosing : null}`}>
            {/* <header>
                <h2>TOP</h2>
            </header> */}

            {isLoading ? <span className={s.loader}></span> :
                <table style={{ borderSpacing: '0 1vh' }}>
                    <thead>
                        <tr>
                            <th>{userLang === 'ru' ? 'Место' : 'Place'}</th>
                            <th>{userLang === 'ru' ? 'ТОП' : 'TOP'}</th>
                            <th>{userLang === 'ru' ? 'Дом' : 'House'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topList.map((hero, indx) => (
                            <tr key={hero.user_id} style={{ fontSize: `${3 - indx * 0.05}vh`, marginBottom: '3vh' }}>
                                <td>{indx + 1}</td>
                                <td style={{ fontWeight: myId === +(hero.user_id) ? 'bold' : 'normal' }}>{hero.username}</td>
                                <td>{hero.house}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            <button className={s.btn} /* style={{ height: '5vh' }} */ onClick={handleClose}>{userLang === 'ru' ? 'закрыть' : 'close'}</button>
        </div>
    )
}
