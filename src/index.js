// ref:
// - https://umijs.org/plugin/develop.html
import { join } from 'path';
import { existsSync } from 'fs';

const debug = require('debug')('umi-plugin-pro-block');

export default function (api) {
  const { paths, config } = api;

  let hasUtil, hasService, newFileName;
  api.beforeBlockWriting(({ sourcePath, blockPath }) => {
    hasUtil = existsSync(join(paths.absSrcPath, `util${config.singular ? '' : 's'}`, 'request.js'));
    hasService = existsSync(join(sourcePath, './src/service.js'));
    newFileName = blockPath.replace(/^\//, '').replace(/\//g, '');
    debug('beforeBlockWriting... hasUtil:', hasUtil, 'hasService:', hasService, 'newFileName:', newFileName);
  });

  api._modifyBlockTarget((target, { sourceName }) => {
    if (sourceName === '_mock.js') {
      // src/pages/test/t/_mock.js -> mock/test-t.js
      return join(paths.cwd, 'mock', `${newFileName}.js`);
    }
    if (sourceName === 'service.js' && hasService) {
      // src/pages/test/t/service.js -> services/test.t.js
      return join(paths.absSrcPath, config.singular ? 'service' : 'services', `${newFileName}.js`);
    }
    return target;
  });

  // umi-request -> @utils/request
  // src/pages/test/t/service.js -> services/test.t.js
  api._modifyBlockFile((content) => {
    if (hasUtil) {
      content = content.replace(/[\'\"]umi\-request[\'\"]/g, `'@/util${config.singular ? '' : 's'}/request'`);
    }
    if (hasService) {
      content = content.replace(/[\'\"][\.\/]+service[\'\"]/g, `'@/service${config.singular ? '' : 's'}/${newFileName}'`);
    }
    return content;
  });
}
