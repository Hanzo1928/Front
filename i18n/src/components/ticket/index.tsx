import classNames from "classnames/bind";
import { FC, ReactNode } from "react";

import styles from "./styles.module.css";

const cx = classNames.bind(styles);

interface TicketProps {
    id: string;
    title: ReactNode;
    price: number;
    description: ReactNode;
    vip?: boolean;
    defaultChecked?: boolean;
    onChange?: (price: number) => void;
}

export const Ticket: FC<TicketProps> = ({
    id,
    title,
    price,
    description,
    onChange,
    vip = false,
    defaultChecked = false,
}) => (
    <label className={cx("ticket", { ticket_vip: vip })} htmlFor={id}>
        <div className={cx("ticket__wrapper")}>
            <div className={cx("ticket__title")}>{title}</div>

            <input
                className={cx("ticket__input")}
                type="radio"
                id={id}
                name="ticket"
                defaultChecked={defaultChecked}
                onChange={() => onChange?.(price)}
            />
        </div>

        <div className={cx("ticket__description")}>{description}</div>
    </label>
);
