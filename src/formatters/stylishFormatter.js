import _ from 'lodash';

const buildTree = (diff) => {
  const iter = (nodes) => nodes.reduce((tree, node) => {
    switch (diff[node].status) {
      case 'added':
        return { ...tree, [`+ ${diff[node].key}`]: diff[node].value };
      case 'removed':
        return { ...tree, [`- ${diff[node].key}`]: diff[node].value };
      case 'updated': {
        if (diff[node].children) {
          return { ...tree, [diff[node].key]: iter(diff[node].children) };
        }
        const [oldVal, newVal] = diff[node].value;
        return {
          ...tree,
          [`- ${diff[node].key}`]: oldVal,
          [`+ ${diff[node].key}`]: newVal,
        };
      }
      default:
        return { ...tree, [diff[node].key]: diff[node].value };
    }
  }, {});

  const rootNodes = _.keys(diff).filter((key) => !diff[key].parent.length);
  return iter(rootNodes);
};

export default (data, replacer = ' ', spacesCount = 2) => {
  const tree = buildTree(data);
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

  return iter(tree, 1);
};
