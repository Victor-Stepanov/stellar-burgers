import React, { FC } from "react";
import styles from './loader.module.css';

const Loader:FC = ():JSX.Element => {
	return (
		<div className={styles.loader}></div>
	)
}

export default Loader;