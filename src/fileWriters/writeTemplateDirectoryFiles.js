import globby from 'globby';
import path from 'path';

import writeTemplateFile from './writeTemplateFile';

const writeTemplateDirectoryFiles = async ({ location, destination, templateValues = {} }) => {
  const files = await globby(location, { dot: true });
  files.forEach(async (file) => {
    const relativeFilePath = path.relative(location, file);
    const destinationFilePath = path.join(destination, relativeFilePath);
    await writeTemplateFile({
      templateValues,
      location: file,
      destination: destinationFilePath,
    });
  });
};

export default writeTemplateDirectoryFiles;
