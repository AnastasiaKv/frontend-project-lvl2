import _ from 'lodash';

const stylish = (value, replacer = ' ', spacesCount = 2) => {
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

  return iter(value, 1);
};

const plain = (value) => JSON.stringify(value);

export { stylish, plain };
