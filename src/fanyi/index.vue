<template>
  <div></div>
</template>

<script>
import axios from "axios";
// import md5 from "js-md5";
import md5 from 'md5'
export default {
  mounted() {
    let zhArr = splitFunc(z);
    let twArr = splitFunc(t);
    let enArr = splitFunc(e);
    function change(str) {
      let arr = str.split(" ");
      let newArr = arr.map((ite, idx) => {
        console.log(1, ite);
        return ite.toLowerCase();
      });
      return newArr.slice(-2).join("_");
    }

    function splitFunc(en) {
      return en.split("\n").filter((ele) => ele);
    }
    let enObj = {};
    let zhObj = {};
    let twObj = {};
    let keyList = enArr.map((ele, index) => {
      let key = change(ele);
      enObj[key] = ele;
      zhObj[key] = zhArr[index];
      twObj[key] = twArr[index];
      return key;
    });
    const salt = Math.random();
    const q = "apple";
    const from = "en";
    const to = "zh";
    const appid = '20220809001300287';
    // let params = new FormData();
    // params.append("q", q);
    // params.append("from", from);
    // params.append("to", to);
    // params.append("appid", appid);
    // params.append("sign", md5(appid + q + salt + "ICAqvu7znQ1rRWUGgAMV"));
    // axios.post("'/dev-api'", params).then((ele) => {
    //   console.log(1, ele);
    // });
    console.log(1, appid + q + salt + "ICAqvu7znQ1rRWUGgAMV");
    const params = {
        q,
        from,
        to,
        appid,
        salt,
        sign: md5(appid + q + salt + 'ICAqvu7znQ1rRWUGgAMV')
    }
    // axios.get('/dev-api', {params}).then(ele => {
    //     console.log(1, ele)
    // })

    axios.post('/dev-api', params, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'  }}, {responseEncoding: 'utf8'}).then(ele => {
        console.log(1, ele)
    })
  },
};
</script>

<style>
</style>