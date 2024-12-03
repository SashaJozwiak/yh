
import s from './withdrawpopup.module.css'
import { CalcData } from './CabData';
import { useEffect, useState } from 'react';
import { useUserData } from '../../../store/main';
import { usePartners } from '../../../store/partners';
interface WithdrawProps {
    //latestPurchaseDate: string | null | undefined; // Дата последней покупки
    /* onWithdraw: () => void; */ // Функция для обработки вывода средств
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
    calcData: CalcData | null;
    languageCode: string;
}


export const WithdrawPopUp: React.FC<WithdrawProps> = ({ /* onWithdraw,  */setPopUp, calcData, languageCode }) => {

    const user_id = useUserData(state => state.user.internalId);
    const uf_addres = useUserData(state => state.user.userFriendlyAddress);

    const withdrawn = usePartners(state => state.withdraw);
    const createWithdraw = usePartners(state => state.createWithdraw)

    const [sum, setSum] = useState(0);
    const [checked, setChecked] = useState(false);
    const [address, setAddress] = useState<string>('')

    useEffect(() => {
        if (calcData) {
            setSum((((calcData.stats.houseAbove10 * 0.06) + (calcData.stats.balanceAbove500HouseBelow10 * 0.04) + ((calcData.stats.totalUsers - calcData.stats.balanceAbove500HouseBelow10 - calcData.stats.houseAbove10) * 0.02) + (calcData.stats.totalPurchasesSum * 0.0020)) - (withdrawn > 0 ? withdrawn : 0)))
        }

        if (uf_addres) {
            setAddress(uf_addres);
        }
    }, [calcData, uf_addres, withdrawn])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setAddress(e.target.value) };

    const onWithdraw = () => {
        setChecked(false);
        createWithdraw(user_id, sum, address);
        setPopUp(false);
    }

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                setPopUp(false);
            }}
            className={s.container}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    //setPopUp(false);
                }}
                className={s.window}>
                <h2>Withdraw</h2>

                <h2>{Math.round(sum * 100) / 100} USDT</h2>

                <div className={s.inputform}>
                    Address for withdraw:
                    <input
                        value={address}
                        onChange={handleChange}
                        className={s.input}
                        required={true}
                        type="text" />
                </div>


                <div>
                    <input
                        onChange={() => setChecked(!checked)}
                        type="checkbox" id="scales" name="scales" checked={checked} />
                    <label htmlFor="scales"> {languageCode === 'ru' ? 'Отказываюсь участвовать в аллокации ' : 'I refuse to participate in the allocation'}</label>
                </div>



                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1vh 1vh' }}>
                    <button
                        onClick={() => setPopUp(false)}
                        style={{/*  display: 'flex', position: 'absolute', bottom: '1vh', left: '1vh', */ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: '1', }}
                    >{'Cancel'}
                    </button>

                    <button
                        onClick={onWithdraw}
                        disabled={!checked}

                        style={{ /* display: 'flex', position: 'absolute', bottom: '1vh', right: '1vh', */ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: !checked ? '0.5' : '1' }}
                    >{'Withdraw'}
                    </button>
                </div>
            </div>
        </div>
    )
}
