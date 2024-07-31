import classNames from 'classnames/bind';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import map from 'public/images/map.jpg';
import { useCallback } from 'react';

import { Button } from '@/components/button';
import { HorizontalDivider } from '@/components/horizontal-divider';
import { SpeakerCard } from '@/components/speaker-card';
import BoxIcon from '@/icons/box.svg';
import ConfLogoIcon from '@/icons/conf-logo.svg';
import MagnifyingGlassIcon from '@/icons/magnifying-glass.svg';
import MapArrowIcon from '@/icons/map-arrow.svg';
import SatelliteIcon from '@/icons/satellite.svg';
import AltLogoIcon from '@/icons/alt-logo.svg';

import { SPEAKERS_DATA } from './constants';
import styles from './styles.module.css';
import {
    FormattedDate,
    FormattedMessage,
    IntlProvider,
    createIntl,
    createIntlCache,
} from 'react-intl';
import { Layout } from '@/components/layout';

const cx = classNames.bind(styles);

export const MainPage = ({
    locale,
    messages,
}: {
    locale: string;
    messages: Record<string, string>;
}) => {
    const router = useRouter();
    const handleBuyTickets = useCallback(() => router.push('/buy-tickets'), [router]);
    const cache = createIntlCache();
    const intl = createIntl({ locale, messages }, cache);

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Layout>
                <Head>
                    <title>
                        {intl.formatMessage(
                            {
                                id: 'mainPage.title',
                                defaultMessage:
                                    'Международная конференция по интернационализации и локализации - I&L–{year}',
                            },
                            { year: 2024 },
                        )}
                    </title>
                </Head>

                <header className={cx('header')}>
                    <h2 className={cx('header__title')}>
                        <FormattedMessage
                            id="mainPage.header.title1"
                            defaultMessage={'Интернационализация'}
                        />
                    </h2>

                    <div className={cx('header__container-wrapper')}>
                        <div className={cx('header__container')}>
                            <h2 className={cx('header__title', 'header__container-title')}>
                                <FormattedMessage
                                    id="mainPage.header.title2"
                                    defaultMessage="Локализация"
                                />
                            </h2>
                            <h2 className={cx('header__title', 'header__container-date')}>
                                <FormattedDate value={new Date(2024, 8, 21)} />
                            </h2>
                            <Button
                                className={cx('header__container-button')}
                                onClick={handleBuyTickets}
                            >
                                <FormattedMessage
                                    id="mainPage.buyTickets"
                                    defaultMessage="Купить билеты"
                                />
                            </Button>
                            <AltLogoIcon
                                className={cx('header__container-logo')}
                                data-testid="alt-logo"
                            />
                        </div>

                        <ConfLogoIcon className={cx('header__logo')} data-testid="conf-logo" />
                    </div>
                </header>

                <section className={cx('section')}>
                    <h1 className={cx('section__title')}>
                        <span className={cx('section__title_accent')}>
                            <FormattedMessage
                                id="mainPage.section.title"
                                defaultMessage={
                                    '<accent>I&L–{year}</accent> — {br} международная конференция по интернационализации и локализации для профессионалов в IT'
                                }
                                values={{
                                    year: 2024,
                                    br: <br />,
                                    accent: content => (
                                        <span className={cx('section__title_accent')}>
                                            {content}
                                        </span>
                                    ),
                                }}
                            />
                        </span>
                    </h1>

                    <div className={cx('section__content')}>
                        <p className={cx('section__content-description')}>
                            <FormattedMessage
                                id="mainPage.section.description"
                                defaultMessage="Мы рады приветствовать вас на нашей конференции, где вы сможете поделиться своим опытом, узнать о последних тенденциях и лучших практиках в области интернационализации и локализации"
                            />
                        </p>

                        <HorizontalDivider className={cx('section__content-divider')} />
                    </div>
                </section>

                <section className={cx('section')}>
                    <h3 className={cx('section__title')}>
                        <FormattedMessage id="mainPage.speakers.title" defaultMessage={'Спикеры'} />
                    </h3>

                    <div className={cx('speakers', 'section__content')}>
                        {SPEAKERS_DATA(locale, messages).map(
                            ({ id, avatar, name, title, description }) => (
                                <SpeakerCard
                                    key={id}
                                    avatar={avatar}
                                    name={name}
                                    title={title}
                                    description={description}
                                />
                            ),
                        )}
                    </div>
                </section>

                <section className={cx('section')}>
                    <h3 className={cx('section__title')}>
                        <FormattedMessage
                            id="mainPage.opportunities.title"
                            defaultMessage={'Это отличная возможность, чтобы:'}
                        />
                    </h3>

                    <div
                        className={cx('opportunities', 'section__content')}
                        data-testid="opportunities-icons"
                    >
                        {[
                            {
                                description: (
                                    <FormattedMessage
                                        id="mainPage.opportunities.methodologies"
                                        defaultMessage={'Исследовать новые методологии'}
                                    />
                                ),
                                invert: false,
                                Icon: MagnifyingGlassIcon,
                            },
                            {
                                description: (
                                    <FormattedMessage
                                        id="mainPage.opportunities.problems"
                                        defaultMessage={
                                            'Рассмотреть актуальные проблемы и поиски путей их решения'
                                        }
                                    />
                                ),
                                invert: locale === 'ar',
                                Icon: MapArrowIcon,
                            },
                            {
                                description: (
                                    <FormattedMessage
                                        id="mainPage.opportunities.innovations"
                                        defaultMessage={
                                            'Получить опыт внедрения инновационных подходов'
                                        }
                                    />
                                ),
                                invert: locale === 'ar',
                                Icon: SatelliteIcon,
                            },
                            {
                                description: (
                                    <FormattedMessage
                                        id="mainPage.opportunities.practice"
                                        defaultMessage={'Опробовать полученные знания на практике'}
                                    />
                                ),
                                invert: locale === 'ar',
                                Icon: BoxIcon,
                            },
                        ].map(({ description, Icon, invert }, idx) => (
                            <div className={cx('opportunities__item')} key={idx}>
                                <Icon style={invert ? { transform: 'scale(-1,1)' } : undefined} />
                                <div className={cx('opportunities__item-description')}>
                                    {description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={cx('section')}>
                    <h3 className={cx('section__title')}>
                        <FormattedMessage
                            id="mainPage.venue.title"
                            defaultMessage={'Место проведения'}
                        />
                    </h3>

                    <div className={cx('section__content')}>
                        <p className={cx('section__content-address')}>
                            <FormattedMessage
                                id="mainPage.venue.address"
                                defaultMessage={
                                    'Собираемся в офисе наших друзей: {br} Россия, Москва, улица Льва Толстого, 16'
                                }
                                values={{
                                    br: <br />,
                                }}
                            />
                        </p>

                        <div className={cx('section__content-map')}>
                            <Image
                                src={map}
                                alt={intl.formatMessage({
                                    id: 'mainPage.venue.mapAlt',
                                    defaultMessage: 'Карта с обозначением места проведения',
                                })}
                            />
                        </div>

                        <Button
                            className={cx('section__content-button')}
                            onClick={handleBuyTickets}
                        >
                            <FormattedMessage
                                id="mainPage.buyTickets"
                                defaultMessage="Купить билеты"
                            />
                        </Button>
                    </div>
                </section>
            </Layout>
        </IntlProvider>
    );
};
