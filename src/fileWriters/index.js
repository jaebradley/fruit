import path from 'path';

import writeTemplateDirectoryFiles from './writeTemplateDirectoryFiles';

const writeBaseTemplates = async ({ destination, templateValues }) => writeTemplateDirectoryFiles({
  destination,
  templateValues,
  location: path.join(__dirname, '../templates/core'),
});

const writeCommitlintTemplates = async ({ destination }) => writeTemplateDirectoryFiles({
  destination,
  location: path.join(__dirname, '../templates/commitlint'),
});

const writeSemanticReleaseTemplates = async ({ destination }) => writeTemplateDirectoryFiles({
  destination,
  location: path.join(__dirname, '../templates/semanticRelease'),
});

const writeReactTemplates = async ({ destination, templateValues }) => writeTemplateDirectoryFiles({
  destination,
  templateValues,
  location: path.join(__dirname, '../templates/react'),
});

const writeNodeTemplates = async ({ destination, templateValues }) => writeTemplateDirectoryFiles({
  destination,
  templateValues,
  location: path.join(__dirname, '../templates/node'),
});

export {
  writeBaseTemplates,
  writeCommitlintTemplates,
  writeSemanticReleaseTemplates,
  writeReactTemplates,
  writeNodeTemplates,
};
