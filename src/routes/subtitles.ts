import express from 'express';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('subtitles'), (req, res) => {
  console.log(req.file);
  if (req.file?.mimetype === 'application/x-subrip') {
    const path = req.file?.path;
    const data: string = fs.readFileSync(`${path}`, 'utf8');
    const lines: string[] = data.split('\r\n');
    const sentences: string[] = lines.filter(line => {
      return /[a-zA-Z]/.test(line);
    });
    console.log(sentences.length);
    console.log(sentences.join(' '));
    res.send(sentences.join(' '));
  } else {
    res.send('Subtitle files only please!');
  }

});

router.get('/', (req, res) => {
  res.send('get request successful');
});

export default router;