const MyCarAnimation = () => {
    return (
        <svg
            width="550"
            height="149"
            viewBox="0 0 550 149"
            style={{ backgroundColor: "gray" }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <filter id="blur-filter-light" x="-1" y="-1" width="10" height="10">
                <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
            </filter>
            <g transform="scale(0.90) translate(0 -120)" id="myCar">
                <rect
                    x="50"
                    y="40"
                    width="210"
                    height="35"
                    fill="lightgray"
                    strokeWidth="5"
                    stroke="rgb(51, 65, 85)"
                    rx="3"
                />
                <g>
                    <rect
                        x="50"
                        y="70"
                        width="210"
                        height="35"
                        fill="rgb(75, 94, 121)"
                        strokeWidth="5"
                        stroke="rgb(75, 94, 121)"
                        rx="3"
                    />
                    <rect x="259" y="70" width="5" height="15" fill="yellow" rx="5" />
                    <polygon
                        points="450,90 267,80 450,60"
                        fill="yellow"
                        filter="url(#blur-filter-light)"
                    />
                    <text
                        x="60"
                        y="82"
                        fill="white"
                        fontSize="1.2em"
                        fontFamily="Monospace"
                    >
                        YouHold Intercity Bus
                    </text>
                </g>
                <g>
                    <line x1="80" x2="80" y1="40" y2="70" />
                    <line x1="110" x2="110" y1="40" y2="70" />
                    <line x1="140" x2="140" y1="40" y2="70" />
                    <line x1="170" x2="170" y1="40" y2="70" />
                    <line x1="200" x2="200" y1="40" y2="70" />
                    <line x1="230" x2="230" y1="40" y2="70" />
                </g>
                <g>
                    <circle
                        cx="75"
                        cy="105"
                        r="15"
                        fill="gray"
                        stroke="black"
                        strokeWidth="3"
                    />
                    <rect width="10" height="4" x="70" y="104" rx="3" fill="white" />
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 75 105;360 75 105"
                        dur="1s"
                        repeatCount="30"
                    />
                </g>
                <g>
                    <circle
                        cx="110"
                        cy="105"
                        r="15"
                        fill="gray"
                        stroke="black"
                        strokeWidth="3"
                    />
                    <rect width="10" height="4" x="105" y="104" rx="3" fill="white" />
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 110 105;360 110 105"
                        dur="1s"
                        repeatCount="30"
                    />
                </g>
                <g>
                    <circle
                        cx="225"
                        cy="105"
                        r="15"
                        fill="gray"
                        stroke="black"
                        strokeWidth="3"
                    />
                    <rect width="10" height="4" x="220" y="104" rx="3" fill="white" />
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 225 105;360 225 105"
                        dur="1s"
                        repeatCount="30"
                    />
                </g>
            </g>
            <path
                id="carPath"
                style={{ fill: "none", stroke: "white", strokeWidth: "1px" }}
                d="m 0,147.8636 612.74654,0.53454"
            />
            <animateMotion xlinkHref="#myCar" begin="0s" dur="30s" repeatCount="none">
                <mpath xlinkHref="#carPath" />
            </animateMotion>
        </svg>
    );
};

export default MyCarAnimation;
