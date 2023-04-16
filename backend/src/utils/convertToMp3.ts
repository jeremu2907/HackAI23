import path from 'path';
import { spawn } from 'child_process';
import { readdirSync } from 'fs';

const convertToMp3 = async (fileName: string) => {
    const uploads = path.join(__dirname, '../uploads/');
    const allFiles = readdirSync(uploads);
    const file = allFiles.find((file) => file.includes(fileName));
    // eslint-disable-next-line prettier/prettier
    const args = [
        '-i', path.join(uploads, file),
        '-vn',
        '-acodec', 'copy',
        `${path.join(uploads, fileName)}.mp3`,
    ];
    const ffmpeg = await spawn('ffmpeg', args);

    ffmpeg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
};

export default convertToMp3;
