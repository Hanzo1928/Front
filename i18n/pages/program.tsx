import { ProgramPage } from '@/pages/program';
import type { NextApiRequest } from 'next/types';

export default ProgramPage;

export async function getServerSideProps({ locale }: { req: NextApiRequest; locale: string }) {
    const messagesModule = await import(`../src/pages/program/locale/${locale}.json`);
    const messages = messagesModule.default;

    return {
        props: {
            locale,
            messages,
        },
    };
}
