import untildify from 'untildify';
import fse from 'fs-extra';
import { spawn } from 'child_process';
import normalizePackageData from 'normalize-package-data';
import sortPackageJSON from 'sort-package-json';

import prompts from './prompts';
import {
  writeBaseTemplates,
  writeCommitlintTemplates,
  writeSemanticReleaseTemplates,
  writeNodeTemplates,
  writeReactTemplates,
} from './fileWriters';

const executor = async () => {
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

  const isSemanticRelease = packageFeatures.indexOf('semantic-release') >= 0;
  const isCommitLint = packageFeatures.indexOf('commitlint') >= 0;
  const isNode = packageType === 'Node';
  const isReact = packageType === 'React';

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

  await spawn('npm', ['install'], { cwd: destinationDirectory, stdio: 'inherit' });
  await spawn('git', ['init'], { cwd: destinationDirectory, stdio: 'inherit' });
};

export default executor;
