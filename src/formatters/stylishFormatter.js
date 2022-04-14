import _ from 'lodash';

const getIndent = (depth, isBracketIndent = false, spaceCount = 2) => ' '.repeat(spaceCount * depth + spaceCount * (depth - 1) - (isBracketIndent ? 2 : 0));

const buildObjectStr = (lines, depth) => ['{', ...lines, `${getIndent(depth, true)}}`].join('\n');

const stringify = (currValue, depth) => {
  if (!_.isPlainObject(currValue)) return currValue;
  const lines = Object
    .entries(currValue)
    .map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return buildObjectStr(lines, depth);
};

export default (data) => {
  const iter = (tree, depth = 1) => tree.map((node) => {
    const indent = getIndent(depth);
    const valueDepth = depth + 1;
    const { key, value } = node;
    const buildEntrieStr = (entrieVal, marker = ' ') => `${indent}${marker} ${key}: ${entrieVal}`;
    switch (node.status) {
      case 'added':
        return buildEntrieStr(stringify(value, valueDepth), '+');
      case 'removed':
        return buildEntrieStr(stringify(value, valueDepth), '-');
      case 'nested':
        return buildEntrieStr(buildObjectStr(iter(node.children, valueDepth), valueDepth));
      case 'updated':
        return [
          buildEntrieStr(stringify(node.oldValue, valueDepth), '-'),
          buildEntrieStr(stringify(node.newValue, valueDepth), '+'),
        ].join('\n');
      default:
        return buildEntrieStr(stringify(value, valueDepth));
    }
  });

  return buildObjectStr(iter(data));
};
