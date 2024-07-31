import evgeniyAntonovAvatar from 'public/avatars/evgeniy-antonov.jpg';
import igorBobrovAvatar from 'public/avatars/igor-bobrov.jpg';
import igorNafenovAvatar from 'public/avatars/igor-nafenov.jpg';
import { createIntl, createIntlCache } from 'react-intl';

export const SPEAKERS_DATA = (locale: string, messages: Record<string, string>) => {
    const cache = createIntlCache();
    const intl = createIntl({ locale, messages }, cache);

    return [
        {
            id: 1,
            avatar: igorBobrovAvatar,
            name: intl.formatMessage({
                id: 'speaker.igorBobrov.name',
                defaultMessage: 'Игорь Бобров',
            }),
            title: intl.formatMessage({
                id: 'speaker.igorBobrov.title',
                defaultMessage: 'CPO Alt IT',
            }),
            description: intl.formatMessage({
                id: 'speaker.igorBobrov.description',
                defaultMessage:
                    'Присоединился к Alt в 2015 году после окончания университета. Начал свою карьеру с разработки программного обеспечения и за несколько лет продвинулся от стажера до CPO',
            }),
        },
        {
            id: 2,
            avatar: evgeniyAntonovAvatar,
            name: intl.formatMessage({
                id: 'speaker.evgeniyAntonov.name',
                defaultMessage: 'Евгений Антонов',
            }),
            title: intl.formatMessage({
                id: 'speaker.evgeniyAntonov.title',
                defaultMessage: 'CTO Alt IT',
            }),
            description: intl.formatMessage({
                id: 'speaker.evgeniyAntonov.description',
                defaultMessage:
                    'Присоединился к Alt после окончания университета в 2018 году. Он был частью команды разработки, которая изучала инновационные методы локализации интерфейсов для различных культур',
            }),
        },
        {
            id: 3,
            avatar: igorNafenovAvatar,
            name: intl.formatMessage({
                id: 'speaker.igorNafenov.name',
                defaultMessage: 'Игорь Нафенов',
            }),
            title: intl.formatMessage({
                id: 'speaker.igorNafenov.title',
                defaultMessage: 'Technical Cluster Lead Alt IT',
            }),
            description: intl.formatMessage({
                id: 'speaker.igorNafenov.description',
                defaultMessage:
                    'Присоединился к Alt в 2010 году как старший разработчик. Провел исследования в области интернационализации веб-сайтов, что способствовало успешной адаптации продуктов к различным языкам и культурам',
            }),
        },
    ];
};
