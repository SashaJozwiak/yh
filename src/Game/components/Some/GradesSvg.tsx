//import React from 'react'

export const GradesSvg = ({ color, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={stroke} /* fill={color} */ className="size-6" width={50}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" fill={color} />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 1 1 0 6 3 3 0 1 1 0-6Z" /* fill={color} */ />
        </svg>

    )
}
