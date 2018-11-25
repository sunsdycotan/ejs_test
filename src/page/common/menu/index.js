/**
 * Created by sunhongyan on 2018/11/25.
 */
var util = require('@page/util.js');
var menuTpl = require('./menu.ejs');

var Menu = {
    data: {
        menuList: [
            { name: '菜单1' , url: './index.html'},
            { name: '菜单2', url: './login.html'}
        ]
    },
    init() {
        $('#childTpl').html(menuTpl(this.data));
        return this;
    }
};
module.exports = Menu;