import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LangSelect } from '@/components/lang-select';

import styles from './styles.module.css';
import { useIntl } from 'react-intl';

const cx = classNames.bind(styles);

export const Header = () => {
    const { pathname } = useRouter();
    const intl = useIntl();

    return (
        <header className={cx('header')}>
            <LangSelect />

            <nav>
                {[
                    {
                        href: '/',
                        text: intl.formatMessage({ id: 'header.main', defaultMessage: 'Главная' }),
                    },
                    {
                        href: '/buy-tickets',
                        text: intl.formatMessage({
                            id: 'header.buyTickets',
                            defaultMessage: 'Купить билеты',
                        }),
                    },
                    {
                        href: '/program',
                        text: intl.formatMessage({
                            id: 'header.program',
                            defaultMessage: 'Программа',
                        }),
                    },
                ].map(({ href, text }) => (
                    <Link key={href} href={href}>
                        <a
                            className={cx('navigation__link', {
                                navigation__link_active: pathname === href,
                            })}
                        >
                            {text}
                        </a>
                    </Link>
                ))}
            </nav>
        </header>
    );
};
