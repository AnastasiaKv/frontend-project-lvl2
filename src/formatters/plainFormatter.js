import _ from 'lodash';

const normalizeValue = (val) => {
  if (_.isObject(val)) return '[complex value]';
  if (_.isString(val)) return `'${val}'`;
  return val;
};
const buildRemovedPropStr = (key) => `Property '${key}' was removed`;
const buildAddedPropStr = (key, val) => `Property '${key}' was added with value: ${normalizeValue(val)}`;
const buildUpdatedPropStr = (key, val) => `Property '${key}' was updated. From ${normalizeValue(val[0])} to ${normalizeValue(val[1])}`;

export default (data) => {
  const strLines = _.keys(data).map((propPath) => {
    switch (data[propPath].status) {
      case 'added':
        return buildAddedPropStr(propPath, data[propPath].value);
      case 'removed':
        return buildRemovedPropStr(propPath);
      case 'updated':
        if (data[propPath].children) return '';
        return buildUpdatedPropStr(propPath, data[propPath].value);
      default:
        return '';
    }
  });

  return strLines.filter((line) => line).join('\n');
};
