import inquirer from 'inquirer';
import emailValidator from 'email-validator';
import validateNpmPackageName from 'validate-npm-package-name';

const prompts = async () => (
  inquirer.prompt([
    {
      name: 'packageName',
      message: 'Name of Package',
      type: 'input',
      validate: packageName => validateNpmPackageName(packageName).validForNewPackages,
    },
    {
      name: 'packageDescription',
      message: 'Package description',
      type: 'input',
      validate: answer => answer && answer.length > 0,
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
      validate: emailAddress => emailValidator.validate(emailAddress),
    },
    {
      name: 'gitHubUsername',
      message: 'Input your GitHub Username',
      type: 'input',
    },
  ])
);

export default prompts;
