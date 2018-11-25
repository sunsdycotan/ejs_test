/**
 * Created by sunhongyan on 2018/11/25.
 */
window.$ = window.jQuery = require('@/lib/jquery/dist/jquery.js');

var util = {
    // 渲染html模板
    renderHtml : function(htmlTemplate, data){
        return htmlTemplate(data);
    },
}

module.exports = util;