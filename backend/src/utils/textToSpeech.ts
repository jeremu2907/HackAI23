import splitText from './splitText';
import { request } from 'undici';

const getAudioUrl = (text: string) => {
    const url = new URL('https://translate.google.com/translate_tts');

    const params = {
        ie: 'UTF-8',
        q: text,
        tl: 'en',
        total: 1,
        idx: 0,
        textlen: text.length,
        client: 'tw-ob',
        prev: 'input',
        ttsspeed: 1,
    };

    for (const key in params) url.searchParams.append(key, params[key]);

    return url.toString();
};

export const getAllAudioUrls = async (text: string): Promise<Buffer> => {
    const allURLs = splitText(text).map((shortText) => ({
        url: getAudioUrl(shortText),
    }));

    const result = [];

    for (let i = 0; i < allURLs.length; i++) {
        const res = await request(allURLs[i].url);
        const buf = await res.body.arrayBuffer();
        result.push(buf);
    }
    return Buffer.concat(result);
};
