import {rename} from "node:fs/promises";
import * as path from "node:path";

import { UPLOAD_DIR } from "../constants/index.js";

export const saveFileToUploadsDir = async (file, folder)=> {
    const newPath = path.join(UPLOAD_DIR, folder, file.filename);
    await rename(file.path, newPath);
}
