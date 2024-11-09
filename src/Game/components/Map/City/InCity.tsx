//import React from 'react'
//import { useEffect, useState/* , useRef */ } from "react";

import s from './incity.module.css'

export const InCity = ({ setCity }) => {

    return (
        <div
            onClick={() => setCity(false)}
            className={s.container}>InCity
        </div>
    )
}
