import evgeniyAntonovAvatar from 'public/avatars/evgeniy-antonov.jpg';
import igorBobrovAvatar from 'public/avatars/igor-bobrov.jpg';
import igorNafenovAvatar from 'public/avatars/igor-nafenov.jpg';
import { createIntl, createIntlCache } from 'react-intl';

export const PRESENTATIONS = (locale: string, messages: Record<string, string>) => {
    const cache = createIntlCache();
    const intl = createIntl({ locale, messages }, cache);

    return [
        {
            time: intl.formatTime(new Date(2024, 7, 24, 21, 40, 0, 0)),
            avatar: igorBobrovAvatar,
            name: intl.formatMessage({
                id: 'speaker.igorBobrov.name',
                defaultMessage: 'Игорь Бобров',
            }),
            title: intl.formatMessage({
                id: 'speaker.igorBobrov.title',
                defaultMessage: 'CPO Alt IT',
            }),
            presentationTitle: intl.formatMessage({
                id: 'speaker.igorBobrov.presentationTitle',
                defaultMessage:
                    '«Международные вызовы и препятствия при разработке и запуске продуктов»',
            }),
            presentationDescription: intl.formatMessage({
                id: 'speaker.igorBobrov.presentationDescription',
                defaultMessage:
                    'Международные вызовы и препятствия при разработке и запуске продуктов включают культурные различия, локализацию и маркетинговые аспекты',
            }),
        },
        {
            time: intl.formatTime(new Date(2024, 7, 24, 22, 0, 0, 0)),
            avatar: evgeniyAntonovAvatar,
            name: intl.formatMessage({
                id: 'speaker.evgeniyAntonov.name',
                defaultMessage: 'Евгений Антонов',
            }),
            title: intl.formatMessage({
                id: 'speaker.evgeniyAntonov.title',
                defaultMessage: 'CTO Alt IT',
            }),
            presentationTitle: intl.formatMessage({
                id: 'speaker.evgeniyAntonov.presentationTitle',
                defaultMessage:
                    '«Адаптация интерфейса под различные культурные и языковые особенности»',
            }),
            presentationDescription: intl.formatMessage({
                id: 'speaker.evgeniyAntonov.presentationDescription',
                defaultMessage:
                    'Адаптация интерфейса под различные культурные и языковые особенности включает в себя изменения, чтобы соответствовать предпочтениям и потребностям пользователей',
            }),
        },
        {
            time: intl.formatTime(new Date(2024, 7, 24, 22, 45, 0, 0)),
            avatar: igorNafenovAvatar,
            name: intl.formatMessage({
                id: 'speaker.igorNafenov.name',
                defaultMessage: 'Игорь Нафенов',
            }),
            title: intl.formatMessage({
                id: 'speaker.igorNafenov.title',
                defaultMessage: 'Technical Cluster Lead Alt IT',
            }),
            presentationTitle: intl.formatMessage({
                id: 'speaker.igorNafenov.presentationTitle',
                defaultMessage: '«Процессы разработки с учетом интернационализации и локализации»',
            }),
            presentationDescription: intl.formatMessage({
                id: 'speaker.igorNafenov.presentationDescription',
                defaultMessage:
                    'Интеграция процессов интернационализации и локализации в цикл разработки помогает снизить риски, улучшить качество продукта и повысить его конкурентоспособность',
            }),
        },
    ];
};
