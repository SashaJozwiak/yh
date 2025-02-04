
export const HoldTW = () => {

    return (
        <ul style={{ overflowY: 'auto', paddingBottom: '1rem', margin: '0.6rem', border: '1px solid', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
            <li style={{ marginBottom: "0.5rem", padding: '0.3rem 0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgb(58 70 88)', borderTop: '1px solid gray', borderBottom: '1px solid gray' }}>
                <div>
                    <div>
                        UHS
                    </div>
                    <img style={{ borderRadius: '50%' }} src='https://cache.tonapi.io/imgproxy/O50xd6OBiMr9BT0yxOPhICp4tKiIHa-ahtuzFcxBEv0/rs:fill:200:200:1/g:no/aHR0cHM6Ly91aHNwZWVkLmdpdGh1Yi5pby91aHMvdWhzXzI1NngyNTZfNS5wbmc.webp' width={50} alt="" />
                </div>

                <div>
                    <span style={{ fontSize: '1.1rem' }}>Balance</span>
                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                        1235.45
                    </div>
                </div>

                <div>
                    <span style={{ fontSize: '1.1rem' }}>Range</span>
                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                        50 - 100000
                    </div>
                </div>

                <div>
                    <span style={{ fontSize: '1.1rem' }}>APY</span>
                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                        10%
                    </div>
                </div>

                <div>
                    <span style={{ fontSize: '1.1rem' }}>Reward</span>
                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                        35.48
                    </div>
                </div>



                {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button style={{ backgroundColor: 'rgb(71, 85, 105)', border: '1px solid gray', borderRadius: '0.3rem', marginBottom: '0.5rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}>deposit</button>
                    <button style={{ backgroundColor: 'rgb(71, 85, 105)', border: '1px solid gray', borderRadius: '0.3rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}>withdraw</button>
                </div> */}
            </li>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>info</div>
                <button>claim</button>
            </div>

        </ul>
    )
}
