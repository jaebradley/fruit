import fse from 'fs-extra';
import mustache from 'mustache';

import mergeContent from '../mergeContent';

const writeTemplateFile = async ({ location, destination, templateValues = {} }) => {
  await Promise.all([
    fse.ensureFile(location),
    fse.ensureFile(destination),
  ]);

  const [destinationContents, locationContents] = await Promise.all([
    fse.readFile(destination, 'utf8'),
    fse.readFile(location, 'utf8'),
  ]);

  const newContent = mergeContent({
    originalContent: destinationContents,
    additionalContent: mustache.render(locationContents, templateValues),
  });

  await fse.writeFile(destination, newContent, 'utf8');
};

export default writeTemplateFile;
