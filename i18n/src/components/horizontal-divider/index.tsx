import classNames from "classnames/bind";
import { FC } from "react";

import styles from "./styles.module.css";

const cx = classNames.bind(styles);

interface HorizontalDividerProps {
    className?: string;
}

export const HorizontalDivider: FC<HorizontalDividerProps> = ({ className }) => (
    <hr className={cx("horizontal-divider", className)} />
);
