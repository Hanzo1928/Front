import classNames from 'classnames/bind';

import TelegramIcon from '@/icons/telegram.svg';
import VkontakteIcon from '@/icons/vkontakte.svg';

import styles from './styles.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { BRAND_NAMES } from '@/shared/brand-names';

const cx = classNames.bind(styles);

export const Footer = () => {
    const intl = useIntl();
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div>
                    <div className={cx('footer-content__text')}>
                        <FormattedMessage
                            id="footer.errorReport"
                            defaultMessage={
                                'Если вы нашли ошибку, пожалуйста, <link>сообщите нам</link>'
                            }
                            values={{
                                link: chunks => <a href="#">{chunks}</a>,
                            }}
                        />
                    </div>

                    <div className={cx('footer-content__copyright')}>
                        <div className={cx('footer-content__text')}>
                            <FormattedMessage
                                id="footer.license"
                                defaultMessage={
                                    'Все материалы доступны по лицензии <link1>CC BY-NC 3.0</link1> с обязательным указанием © ООО «<link2>{brand}</link2>»'
                                }
                                values={{
                                    link1: chunks => <a href="#">{chunks}</a>,
                                    link2: chunks => <a href="#">{chunks}</a>,
                                    brand: BRAND_NAMES[intl.locale as keyof typeof BRAND_NAMES],
                                }}
                            />
                        </div>
                        <div className={cx('footer-content__text')}>
                            <FormattedMessage
                                id="footer.copyright"
                                defaultMessage={
                                    '© {yearStart}–{yearEnd}, ООО «<link>{brand}</link>»'
                                }
                                values={{
                                    link: chunks => <a href="#">{chunks}</a>,
                                    yearStart: 2019,
                                    yearEnd: 2024,
                                    brand: BRAND_NAMES[intl.locale as keyof typeof BRAND_NAMES],
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('footer-content__social')}>
                    <div className={cx('footer-content__text')}>
                        <FormattedMessage id="footer.subscribe" defaultMessage={'Подпишитесь'} />
                    </div>

                    <div className={cx('footer-content__social-links')} data-testid="social-icons">
                        {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                            <a key={index} href="#">
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
