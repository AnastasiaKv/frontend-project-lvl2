import _ from 'lodash';

const buildTree = (diff) => {
  const iter = (nodes) => nodes.reduce((tree, node) => {
    const treeLevel = {};
    switch (diff[node].status) {
      case 'added':
        treeLevel[`+ ${node}`] = diff[node].value;
        break;
      case 'removed':
        treeLevel[`- ${node}`] = diff[node].value;
        break;
      case 'updated':
        if (diff[node].children) {
          treeLevel[node] = iter(diff[node].children);
        } else {
          const [oldVal, newVal] = diff[node].value;
          treeLevel[`- ${node}`] = oldVal;
          treeLevel[`+ ${node}`] = newVal;
        }
        break;
      default:
        treeLevel[node] = diff[node].value;
        break;
    }
    return { ...tree, ...treeLevel };
  }, {});

  const rootNodes = _.keys(diff).filter((key) => !diff[key].parent);
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
