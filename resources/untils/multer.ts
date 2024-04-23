import { log } from 'console';
import multer from 'multer';
import path from 'path';

const upload = function(){
        return multer({
            //temporary save
            storage: multer.memoryStorage(),
            fileFilter: (req, file, cb) => {
                
                let ext = path.extname(file.originalname);
                if (ext !== '.xlsx' && ext !== '.xls') {
                    cb(new Error('File type is not supported'));
                    return;
                }
                cb(null, true);
            },
        });
}
export default upload;