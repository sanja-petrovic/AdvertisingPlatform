import fs from 'fs';
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const imagePath = '/../../../client/src/assets';
export function upload(base64Image = null) {
    var jsonPath = path.join(__dirname, '..', '..', 'client', 'src', 'assets');
    const path2 = `${jsonPath}/${Date.now()}.png`;
    const base64Data = base64Image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(path2, base64Data, {encoding: 'base64'});

    return path2;
}
