const     isEqual = require('lodash.isequal');
const     transform = require('lodash.transform');
const     isObject = require('lodash.isobject');

/**
 * https://gist.github.com/Yimiprod/7ee176597fef230d1451 
 * Yimmiprod
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function differenceA(object, base) {
	function changes(object, base) {
		return transform(object, function(result, value, key) {
			if (!isEqual(value, base[key])) {
			    result[key] = (
				isObject(value) &&
				    isObject(base[key]))
				      ? changes(value, base[key])
				      : value;
			}
		});
	}
	return changes(object, base);
}

module.exports = differenceA;
