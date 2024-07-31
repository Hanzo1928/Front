import classNames from "classnames/bind";
import { ButtonHTMLAttributes, FC } from "react";

import styles from "./styles.module.css";

const cx = classNames.bind(styles);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const Button: FC<ButtonProps> = ({ className, ...props }) => (
    <button {...props} className={cx("button", className)} />
);
