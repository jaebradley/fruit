import untildify from 'untildify';

import prompts from './prompts';
import {
  writeBaseTemplates,
} from './fileWriters';

const executor = async () => {
  const {
    packageName,
    packageDescription,
    targetDirectory,
    authorEmailAddress,
    gitHubUsername,
  } = await prompts();

  const destinationDirectory = untildify(targetDirectory);
  const templateValues = Object.freeze({
    packageName,
    packageDescription,
    packageAuthor: authorEmailAddress,
  });

  await writeBaseTemplates({
    templateValues,
    destination: destinationDirectory,
  });
};

export default executor;
