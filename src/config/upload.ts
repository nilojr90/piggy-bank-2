import path from "path";
import multer from "multer";
import crypto from "crypto";

const uploadFolder = path.resolve(__dirname, "..", "..", "tmp");
// const csvFilePath = path.resolve(__dirname, 'import_template.csv');

export default {
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("HEX");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
