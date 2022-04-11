import _ from 'lodash';

const normalizeValue = (val) => {
  if (_.isObject(val)) return '[complex value]';
  if (_.isString(val)) return `'${val}'`;
  return val;
};
const buildRemovedPropStr = (key) => `Property '${key}' was removed`;
const buildAddedPropStr = (key, val) => `Property '${key}' was added with value: ${normalizeValue(val)}`;
const buildUpdatedPropStr = (key, oldValue, newValue) => `Property '${key}' was updated. From ${normalizeValue(oldValue)} to ${normalizeValue(newValue)}`;

const buildDiffStrings = (diff, parent = '') => diff.map((node) => {
  const keyPath = parent ? `${parent}.${node.key}` : node.key;
  switch (node.status) {
    case 'added':
      return buildAddedPropStr(keyPath, node.value);
    case 'removed':
      return buildRemovedPropStr(keyPath);
    case 'updated':
      return buildUpdatedPropStr(keyPath, node.oldValue, node.newValue);
    case 'nested':
      return buildDiffStrings(node.children, keyPath);
    default:
      return '';
  }
});

export default (data) => _.flattenDeep(buildDiffStrings(data))
  .filter((line) => line)
  .join('\n');
