import Handlebars from 'handlebars';

import fs from 'fs';

export async function renderResume(data: any) {
  const template = await fs.promises.readFile(
    'pdf/templates/resume.html',
    'utf8'
  );

  return Handlebars.compile(template)(data);
}
