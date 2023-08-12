import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formats = {
  plain: formatPlain,
  stylish: formatStylish,
  json: JSON.stringify,
};
export default (tree, formatName) => {
  const format = formats[formatName];

  if (!format) {
    throw new Error(`'${format}' format didn't found`);
  }

  return format(tree);
};
