class StringUtils {

    constructor() {}

    insert(main_string, ins_string, pos) {
        if (typeof (pos) == "undefined") {
          pos = 0;
        }
        if (typeof (ins_string) == "undefined") {
          ins_string = '';
        }
        return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
      }
}

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

module.exports = StringUtils;

