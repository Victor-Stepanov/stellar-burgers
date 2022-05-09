import burgerConstructorStyles from './burger-constructor.module.css'
import {DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ingredients}) => {
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
                <ul className={burgerConstructorStyles.list}>
                    {
                        ingredients.filter((item) => item.type !== 'bun')
                            .map((element, index) => (
                                <li className={burgerConstructorStyles.item} key={index}>
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
                <Button type="primary">Оформить заказ</Button>
            </div>
        </section>

    )
}


export default BurgerConstructor;