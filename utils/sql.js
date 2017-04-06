'use strict';

const _ = require('lodash');

module.exports = table => {
  table = table.split('.').map(item => `\`${item}\``).join('.');

  return {
    /**
     * insert
     * @param  {string} table
     * @param  {object} data
     * @return {string}
     */
    create: data => {
      let keys = [], values = [];
      _.forEach(data, (value, key) => {
        keys.push(`\`${key}\``);
        values.push(_.isString(value) ? `'${value}'` : value);
      });
      return `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')})`;
    },

    /**
     * update
     * @param  {string} table
     * @param  {string} data
     * @param  {string} where
     * @return {string}
     */
    save: (data, where) => {
      let pairs = _.map(data, (value, key) => `\`${key}\` = ${_.isString(value) ? `'${value}'` : value}`).join(', ');
      return `UPDATE ${table} SET ${pairs}${where ? ' WHERE ' + where : ''}`;
    }
  }
};
