import React, { FC } from "react";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink, Link, useHistory } from "react-router-dom";

const AppHeader: FC = (): JSX.Element => {
    const history = useHistory();
    let path = history.location.pathname;
    return (
        <header className={`${appHeaderStyles.header} `}>
            <nav className={appHeaderStyles.navigation}>
                <div className={appHeaderStyles.box}>
                    <menu className={appHeaderStyles.menuItems}>
                        <li className={`${appHeaderStyles.menuItem} pt-4 pb-4 pl-5 pr-2`}>
                            <NavLink
                                exact
                                className={appHeaderStyles.link}
                                activeClassName={appHeaderStyles.linkActive}
                                to={{ pathname: "/" }}
                            >
                                <BurgerIcon type={path === "/" ? "primary" : "secondary"} />
                                <span className="text text_type_main-default pl-2">
                                    Конструктор
                                </span>
                            </NavLink>
                        </li>
                        <li className={`${appHeaderStyles.menuItem} pt-4 pb-4 pr-5`}>
                            <NavLink
                                exact
                                className={appHeaderStyles.link}
                                activeClassName={appHeaderStyles.linkActive}
                                to={{ pathname: "/feed" }}
                            >
                                <ListIcon type={path === "/feed" ? "primary" : "secondary"} />
                                <span className="text text_type_main-default pl-2">
                                    Лента заказов
                                </span>
                            </NavLink>
                        </li>
                    </menu>
                    <Link to={{ pathname: "/" }}>
                        <Logo />
                    </Link>
                </div>
                <menu className={appHeaderStyles.menuItems}>
                    <li className={`${appHeaderStyles.menuItem} pt-4 pb-4`}>
                        <NavLink
                            exact
                            className={appHeaderStyles.link}
                            activeClassName={appHeaderStyles.linkActive}
                            to={{ pathname: "/profile" }}
                        >
                            <ProfileIcon
                                type={path === "/profile" ? "primary" : "secondary"}
                            />
                            <span className="text text_type_main-default pl-2">
                                Личный кабинет
                            </span>
                        </NavLink>
                    </li>
                </menu>
            </nav>
        </header>
    );
};

export default AppHeader;
