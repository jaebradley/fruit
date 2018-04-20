import path from 'path';

import writeTemplateDirectoryFiles from './writeTemplateDirectoryFiles';

const writeBaseTemplates = async ({ destination, templateValues }) =>
  writeTemplateDirectoryFiles({
    destination,
    templateValues,
    location: path.join(__dirname, '../templates/base'),
  });

const writeCommitlintTemplates = async ({ destination }) =>
  writeTemplateDirectoryFiles({
    destination,
    location: '../templates/base',
  });

export {
  writeBaseTemplates,
  writeCommitlintTemplates,
};
