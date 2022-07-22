import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs-menu.module.css';
import { useState, useEffect } from 'react';

const TabsMenu = ({ inViewBuns, inViewSauces, inViewFilling }) => {

    const [current, setCurrent] = useState('bun');

    useEffect(() => {
        if (inViewBuns) {
            setCurrent("bun");
        } else if (inViewSauces) {
            setCurrent("sauce");
        } else if (inViewFilling) {
            setCurrent("main");
        }
    }, [inViewBuns, inViewFilling, inViewSauces]);


    const onTabClick = (current) => {
        setCurrent(current);
        const element = document.getElementById(current);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className={styles.nav}>
            <Tab value="bun" active={current === 'bun'} onClick={() => { onTabClick('bun') }}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={() => { onTabClick('sauce') }}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={() => { onTabClick('main') }}>
                Начинки
            </Tab>
        </nav>
    )
}

export default TabsMenu;