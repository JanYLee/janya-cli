import downloadGit from 'download-git-repo';

import { getAll } from './rc';

export const downloadLocal = async (templateName, projectName) => {
  let config = await getAll();
  let api = `${config.registry}/${templateName}`;
  return new Promise((resolve, reject) => {
      downloadGit(api, projectName, (err) => {
          if (err) {
              reject(err);
          }
          resolve();
      });
  });
}

