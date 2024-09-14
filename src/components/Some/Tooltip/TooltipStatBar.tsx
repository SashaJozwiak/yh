import { CSSProperties, useState } from "react";

export const Tooltip = ({ speed, swichLang, userLang }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const handleToggleTooltip = () => {
        setTooltipVisible(!isTooltipVisible);

        setTimeout(() => {
            setTooltipVisible(false);
        }, 2000);
    };

    return (
        <div style={{ position: "relative", display: "inline-block", margin: 'auto auto 0 auto' }}>


            <div onClick={handleToggleTooltip} style={{ margin: 'auto', marginTop: '0.02rem' }}>
                <p style={{ color: 'lightgray', fontSize: '0.9rem', whiteSpace: 'nowrap', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={22} height={22} style={{ position: 'absolute', right: '20', top: '-20' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </p>

                <p style={{ textWrap: 'nowrap', fontSize: '1.2rem', fontWeight: 'bold', color: 'rgb(25, 180, 21)' }}> {speed.toFixed(2)}/{swichLang(userLang, 'hours')}</p>
            </div>

            {
                isTooltipVisible && (
                    <div style={tooltipStyle} onClick={handleToggleTooltip}>
                        {swichLang(userLang, 'speed_tooltip')}
                    </div>
                )
            }
        </div >
    );
};

const tooltipStyle: CSSProperties = {
    position: "absolute",
    top: "-235%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgb(51 65 85)",
    color: "#fff",
    padding: "8px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    border: "1px solid white",
    zIndex: 1000,
    fontSize: "0.8rem",
};

//export default Tooltip;
