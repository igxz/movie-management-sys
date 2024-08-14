import Express from 'express';
import multer from 'multer';
import path from 'path';
import { ResponseHelper } from './ResponseHelper';

const router = Express.Router();
const allowedExtension = ['.png', '.jpg'];

//configure the storage options
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../public/upload/'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extName = path.extname(file.originalname);
    const fileNameWithoutExt = path.basename(file.originalname, extName);
    cb(null, `${fileNameWithoutExt}_${uniqueSuffix}${extName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter: function (req, file, cb) {
    // To accept the file pass `true`
    const extName = path.extname(file.originalname);
    if (allowedExtension.includes(extName)) {
      cb(null, true);
    } else {
      cb(new Error('file format not supported!'));
    }
  },
}).single('imgfile');

router.post('/', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      ResponseHelper.sendError(err.message, res);
    } else {
        const fileUrl = `/upload/${req.file?.filename}`
      ResponseHelper.sendData(fileUrl, res);
    }
  });
});

export default router;
