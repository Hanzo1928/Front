import classNames from 'classnames/bind';
import { FC, ReactNode } from 'react';

import AltLogoIcon from '@/icons/alt-logo.svg';

import styles from './styles.module.css';
import { FormattedMessage, useIntl } from 'react-intl';

const cx = classNames.bind(styles);

interface PageHeaderProps {
    title: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({ title }) => {
    const intl = useIntl();

    return (
        <header className={cx('header')}>
            <h1 className={cx('header__title')}>{title}</h1>

            <div className={cx('header__subtitle')}>
                <AltLogoIcon />
                <h2 className={cx('header__subtitle-text')}>
                    <FormattedMessage
                        id="pageHeader.subtitle"
                        defaultMessage={'I&L–{year}'}
                        values={{
                            year: 2024,
                        }}
                    />
                </h2>
            </div>
        </header>
    );
};
