import styles from './ingridients-item.module.css';
import {DragIcon,ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';

const IngridientsItem = ({ingredients}) => (
    <ul className={styles.list}>
        {
            ingredients.filter((item) => item.type !== 'bun')
                .map((element, index) => (
                    <li className={styles.item} key={index}>
                        <DragIcon/>
                        <ConstructorElement
                            text={element.name}
                            price={element.price}
                            thumbnail={element.image}
                        />
                    </li>
                ))
        }
    </ul>

)
export default IngridientsItem;
