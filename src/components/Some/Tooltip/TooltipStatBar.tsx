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
        <div style={{ position: "relative", display: "inline-block", margin: '0 auto', alignContent: 'center' }}>

            <div onClick={handleToggleTooltip} style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <p style={{ textWrap: 'nowrap', fontSize: '1rem', fontWeight: 'bold', color: 'rgb(22 163 74)', borderBottom: '1px solid rgb(22 163 74)' }}>{speed.toFixed(2)}/{swichLang(userLang, 'hours')}<span style={{ position: 'relative', fontSize: '0.6rem', marginBottom: '0.5rem', bottom: '0.6rem', color: 'gray' }}>&#63;</span></p>
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
    top: "-110%",
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
