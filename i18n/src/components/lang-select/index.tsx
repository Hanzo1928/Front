import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';

import DoneIcon from '@/icons/done.svg';
import EarthIcon from '@/icons/earth.svg';

import styles from './styles.module.css';
import { useClickOutside } from './use-click-outside';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

const LANGUAGES: Record<string, string> = {
    ru: 'Русский',
    en: 'English',
    ar: 'اَلْعَرَبِيَّةُ',
};

export const LangSelect = () => {
    const { pathname } = useRouter();
    const { locale } = useIntl();

    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClose = useCallback(() => {
        setShowMenu(false);
    }, []);

    const handleMenuToggle = useCallback(() => {
        setShowMenu(prevShowMenu => !prevShowMenu);
    }, []);

    const langSelectRef = useClickOutside<HTMLDivElement>(handleMenuClose);

    return (
        <div className={cx('lang-select')} ref={langSelectRef}>
            <button
                className={cx('lang-select__button')}
                onClick={handleMenuToggle}
                data-testid="lang-select-button"
            >
                <span className={cx('lang-select__text')}>{LANGUAGES[locale]}</span>
                <EarthIcon />
            </button>

            {showMenu && (
                <ul className={cx('lang-select__menu')} data-testid="lang-select-menu">
                    {Object.entries(LANGUAGES).map(([lang, langName]) => (
                        <Link
                            key={lang}
                            locale={lang}
                            href={pathname}
                            className={cx('lang-select__menu-item-text')}
                        >
                            <li className={cx('lang-select__menu-item')} onClick={handleMenuClose}>
                                <span className={cx('lang-select__menu-item-text')}>
                                    {langName}
                                </span>
                                {lang === locale && <DoneIcon />}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};
