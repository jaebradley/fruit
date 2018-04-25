import untildify from 'untildify';
import fse from 'fs-extra';
import { spawn } from 'child-process-promise';
import normalizePackageData from 'normalize-package-data';
import sortPackageJSON from 'sort-package-json';
import isOnline from 'is-online';
import chalk from 'chalk';

import {
  PACKAGE_TYPES,
  PACKAGE_FEATURES,
} from './constants';

import prompts from './prompts';
import {
  writeBaseTemplates,
  writeCommitlintTemplates,
  writeSemanticReleaseTemplates,
  writeNodeTemplates,
  writeReactTemplates,
} from './fileWriters';

const executor = async () => {
  const online = await isOnline();

  if (!online) {
    console.log(chalk.bold.redBright("⛔ 📡  You don't seem to be online"));
    return;
  }

  const {
    packageType,
    packageFeatures,
    packageName,
    packageDescription,
    packageVersion,
    targetDirectory,
    authorEmailAddress,
    gitHubUsername,
  } = await prompts();

  const destinationDirectory = untildify(targetDirectory);
  const templateValues = Object.freeze({
    packageName,
    packageDescription,
    packageVersion,
    gitHubUsername,
    packageAuthor: authorEmailAddress,
  });

  const isSemanticRelease = packageFeatures.indexOf(PACKAGE_FEATURES.SEMANTIC_RELEASE) >= 0;
  const isCommitLint = packageFeatures.indexOf(PACKAGE_FEATURES.COMMITLINT) >= 0;
  const isNode = packageType === PACKAGE_TYPES.NODE;
  const isReact = packageType === PACKAGE_TYPES.REACT;

  await writeBaseTemplates({
    templateValues,
    destination: destinationDirectory,
  });

  if (isNode) {
    await writeNodeTemplates({
      templateValues,
      destination: destinationDirectory,
    });
  }

  if (isReact) {
    await writeReactTemplates({
      templateValues,
      destination: destinationDirectory,
    });
  }

  if (isCommitLint || isSemanticRelease) {
    await writeCommitlintTemplates({
      templateValues,
      destination: destinationDirectory,
    });
  }

  // pretty shitty but have to put this last because it has a meaningful deploy script
  if (isSemanticRelease) {
    await writeSemanticReleaseTemplates({
      templateValues,
      destination: destinationDirectory,
    });
  }

  const packageJSONLocation = `${destinationDirectory}/package.json`;
  const packageJSON = fse.readJsonSync(packageJSONLocation, 'utf8');

  normalizePackageData(packageJSON);
  fse.writeJsonSync(packageJSONLocation, sortPackageJSON(packageJSON), 'utf8');

  console.log(chalk.bold.cyanBright('⌛ 🤞 Installing packages'));
  await spawn('npm', ['install'], { cwd: destinationDirectory, stdio: 'inherit' });
  await spawn('git', ['init'], { cwd: destinationDirectory, stdio: 'inherit' });

  console.log(chalk.bold.magentaBright('🥝  🍋  🍐  🍓  🍊  🍍  🍰  Installation complete! 🍒  🍈  🍇  🍉  🍏  🍎  🍌'));
  console.log();

  console.log(`🎭  ${chalk.bold.magentaBright('Run')} ${chalk.bold.blueBright('jest')} ${chalk.bold.magentaBright('tests')}: ${chalk.bold.cyanBright('npm run test')} `);
  console.log(`🏗️  ${chalk.bold.magentaBright('Build')} ${chalk.bold.blueBright('rollup.js')} ${chalk.bold.magentaBright('library')}: ${chalk.bold.cyanBright('npm run build')}`);
  console.log(`👕  ${chalk.bold.magentaBright('Run')} ${chalk.bold.blueBright('eslint')}: ${chalk.bold.cyanBright('npm run lint')}`);

  if (isReact) {
    console.log(`📖  ${chalk.bold.magentaBright('Run')} ${chalk.bold.blueBright('Storybook')}: ${chalk.bold.cyanBright('npm run storybook')}`);
  }

  console.log();
  console.log(chalk.bold.yellowBright("⚠️  Don't forget to... ⚠️"));
  console.log(chalk.bold.cyanBright('✅  Add a license'));
  console.log(chalk.bold.cyanBright('✅  Add keywords to package.json'));
  console.log(chalk.bold.cyanBright('✅  Create GitHub repository'));
  console.log(chalk.bold.cyanBright('✅  Setup Travis CI for repository'));

  if (isSemanticRelease) {
    console.log(chalk.bold.cyanBright('✅  Execute semantic-release-cli setup command'));
  }
};

export default executor;
