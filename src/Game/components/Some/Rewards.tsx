import empty from '../../assets/Game/empty.jpg'


export const Rewards = ({ id }: { id: number }) => {
    return (
        id === 2001 ? (
            <h1>UH</h1>
        ) : id === 2002 ? (
            <h1>UH</h1>
        ) : id === 2003 ? (
            <span style={{ color: 'green', fontSize: '2vh' }}><span style={{ fontSize: '4vh' }}>🟢</span><br /> 50 B</span >
        ) : id === 2004 ? (
            <img width={50} height='50vh' src={empty} alt="empty card pic" />
        ) : null
    )
}
