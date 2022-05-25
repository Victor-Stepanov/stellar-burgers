import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs-menu.module.css';
import {useState, useEffect} from 'react';

const TabsMenu = () => {

    const [current, setCurrent] = useState('bun');

    const scrollCategory = (element) => document.querySelector(`#${element}`).scrollIntoView({behavior: "smooth"});

    return (
        <nav className={styles.nav}>
            <Tab value="bun" active={current === 'bun'} onClick={() => {
                setCurrent('bun');
                scrollCategory('bun')
            }}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={() => {
                setCurrent('sauce');
                scrollCategory('sauce')
            }}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={() => {
                setCurrent('main');
                scrollCategory('main')
            }}>
                Начинки
            </Tab>
        </nav>
    )
}

export default TabsMenu;