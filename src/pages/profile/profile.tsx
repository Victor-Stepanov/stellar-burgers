import React, { FC } from "react";
import styles from "./profile.module.css";

import ProfileMenu from "./profile-menu/profile-menu";
import { ProfileForm } from "./profile-form/profile-form";

export const ProfilePage:FC = ():JSX.Element => (
	<div className={styles.container}>
		<ProfileMenu />
		<ProfileForm />
	</div>
)

