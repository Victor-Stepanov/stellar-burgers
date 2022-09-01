import React from "react";
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import notf from '../../images/notf.svg';
import { useSelector } from "react-redux";


export const NotFound404 = () => {
  const user = useSelector(store => store.userData?.user?.user)
  
  let title = !user ? 'Boddy':user.name;
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.subtitle}>Error 404</p>
        <h3 className={styles.title}>{`Hey ${title}` }</h3>
        <p className={styles.description}>
          We can’t seem to find
          the page you are looking for.
        </p>
        <Link className={styles.link} to={{ pathname: '/' }}>
          <span className={styles.linkText}>Go Home</span>
        </Link>
      </div>
      <div className={styles.imgbox}>
        <img className={styles.img} src={notf} alt="приведение" />
        <span className={styles.test}></span>
      </div>
    </div>
  )
}