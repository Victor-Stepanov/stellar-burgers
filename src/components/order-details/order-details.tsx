import React, { FC } from 'react';
import OrderDetailsStyle from './order-details.module.css';
import done from '../../images/done.png';
import { useAppSelector} from "../../hooks/hooks";
import Loader from '../loader/loader';

const OrderDetails:FC = () => {
    const { number } = useAppSelector(store => store.orderNumberData.order)

    return (
        <>
            {!number && <Loader />}
            <h3 className={`${OrderDetailsStyle.number} text text_type_digits-large mt-30`}>{number}</h3>
            <p className={`${OrderDetailsStyle.text} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</p>
            <img className={OrderDetailsStyle.icon} src={done} alt="done" />
            <p className={`${OrderDetailsStyle.text} text text_type_main-default mt-15 mb-2`}>Ваш заказ начали
                готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной
                станции</p>

        </>

    )

}

export default OrderDetails;

