import React, { useState } from "react";
import styles from './profile.module.css';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Switch, Route } from "react-router-dom";

export const ProfilePage = () => {
	const [name, setName] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	//
	const onChangeName = e => {
		setPassword(e.target.value);
	};
	const onChangeLogin = e => {
		setLogin(e.target.value);
	};
	const onChangePassword = e => {
		setPassword(e.target.value);
	};
	return (
		<main>
			<menu>
				<li>
					<NavLink to='/'>
						<p>Профиль</p>
					</NavLink >
				</li>
				<li>
					<NavLink to='/'>
						<p>История заказов</p>
					</NavLink>
				</li>
				<li>
					<NavLink to='/'>
						<p>Выход</p>
					</NavLink>
				</li>
				<p>В этом разделе вы можете
					изменить свои персональные данные</p>
			</menu>
			<Switch>
				<Route>
			<form>
				<Input type={'text'} placeholder={'Имя'}  onChange={onChangeName} value={name} />
				<Input type={'email'} placeholder={'Логин'} onChange={onChangeLogin} value={login} />
				<PasswordInput onChange={onChangePassword} value={password} />
					</form>
					<div>
						<Button type="secondary" size="medium" >Отмена</Button>
						<Button type="primary" size="medium">Cохранить</Button>
					</div>
			</Route>
			</Switch>
		</main>
	)

}