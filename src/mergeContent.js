import isJSON from 'is-json';
import deepMerge from 'deepmerge';

const mergeContent = ({ originalContent, additionalContent }) => {
  if (isJSON(additionalContent) && isJSON(originalContent)) {
    return JSON.stringify(deepMerge.merge(JSON.parse(originalContent), JSON.parse(additionalContent)));
  }

  return `${originalContent}\n${additionalContent}`.trim();
};

export default mergeContent;
