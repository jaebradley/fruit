import isJSON from 'is-json';
import deepMerge from 'deepmerge';

const mergeContent = ({ originalContent, additionalContent }) => {
  if (isJSON(additionalContent) && isJSON(originalContent)) {
    const mergedContent = deepMerge(
      JSON.parse(originalContent),
      JSON.parse(additionalContent),
    );
    return JSON.stringify(mergedContent, null, 2);
  }

  return `${originalContent}\n${additionalContent}`.trimLeft();
};

export default mergeContent;
