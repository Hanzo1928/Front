import type { AppProps } from 'next/app';
import 'styles/globals.css';

import { Layout } from '@/components/layout';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

const localeToDirection: Record<string, string> = {
    ru: 'ltr',
    en: 'ltr',
    ar: 'rtl',
};

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const locale = router.locale ?? 'en';

    return (
        <IntlProvider locale={locale}>
            <div dir={localeToDirection[locale]}>
                <Component {...pageProps} />
            </div>
        </IntlProvider>
    );
}
