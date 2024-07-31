import { MainPage } from '@/pages/main';

export default MainPage;

export async function getServerSideProps({ locale }: { locale: string }) {
    const messagesModule = await import(`../src/pages/main/locale/${locale}.json`);
    const messages = messagesModule.default;

    return {
        props: {
            locale,
            messages,
        },
    };
}
