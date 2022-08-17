const parseHexColor = (c) => {
    var j = {};

    var s = c.replace(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/, function (_, r, g, b) {
        j.red = parseInt(r, 16);
        j.green = parseInt(g, 16);
        j.blue = parseInt(b, 16);
        return "";
    });

    if (s.length == 0) {
        return j;
    }
};


export const getColorWithPercentage = (a, b, percentage) => {
    var a = parseHexColor(a);
    var b = parseHexColor(b);
    if (typeof (a) != 'undefined' && typeof (b) != 'undefined') {
        return "#" + (a.red + Math.round(percentage * (b.red - a.red) / 100)).toString(16)
            + (a.green + Math.round(percentage * (b.green - a.green) / 100)).toString(16)
            + (a.blue + Math.round(percentage * (b.blue - a.blue) / 100)).toString(16)
    }
};