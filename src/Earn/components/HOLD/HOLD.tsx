import { Plus, Question } from "../../svgs";


export const HOLD = () => {
    return (
        <div style={{ overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between'/* , border: '1px solid' */ }}>
                <button style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div><Question /></div>
                    <div>info</div>
                </button>
                <div style={{ margin: 'auto' }}>NAVIGATION</div>
                <button style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div><Plus /></div>
                    <div>add</div>
                </button>
            </div>
        </div>
    )
}
