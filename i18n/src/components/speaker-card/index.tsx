import classNames from "classnames/bind";
import Image, { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";

import styles from "./styles.module.css";

const cx = classNames.bind(styles);

interface SpeakerCardProps {
    avatar: StaticImageData;
    name: string;
    title: ReactNode;
    description: ReactNode;
}

export const SpeakerCard: FC<SpeakerCardProps> = ({ avatar, name, title, description }) => (
    <div className={cx("speaker-card")}>
        <Image
            className={cx("speaker-card__avatar")}
            src={avatar}
            height={315}
            width={315}
            alt={name}
            data-testid="speaker-card-avatar"
        />

        <div className={cx("speaker-card__name")}>{name}</div>
        <div className={cx("speaker-card__title")}>{title}</div>

        <div className={cx("speaker-card__description")}>{description}</div>
    </div>
);
