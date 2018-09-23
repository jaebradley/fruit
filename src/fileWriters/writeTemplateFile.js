import fse from 'fs-extra';
import mustache from 'mustache';
import isJSON from 'is-json';

import {
  mergeYAMLContent,
  mergeJSONContent,
  mergeContent,
} from '../mergeContent';

const createNewContent = ({ destination, location, templateValues }) => {
  const destinationContents = fse.readFileSync(destination, 'utf8');
  const locationContents = fse.readFileSync(location, 'utf8');

  if (isJSON(destinationContents) && isJSON(locationContents)) {
    return mergeJSONContent({
      originalContent: destinationContents,
      additionalContent: mustache.render(locationContents, templateValues),
    });
  }

  if (isJSON(destinationContents) || isJSON(locationContents)) {
    return mergeContent({
      originalContent: destinationContents,
      additionalContent: mustache.render(locationContents, templateValues),
    });
  }

  if (destination.indexOf('yml') >= 0 && location.indexOf('yml') >= 0) {
    return mergeYAMLContent({
      originalYAMLFileLocation: destination,
      additionalYAMLFileLocation: location,
    });
  }

  return mergeContent({
    originalContent: destinationContents,
    additionalContent: mustache.render(locationContents, templateValues),
  });
};

const writeTemplateFile = ({ location, destination, templateValues = {} }) => {
  fse.ensureFileSync(location);
  fse.ensureFileSync(destination);

  const newContent = createNewContent({ destination, location, templateValues });

  fse.writeFileSync(destination, newContent, 'utf8');
};

export default writeTemplateFile;
