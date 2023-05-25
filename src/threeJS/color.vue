<template>
  <div>123</div>
</template>

<script>
export default {
  mounted() {
    const parseHexColor = (c) => {
      var j = {};

      var s = c.replace(
        /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/,
        function (_, r, g, b) {
          j.red = parseInt(r, 16);
          j.green = parseInt(g, 16);
          j.blue = parseInt(b, 16);
          return "";
        }
      );

      if (s.length == 0) {
        return j;
      }
    };

    function zero(str) {
      if (str.length == 1) str = "0" + str;
      if (str.length == 0) str = "00";
      return str;
    }

    const getColorWithPercentage = (a, b, percentage) => {
      var a = parseHexColor(a);
      var b = parseHexColor(b);
      function calc(a, b) {
        return (a + Math.round((percentage * (b - a)) / 100)).toString(16);
      }
      let r = zero(calc(a.red, b.red));
      let g = zero(calc(a.green, b.green));
      let c = zero(calc(a.blue, b.blue));

      if (typeof a != "undefined" && typeof b != "undefined") {
        return "#" + r + g + c;
      }
    };

    console.log(
      "getColorWithPercentage()",
      getColorWithPercentage("#3370FF", "#000000", 60)
    );
  },
};
</script>
