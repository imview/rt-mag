/* 
File Created: 八月 6, 2014 By superwind.mei
*/


var utils = {
    isPriceNumber: function (word) {
        if (word == "0" || word == "0." || word == "0.0" || word == "0.00") {
            return true;
        } else {
            var index = word.indexOf("0");
            var length = word.length;
            if (index == 0 && length > 1) {/*0开头的数字串*/
                var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;
                if (!reg.test(word)) {
                    return false;
                } else {
                    return true;
                }
            } else {/*非0开头的数字*/
                var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
                if (!reg.test(word)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    },
    isNumber: function (pnum) {
        if (!(/^\d+$/.test(pnum))) {
            return false;
        }
        return true;
    },
    isDateTime: function (pnum) {
        if (!(/^(\d{4})-(\d{2})-(\d{2})$/.test(pnum))) {
            return false;
        }
        return true;
    },


    isTime: function (pnum) {
        if (!(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(pnum))) {
            return false;
        }
        return true;
    },

    isLegalPhoneNumber: function (pnum) {
        if (!(/^1\d{10}$/.test(pnum))) {
            return false;
        }
        return true;
    },
    isChinese: function (temp) {
        var re = /[^\u4e00-\u9fa5]/;
        if (re.test(temp)) return false;
        return true;
    },
    isNoIdCardCode: function (number) {
        number = number.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(number))) {
            return false;
        } else {
            return true;
        }
    },
    hasExtension: function (value, exts) {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(value);
    }
};