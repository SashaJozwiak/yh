
export const Team1 = () => {
    return (
        <>
            <div style={{ overflowY: 'auto', marginTop: '0.5rem', marginBottom: '5rem' }}>
                <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                    <li
                        style={{ padding: '0.6rem 0.6rem 0.6rem 0.6rem', listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
                                <h3 style={{ color: 'gray' }}>Current work</h3>
                                <p>Support and development by YouHold app</p>
                            </div>

                            <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
                                <h3 style={{ color: 'gray' }}>Status</h3>
                                <p>in work</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div >
        </>
    )
}
