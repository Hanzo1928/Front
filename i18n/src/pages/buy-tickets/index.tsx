import classNames from 'classnames/bind';
import Head from 'next/head';
import { useState } from 'react';

import { Button } from '@/components/button';
import { HorizontalDivider } from '@/components/horizontal-divider';
import { PageHeader } from '@/components/page-header';
import { Ticket } from '@/components/ticket';

import styles from './styles.module.css';
import { FormattedMessage, IntlProvider, createIntl, createIntlCache } from 'react-intl';
import { Layout } from '@/components/layout';

const cx = classNames.bind(styles);

export const BuyTicketsPage = ({
    locale,
    messages,
}: {
    locale: string;
    messages: Record<string, string>;
}) => {
    const cache = createIntlCache();
    const intl = createIntl({ locale, messages }, cache);

    const [selectedPrice, setSelectedPrice] = useState(2500);
    const [ticketCount, setTicketCount] = useState(1);

    const totalPrice = selectedPrice * ticketCount;

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Layout>
                <Head>
                    <title>
                        {intl.formatMessage(
                            {
                                id: 'buyTicketsPage.title',
                                defaultMessage: 'Купить билеты - I&L–{year}',
                            },
                            {
                                year: 2024,
                            },
                        )}
                    </title>
                </Head>

                <PageHeader
                    title={intl.formatMessage({
                        id: 'header.buyTickets',
                        defaultMessage: 'Купить билеты',
                    })}
                />

                <form className={cx('form')}>
                    <HorizontalDivider />

                    <fieldset className={cx('form__tickets')}>
                        <div className={cx('form__label')}>
                            <FormattedMessage
                                id="buyTicketsPage.chooseTicketType"
                                defaultMessage={'Выберите тип билета'}
                            />
                        </div>
                        <div className={cx('form__tickets-wrapper')}>
                            <Ticket
                                id="ticket-default"
                                title={
                                    <FormattedMessage
                                        id="buyTicketsPage.defaultTicket"
                                        defaultMessage={'Входной билет {br} {price}'}
                                        values={{
                                            price: intl.formatNumber(2500, {
                                                style: 'currency',
                                                currency: 'RUB',
                                            }),
                                            br: <br />,
                                        }}
                                    />
                                }
                                price={2500}
                                description={intl.formatMessage({
                                    id: 'buyTicketsPage.defaultTicketDescription',
                                    defaultMessage:
                                        'Простой входной билет предоставляет доступ на мероприятие и является вашим пропуском на конференцию',
                                })}
                                defaultChecked
                                onChange={setSelectedPrice}
                            />

                            <Ticket
                                vip
                                id="ticket-vip"
                                title={
                                    <FormattedMessage
                                        id="buyTicketsPage.vipTicket"
                                        defaultMessage={'VIP посещение {br} {price}'}
                                        values={{
                                            price: intl.formatNumber(15000, {
                                                style: 'currency',
                                                currency: 'RUB',
                                            }),
                                            br: <br />,
                                        }}
                                    />
                                }
                                price={15000}
                                description={intl.formatMessage({
                                    id: 'buyTicketsPage.vipTicketDescription',
                                    defaultMessage:
                                        'Получите дополнительный доступ к закрытым дискуссиям, личным встречам с ведущими экспертами',
                                })}
                                onChange={setSelectedPrice}
                            />
                        </div>
                    </fieldset>

                    <fieldset className={cx('form__inputs')}>
                        <label className={cx('form__inputs-label')}>
                            <div className={cx('form__label')}>
                                <FormattedMessage
                                    id="buyTicketsPage.name"
                                    defaultMessage={'Имя и фамилия'}
                                />
                            </div>
                            <input
                                className={cx('form__input')}
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: 'buyTicketsPage.namePlaceholder',
                                    defaultMessage: 'Введите имя и фамилию',
                                })}
                            />
                        </label>

                        <label className={cx('form__inputs-label')}>
                            <div className={cx('form__label')}>
                                {intl.formatMessage({
                                    id: 'buyTicketsPage.email',
                                    defaultMessage: 'Электронная почта',
                                })}
                            </div>
                            <input
                                className={cx('form__input')}
                                type="email"
                                placeholder="example@example.com"
                            />
                        </label>

                        <label className={cx('form__inputs-label')}>
                            <div className={cx('form__label')}>
                                {intl.formatMessage({
                                    id: 'buyTicketsPage.phoneNumber',
                                    defaultMessage: 'Номер телефона',
                                })}
                            </div>
                            <input className={cx('form__input', 'form__input_phone')} type="tel" />
                        </label>

                        <div className={cx('form__inputs-label')}>
                            <div className={cx('form__label')}>
                                {intl.formatMessage({
                                    id: 'buyTicketsPage.ticketCount',
                                    defaultMessage: 'Количество билетов',
                                })}
                            </div>
                            <div>
                                {[1, 2, 3, 4, 5, 6].map(count => (
                                    <div className={cx('form__tickets-count')} key={count}>
                                        <input
                                            className={cx('form__tickets-count-input')}
                                            type="radio"
                                            name="tickets"
                                            id={`tickets_${count}`}
                                            checked={count === ticketCount}
                                            onChange={() => setTicketCount(count)}
                                        />
                                        <label htmlFor={`tickets_${count}`}>
                                            {intl.formatNumber(count)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </fieldset>

                    <div className={cx('form__submit')}>
                        <Button type="button">
                            {intl.formatMessage(
                                {
                                    id: 'buyTicketsPage.pay',
                                    defaultMessage: 'Оплатить {totalPrice}',
                                },
                                {
                                    totalPrice: intl.formatNumber(totalPrice, {
                                        style: 'currency',
                                        currency: 'RUB',
                                    }),
                                },
                            )}
                        </Button>
                        <div className={cx('form__submit-description')}>
                            {intl.formatMessage({
                                id: 'buyTicketsPage.agreement',
                                defaultMessage:
                                    'Нажимая «Оплатить», вы соглашаетесь с условиями приобретения и офертой',
                            })}
                        </div>
                    </div>
                </form>
            </Layout>
        </IntlProvider>
    );
};
