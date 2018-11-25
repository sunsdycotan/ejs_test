/**
 * Created by sunhongyan on 2018/11/25.
 */
require('./index.less');
var util = require('@page/util.js');
var indexTpl = require('./index.ejs');
var Menu = require('@page/common/menu/index.js');

var Index = {
    data: {
        name: 'layer',
        arr: [1, 2, 3],

    },
    init: function () {
        $('#app').html(indexTpl(this.data));
        Menu.init();
        return this;
    }
};
module.exports = Index.init();