import React, {useCallback} from "react";
import styles from "./profile.module.css";
import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { sendUpdateUserData } from "../../services/actions/auth";
import useForm from '../../hooks/useForm';
import ProfileMenu from "./profile-menu/profile-menu";

export const ProfilePage = () => {
	
	const dispatch = useDispatch();
	const { user} = useSelector((store) => store.userData.user);
	const { values, handleChange, setValues } = useForm({ name: user.name, email: user.email, password: '' });
	
	const resetFormValue = () => {
		setValues({ name: user.name, email: user.email, password: '' })
	}

	
	const userUpdateDate = useCallback(
		e => {
			e.preventDefault();
			dispatch(sendUpdateUserData(values));
		},
		[values, dispatch]
	);


	return (
		<div className={styles.container}>
			<ProfileMenu />
			<form className={styles.form} onSubmit={userUpdateDate}>
				<div className="pt-6">
					<Input
						type={"text"}
						icon={"EditIcon"}
						placeholder={"Имя"}
						errorText={"Ошибка"}
						size={"default"}
						onChange={handleChange}
						value={values.name}
						name={"name"}
					/>
				</div>
				<div className="pt-6">
					<Input
						type={"email"}
						icon={"EditIcon"}
						placeholder={"Логин"}
						errorText={"Ошибка"}
						size={"default"}
						name={"email"}
						onChange={handleChange}
						value={values.email}
					/>
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput
						onChange={handleChange}
						value={values.password}
						name={"password"}
					/>
				</div>
				<div className={styles.buttons}>
					<Button onClick={resetFormValue} type="secondary" size="medium">
						Отмена
					</Button>
					<Button type="primary" size="medium">
						Cохранить
					</Button>
				</div>
			</form>
		</div>
	);
};
