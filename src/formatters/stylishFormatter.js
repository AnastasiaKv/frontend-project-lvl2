import _ from 'lodash';

const buildDiffObject = (diff) => diff.reduce((tree, node) => {
  switch (node.status) {
    case 'added':
      return { ...tree, [`+ ${node.key}`]: node.value };
    case 'removed':
      return { ...tree, [`- ${node.key}`]: node.value };
    case 'nested': {
      return { ...tree, [node.key]: buildDiffObject(node.children) };
    }
    case 'updated': {
      return {
        ...tree,
        [`- ${node.key}`]: node.oldValue,
        [`+ ${node.key}`]: node.newValue,
      };
    }
    default:
      return { ...tree, [node.key]: node.value };
  }
}, {});

export default (data, replacer = ' ', spacesCount = 2) => {
  const diffObject = buildDiffObject(data);
  const iter = (currValue, depth) => {
    if (!_.isObject(currValue)) return `${currValue}`;
    const indentCount = depth * spacesCount + 2 * (depth - 1);
    const currentIndent = replacer.repeat(indentCount);
    const bracketIndent = replacer.repeat(indentCount - spacesCount);
    const normalizeKey = (key) => (
      key.startsWith('+') || key.startsWith('-') ? key : key.padStart(key.length + 2)
    );
    const strLines = Object.entries(currValue)
      .map(([key, val]) => `${currentIndent}${normalizeKey(key)}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...strLines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diffObject, 1);
};
