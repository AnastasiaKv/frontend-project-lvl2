import stylish from './stylishFormatter.js';
import plain from './plainFormatter.js';
import json from './jsonFormatter.js';

export default (formatter) => {
  switch (formatter) {
    case 'stylish': return stylish;
    case 'plain': return plain;
    case 'json': return json;
    default: throw new Error(`Unknown formatter: ${formatter}.`);
  }
};
