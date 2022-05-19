import burgerConstructorStyles from './burger-constructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsItem from '../burger-constructor/components/ingridients-item/ingridients-item.jsx';
import {ingredientPropType} from '../../utils/prop-types.js'
import PropTypes from 'prop-types';


const BurgerConstructor = ({ingredients, onClick}) => {
    return (
        <section className={`${burgerConstructorStyles.section} mt-25 `}>
            <div className={`${burgerConstructorStyles.box} ml-4`}>
                <div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${ingredients[0].name} (верх)`}
                        price={200}
                        thumbnail={ingredients[0].image}

                    />
                </div>
                <IngridientsItem ingredients={ingredients}/>
                <div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingredients[0].name} (низ)`}
                        price={200}
                        thumbnail={ingredients[0].image}

                    />
                </div>
            </div>
            <div className={`${burgerConstructorStyles.order} pt-10`}>
                <div className={`${burgerConstructorStyles.order} `}>
                    <p><span className="text text_type_digits-medium pr-2">610</span></p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" onClick={onClick}>Оформить заказ</Button>
            </div>
        </section>

    )
}

BurgerConstructor.propTypes = {
    ingredients:PropTypes.arrayOf(ingredientPropType),
    onclick:PropTypes.func
}


export default BurgerConstructor;