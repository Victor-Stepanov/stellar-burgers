import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import appHeaderStyles from './app-header.module.css';

const AppHeader = () =>
    (
        <header className={`${appHeaderStyles.header} `}>
            <nav className={appHeaderStyles.navigation}>
                <div className={appHeaderStyles.box}>
                    <menu className={appHeaderStyles.menuItems}>
                        <li className={`${appHeaderStyles.menuItem} pt-4 pb-4 pl-5 pr-2`}><a
                            className={appHeaderStyles.link}
                            href="#"><BurgerIcon type="primary"/><span
                            className="text text_type_main-default pl-2">Конструктор</span></a></li>
                        <li className={`${appHeaderStyles.menuItem} pt-4 pb-4 pr-5`}><a
                            className={appHeaderStyles.link} href="#"><ListIcon
                            type="secondary"/><span
                            className="text text_type_main-default text_color_inactive pl-2">Лента заказов</span></a>
                        </li>
                    </menu>
                    <Logo/>
                </div>
                <menu className={appHeaderStyles.menuItems}>
                    <li className={`${appHeaderStyles.menuItem} pt-4 pb-4`}><a
                        className={appHeaderStyles.link} href="#"><ProfileIcon type="secondary"/><span
                        className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</span></a>
                    </li>
                </menu>

            </nav>
        </header>
    )


export default AppHeader;