import styles from './ingridients-item.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const IngridientsItem = ({element, type}) => {

    const obj = {
        'bun': 'Булки',
        'sauce': 'Соусы',
        'main': 'Начинки'
    }
    return (
        <article className={`${styles.box}`}>
            <h2 className="text text_type_main-large pt-10">{obj[type]}</h2>
            <ul className={`${styles.list}`}>
                {element.filter((item) => item.type === type)
                    .map((elem) => (
                        <li className={`${styles.item} mt-6 ml-4 mr-6`} key={elem._id}>
                            <img src={elem.image} alt={elem.name}/>
                            <div className={`${styles.price} pt-1 pb-1`}>
                                <p className="text text_type_digits-default mr-2">{elem.price}</p>
                                <CurrencyIcon/>
                            </div>
                            <p className="text text_type_main-default">{elem.name}</p>
                        </li>

                    ))
                }
            </ul>
        </article>
    )
}

export default IngridientsItem;