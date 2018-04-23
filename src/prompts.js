import inquirer from 'inquirer';
import emailValidator from 'email-validator';
import validateNpmPackageName from 'validate-npm-package-name';
import isSemver from 'is-semver';

import isGitHubUsernameValid from './isGitHubUsernameValid';
import {
  PACKAGE_TYPES,
  PACKAGE_FEATURES,
} from './constants';

const prompts = async () => (
  inquirer.prompt([
    {
      name: 'packageType',
      message: 'Package Type',
      type: 'list',
      choices: [
        PACKAGE_TYPES.NODE,
        PACKAGE_TYPES.REACT,
      ],
    },
    {
      name: 'packageFeatures',
      message: 'Package Features',
      type: 'checkbox',
      choices: [
        PACKAGE_FEATURES.COMMITLINT,
        PACKAGE_FEATURES.SEMANTIC_RELEASE,
      ],
    },
    {
      name: 'packageName',
      message: 'Name of Package',
      type: 'input',
      validate: packageName => validateNpmPackageName(packageName).validForNewPackages || `${packageName} is an invalid package name`,
    },
    {
      name: 'packageDescription',
      message: 'Package description',
      type: 'input',
      validate: answer => answer && answer.length > 0,
    },
    {
      name: 'packageVersion',
      message: 'Package version',
      type: 'input',
      validate: answer => isSemver(answer) || `${answer} is an invalid package version`,
    },
    {
      name: 'targetDirectory',
      message: 'Where to create the package',
      type: 'input',
      validate: answer => answer && answer.length > 0,
    },
    {
      name: 'authorEmailAddress',
      message: 'Input your email address',
      type: 'input',
      validate: emailAddress => emailValidator.validate(emailAddress) || `${emailAddress} is an invalid email address`,
    },
    {
      name: 'gitHubUsername',
      message: 'Input your GitHub Username',
      type: 'input',
      validate: async (username) => {
        if (await isGitHubUsernameValid(username)) {
          return true;
        }

        return `${username} is an invalid GitHub username`;
      },
    },
  ])
);

export default prompts;
