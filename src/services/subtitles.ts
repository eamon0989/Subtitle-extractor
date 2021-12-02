export const parseText = (data: string): string => {
  const lines: string[] = data.split('\r\n');
  const sentences: string[] = lines.filter(line => {
    return /[a-zA-Z]/.test(line);
  });

  const text: string = sentences.join(' ').replace(/<.{0,2}>/g, '');

  return text;
};