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
  const getPropertyPath = (key) => {
    let propPath = key;
    let propParent = data[key].parent;
    while (propParent !== null) {
      propPath = `${propParent}.${propPath}`;
      propParent = data[propParent].parent;
    }
    return propPath;
  };
  const strLines = _.keys(data).map((key) => {
    const propPath = getPropertyPath(key);
    switch (data[key].status) {
      case 'added':
        return buildAddedPropStr(propPath, data[key].value);
      case 'removed':
        return buildRemovedPropStr(propPath);
      case 'updated':
        if (data[key].children) return '';
        return buildUpdatedPropStr(propPath, data[key].value);
      default:
        return '';
    }
  });

  return strLines.filter((line) => line).join('\n');
};
