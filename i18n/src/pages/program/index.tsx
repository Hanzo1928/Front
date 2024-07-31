import classNames from 'classnames/bind';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment } from 'react';

import { HorizontalDivider } from '@/components/horizontal-divider';
import { PageHeader } from '@/components/page-header';

import { PRESENTATIONS } from './constants';
import styles from './styles.module.css';
import {
    FormattedMessage,
    FormattedTime,
    IntlProvider,
    createIntl,
    createIntlCache,
} from 'react-intl';
import { Layout } from '@/components/layout';

const cx = classNames.bind(styles);

export const ProgramPage = ({
    locale,
    messages,
}: {
    locale: string;
    messages: Record<string, string>;
}) => {
    const cache = createIntlCache();
    const intl = createIntl({ locale, messages }, cache);

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Layout>
                <Head>
                    <title>
                        {intl.formatMessage(
                            {
                                id: 'programPage.title',
                                defaultMessage: 'Программа - I&L–{year}',
                            },
                            { year: 2024 },
                        )}
                    </title>
                </Head>

                <PageHeader
                    title={intl.formatMessage({
                        id: 'header.program',
                        defaultMessage: 'Программа',
                    })}
                />

                <section className={cx('program')}>
                    <div className={cx('program__text')}>
                        <FormattedTime value={new Date(2024, 7, 24, 21, 30, 0, 0)} />
                    </div>
                    <div className={cx('program__text', 'program__text_registration')}>
                        <FormattedMessage
                            id="programPage.registration"
                            defaultMessage={'Регистрация в офлайне'}
                        />
                    </div>

                    <HorizontalDivider className={cx('program__divider')} />

                    {PRESENTATIONS(locale, messages).map(
                        ({
                            time,
                            avatar,
                            name,
                            title,
                            presentationTitle,
                            presentationDescription,
                        }) => (
                            <Fragment key={presentationTitle}>
                                <div className={cx('program__text')}>{time}</div>

                                <div className={cx('program__card')}>
                                    <Image
                                        className={cx('program__card-avatar')}
                                        src={avatar}
                                        height={170}
                                        width={170}
                                        alt={name}
                                    />
                                    <div className={cx('program__card-text')}>{name}</div>
                                    <div className={cx('program__card-text')}>{title}</div>
                                </div>

                                <div>
                                    <div className={cx('program__text')}>{presentationTitle}</div>
                                    <div className={cx('program__description')}>
                                        {presentationDescription}
                                    </div>
                                </div>
                            </Fragment>
                        ),
                    )}
                </section>
            </Layout>
        </IntlProvider>
    );
};
