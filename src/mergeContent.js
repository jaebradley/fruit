import deepMerge from 'deepmerge';
import yamlMerge from '@alexlafroscia/yaml-merge';

const mergeContent = ({ originalContent, additionalContent }) => `${originalContent}\n${additionalContent}`.trimLeft();

const mergeYAMLContent = ({ originalYAMLFileLocation, additionalYAMLFileLocation }) => yamlMerge(
  originalYAMLFileLocation,
  additionalYAMLFileLocation,
);

const mergeJSONContent = ({ originalContent, additionalContent }) => JSON.stringify(
  deepMerge(
    JSON.parse(originalContent),
    JSON.parse(additionalContent),
  ),
  null,
  2,
);

export {
  mergeYAMLContent,
  mergeJSONContent,
  mergeContent,
};
