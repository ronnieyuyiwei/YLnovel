/**
 * Created by Yu Yiwei on 2016/5/30.
 */
String.prototype.queryString = function (name) {
    var reg = new RegExp("[\?\&]" + name + "=([^\&]+)", "i"), r = this.match(reg);
    return r !== null ? unescape(r[1]) : null;
};
window.onload = function () {
    var last = location.href.queryString("_v");
    //document.body.innerHTML += last || "";
    if (location.href.indexOf("?") == -1) {
        location.href = location.href + "?_v=" + (new Date().getTime());
    } else {
        var now = new Date().getTime();
        if (!last) {
            location.href = location.href + "&_v=" + (new Date().getTime());
        } else if (parseInt(last) < (now - 1000)) {
            location.href = location.href.replace("_v=" + last, "_v=" + (new Date().getTime()));
        }
    }
};