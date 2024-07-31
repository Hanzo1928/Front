import { pick } from 'accept-language-parser';
import type { NextRequest } from 'next/server';

export const availableLangs = ['en', 'ru', 'ar'];

export function getLang(req: { headers: NextRequest['headers']; cookies: NextRequest['cookies'] }) {
    let lang;
    const langFromUrl = req.cookies.get('i18n-l10n-conf-lang');
    if (langFromUrl && availableLangs.includes(langFromUrl)) {
        lang = langFromUrl;
    }

    const acceptLanguage = req.headers.get('accept-language');
    const langFromHeader = acceptLanguage ? pick(availableLangs, acceptLanguage) : null;
    if (!lang && langFromHeader) {
        lang = langFromHeader;
    }

    lang ||= 'en';

    return lang;
}
