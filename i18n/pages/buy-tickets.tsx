import { BuyTicketsPage } from '@/pages/buy-tickets';
import type { NextApiRequest } from 'next/types';

export default BuyTicketsPage;

export async function getServerSideProps({ locale }: { req: NextApiRequest; locale: string }) {
    const messagesModule = await import(`../src/pages/buy-tickets/locale/${locale}.json`);
    const messages = messagesModule.default;

    return {
        props: {
            locale,
            messages,
        },
    };
}
