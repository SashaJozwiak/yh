import s from './top10.module.css'

export const Top10Inv = ({ top10 }) => {
    const emptyRowsCount = 10 - top10.length;

    return (
        <div className={`${s.list} scrollable`}>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Active Friends</th>
                        <th>Reward</th>
                    </tr>
                </thead>
                <tbody>
                    {top10.map((item, index) => (
                        <tr key={index}>
                            <td>{item.username}</td>
                            <td>{item.active_friends_count}</td>
                            <td>{/* Здесь можно добавить логику для отображения награды */}</td>
                        </tr>
                    ))}
                    {Array.from({ length: emptyRowsCount }).map((_, index) => (
                        <tr key={`empty-${index}`}>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
