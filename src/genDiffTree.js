import _ from 'lodash';

const genDiffTree = (beforeData, afterData) => {
  const keys = _.sortBy(_.union(_.keys(beforeData), _.keys(afterData)));

  return keys.map((key) => {
    if (!_.has(beforeData, key)) {
      return { key, status: 'added', value: afterData[key] };
    }
    if (!_.has(afterData, key)) {
      return { key, status: 'removed', value: beforeData[key] };
    }
    if (_.isPlainObject(beforeData[key]) && _.isPlainObject(afterData[key])) {
      return { key, status: 'nested', children: genDiffTree(beforeData[key], afterData[key]) };
    }
    if (!_.isEqual(beforeData[key], afterData[key])) {
      return {
        key, status: 'updated', oldValue: beforeData[key], newValue: afterData[key],
      };
    }
    return { key, status: 'original', value: beforeData[key] };
  });
};

export default genDiffTree;
