import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs-menu.module.css';
import {useState, useEffect} from 'react';

const TabsMenu = () => {
    const [current, setCurrent] = useState('bun')
    //TODO:Можно лучше, когда будет время(
    //const scrollCategory = () => document.getElementsByName(current).scrollIntoView({ behavior: "smooth" });
    //useEffect(scrollCategory, [current]);
    return (
        <nav className={styles.nav}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </nav>
    )
}

export default TabsMenu;