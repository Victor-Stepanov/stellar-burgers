import React, { useRef } from "react";
import IngridientsItemStyles from "./ingridients-item.module.css";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { moveItem } from "../../../../services/slice/constructorSlice";
import { useAppDispatch } from "../../../../hooks/hooks";
import { FC } from "react";
import { IIngridientsItem } from "./ingridients-item.props";

const IngridientsItem: FC<IIngridientsItem> = ({
    item,
    removeItem,
    index,
}) => {
    const { id } = item;
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLLIElement>(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: "element",
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "element",
        hover: (item: { index: number }, monitor) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverActualY =
                clientOffset !== null && clientOffset.y - hoverBoundingRect.top;

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            dispatch(moveItem({dragIndex, hoverIndex}));
            item.index = hoverIndex;
        },
    });
    const opacity = isDragging ? 0 : 1;

    dragRef(drop(ref));
    return (
        <ul className={IngridientsItemStyles.list}>
            <li className={IngridientsItemStyles.item} ref={ref} style={{ opacity }}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={removeItem}
                />
            </li>
        </ul>
    );
};

export default IngridientsItem;
