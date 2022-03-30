import _ from 'lodash';

export default (minorData, majorData) => {
  const dicitionary = {};

  const iter = (minor, major, parent = '') => {
    const keys = _.sortBy(_.union(_.keys(minor), _.keys(major)));

    return keys.map((key) => {
      const propPath = (parent.length ? `${parent}.${key}` : key);
      const dicitionaryItem = {
        status: 'original',
        key,
        value: minor[key],
        parent,
      };
      if (!_.has(minor, key)) {
        _.assign(dicitionaryItem, { status: 'added', value: major[key] });
      } else if (!_.has(major, key)) {
        _.assign(dicitionaryItem, { status: 'removed' });
      } else if (minor[key] !== major[key]) {
        _.assign(dicitionaryItem, { status: 'updated', value: [minor[key], major[key]] });
        if (_.isObject(minor[key]) && _.isObject(major[key])) {
          _.assign(dicitionaryItem, { children: iter(minor[key], major[key], propPath) });
        }
      }
      _.assign(dicitionary, { [propPath]: dicitionaryItem });
      return propPath;
    });
  };

  iter(minorData, majorData);
  return dicitionary;
};
