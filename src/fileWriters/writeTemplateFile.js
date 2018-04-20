import fse from 'fs-extra';
import mustache from 'mustache';

import mergeContent from '../mergeContent';

const writeTemplateFile = ({ location, destination, templateValues = {} }) => {
  fse.ensureFileSync(location);
  fse.ensureFileSync(destination);

  const destinationContents = fse.readFileSync(destination, 'utf8');
  const locationContents = fse.readFileSync(location, 'utf8');

  const newContent = mergeContent({
    originalContent: destinationContents,
    additionalContent: mustache.render(locationContents, templateValues),
  });

  fse.writeFileSync(destination, newContent, 'utf8');
};

export default writeTemplateFile;
