import { useUserData } from "../../../../store/main"
export const Team2 = () => {
    const lang = useUserData(state => state.user.languageCode)
    return (
        <h2 style={{ color: 'lightgray', margin: '1rem' }}>
            {lang === 'ru' ? 'Команда 2 сейчас свободна' : 'Team 2 is free now'}
        </h2>
    )
}
