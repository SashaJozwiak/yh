import { useUserData } from "../../../../store/main"
export const Team2 = () => {
    const lang = useUserData(state => state.user.languageCode)

    {/* for empty render <h2 style={{ color: 'lightgray', margin: '1rem' }}>
            {lang === 'ru' ? 'Команда 2 сейчас свободна' : 'Team 2 is free now'}
        </h2> */}

    return (
        <div style={{ overflowY: 'auto', marginTop: '0.5rem', marginBottom: '5rem' }}>
            <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                <li
                    style={{ padding: '0.6rem 0.6rem 0.6rem 0.6rem', listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
                            <h3 style={{ color: 'gray' }}>Current work</h3>
                            <p>{lang === 'ru' ? `Игра "Balls"` : `"Balls" game`}</p>
                        </div>

                        <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
                            <h3 style={{ color: 'gray' }}>Status</h3>
                            <p style={{ color: 'rgb(22, 163, 74)' }}>in progress</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div >
    )
}
