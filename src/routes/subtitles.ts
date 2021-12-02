import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { parseText } from '../services/subtitles';

const upload = multer({ 
  dest: 'uploads/', 
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype !== 'application/x-subrip') {
  //     return cb(new Error('File is not allowed, subtitles only please!'));
  //   }
  
  //   cb(null, true);
  // }
}).single('subtitles');
  
const router = express.Router();

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  upload(req, res, async (error) => {
    console.log(req.file);
    console.log(error);
    if (error instanceof multer.MulterError) {
      console.log('instance');
      res.send(error);
    } else if (error) {
      res.send('File is not allowed, subtitles only please!');
    } else {
      const path: string | undefined = req.file?.path;
      const data: string = await fs.readFile(`${path}`, 'utf8');
      const text = parseText(data);
      
      res.send(text);
    
      // fs.unlink(`${path}`).catch(err => console.log(err));
    }
  });
});

router.get('/', (req, res) => {
  res.send('get request successful');
});

export default router;