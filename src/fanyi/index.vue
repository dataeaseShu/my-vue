<template>
  <div></div>
</template>

<script>
import axios from "axios";
// import md5 from "js-md5";
import md5 from 'md5'
export default {
  mounted() {
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