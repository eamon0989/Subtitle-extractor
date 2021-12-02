import fs from 'fs';
const data: string = fs.readFileSync('subs.srt', 'utf8');
const lines: string[] = data.split('\r\n');
const sentences: string[] = lines.filter(line => {
  return /[a-zA-Z]/.test(line)
})

console.log(sentences)