/**
 * Created by sunhongyan on 2018/11/25.
 */
var util = require('@page/util.js');
var indexTpl = require('./index.ejs');

var Login = {
    data: {
        name: '登录'
    },
    init() {
        $('#app').html(indexTpl(this.data));

        return this;
    }
};
module.exports = Login.init();