import React from 'react';
import s from './withdrawpopup.module.css'

interface InfoPopUpsProps {
    setisInfoPopUp: React.Dispatch<React.SetStateAction<boolean>>;
    languageCode: string;
}

export const InfoPopUps: React.FC<InfoPopUpsProps> = ({ setisInfoPopUp, languageCode }) => {
    const [code, setCode] = React.useState<string>('');
    const [check, setCheck] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);

    const checkCode = () => {
        setCheck(true)
        setError(false)
        setCode('Check in progress...');
        setTimeout(() => {
            setError(true);
            setCheck(false);
            setCode('');
        }, 1000)
    }

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                setisInfoPopUp(false);
            }}
            className={s.container}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    //setisInfoPopUp(false);
                }}
                className={s.window}>
                <h2>{languageCode === 'ru' ? 'Наследование' : 'Inheritance'}</h2>

                <p style={{ padding: '0.5rem', fontSize: '1rem' }}>{languageCode === 'ru' ? `Вы можете указать свой email, затем email вашего наследника и количество лет вашего бездействия в YouHold.` : `You can enter your email, then your heir's email and the number of years you have been inactive in YouHold.`}</p>
                ---
                <p style={{ padding: '0.5rem', fontSize: '1rem' }}>
                    {languageCode === 'ru' ? `Если вы будете бездействовать указанное количество лет, то на email наследника придет код, который он может ввести в форму ниже и получить все ваши активы на свой баланс.` : `If you remain inactive for this number of years, the heir will receive a code by email, which can be entered into the form below and all your assets will be transferred to your account.`}
                </p>
                ---

                <input
                    id="heir-email-input"
                    type="email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={languageCode === 'ru' ? 'У вас есть код?' : 'Do you have the code?'}
                    style={{
                        width: '60vw',
                        margin: '0 auto',
                        padding: '0.2rem',
                        border: '1px solid #ccc',
                        borderRadius: '0.25rem',
                        backgroundColor: '#2a2a2a',
                        color: 'white'
                    }}
                />

                {check && <p>...</p>}
                {error && <p style={{ color: 'red' }}>The code is incorrect</p>}



                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1vh 1vh' }}>
                    <button
                        onClick={() => setisInfoPopUp(false)}
                        style={{/*  display: 'flex', position: 'absolute', bottom: '1vh', left: '1vh', */ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: '1', }}
                    >{languageCode === 'ru' ? 'Отмена' : 'Cancel'}
                    </button>

                    <button
                        onClick={checkCode}
                        disabled={!code}

                        style={{ /* display: 'flex', position: 'absolute', bottom: '1vh', right: '1vh', */ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: code ? '1' : '0.5' }}
                    >{languageCode === 'ru' ? 'Получить' : 'Get'}
                    </button>
                </div>
            </div>
        </div>
    )
}
