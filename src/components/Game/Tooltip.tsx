import { CSSProperties, useState } from "react";

import { swichLang } from '../../lang/lang';
import { useUserData } from "../../store/main";

import s from './betapage1.module.css'

export const Tooltip = () => {
    const userLang = useUserData((state) => state.user.languageCode);
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const handleToggleTooltip = () => {
        setTooltipVisible(!isTooltipVisible);

        /* setTimeout(() => {
            setTooltipVisible(false);
        }, 10000); */
    };

    return (
        <div style={{ position: "relative", display: "inline-block", margin: '0 auto', alignContent: 'center' }}>

            {/* <div onClick={handleToggleTooltip} style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <p style={{ textWrap: 'nowrap', fontSize: '1rem', fontWeight: 'bold', color: 'rgb(22 163 74)', borderBottom: '1px solid rgb(22 163 74)' }}>{speed.toFixed(2)}/{swichLang(userLang, 'hours')}<span style={{ position: 'relative', fontSize: '0.6rem', marginBottom: '0.5rem', bottom: '0.6rem', color: 'gray' }}>&#63;</span></p>
            </div> */}

            {/* <h3
                onClick={handleToggleTooltip}
            >{swichLang(userLang, 'haveinwallet')}<span style={{ position: 'relative', fontSize: '0.6rem', marginBottom: '0.5rem', bottom: '0.6rem', color: 'gray' }}> &#63;</span></h3> */}

            <button
                onClick={handleToggleTooltip}
                className={s.info}>
                ?
            </button>

            {
                isTooltipVisible && (
                    <div style={tooltipStyle} onClick={handleToggleTooltip}>
                        {swichLang(userLang, 'beta_tooltip')}
                    </div>
                )
            }
        </div >
    );
};

const tooltipStyle: CSSProperties = {
    position: "absolute",
    top: "-30%",
    left: "50%",
    width: "80vw",
    transform: "translateX(-75%)",
    backgroundColor: "rgb(51 65 85)",
    color: "#fff",
    padding: "8px",
    borderRadius: "4px",
    //whiteSpace: "nowrap",
    border: "1px solid white",
    zIndex: 1000,
    fontSize: "0.9rem",
    fontWeight: "normal",
    //textWrap: "normal",
};
