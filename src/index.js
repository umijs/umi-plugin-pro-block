// ref:
// - https://umijs.org/plugin/develop.html
import { join } from 'path';

export default function (api) {
  const { paths } = api;
  api._modifyBlockTarget((target, { sourceName, blockPath }) => {
    if (sourceName === '_mock.js') {
      // /test/t/_mock.js -> test-t.js
      const mockFileName = blockPath.replace(/^\//, '').replace(/\//g, '');
      return join(paths.cwd, 'mock', `${mockFileName}.js`);
    }
    return target;
  });
}
