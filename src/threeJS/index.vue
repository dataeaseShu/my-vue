<template>
  <div></div>
</template>

<script>
// 引入three.js
import * as THREE from "three";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//引入性能监视器stats.js
import Stats from "three/addons/libs/stats.module.js";
// 引入dat.gui.js的一个类GUI
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export default {
  mounted() {
    const sence = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 10, 0);

    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     const meshs = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    //     // 在XOZ平面上分布
    //     meshs.position.set(i * 200, 0, j * 200);
    //     sence.add(meshs); //网格模型添加到场景中
    //   }
    // }

    const phong = new THREE.MeshPhongMaterial({
      color: 0x409eff,
      shininess: 10,
      specular: 0x444444,
    });

    const meshPhong = new THREE.Mesh(geometry, phong);

    meshPhong.position.set(0, 100, 0);
    sence.add(meshPhong);

    sence.add(mesh);

    const width = 800;
    const height = 500;

    const camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 3000);

    camera.position.set(200, 200, 200);

    camera.lookAt(0, 0, 0);

    const axesHelper = new THREE.AxesHelper(150);

    sence.add(axesHelper);

    const light = new THREE.PointLight(0xffffff, 1.0);

    const PointLightHelper = new THREE.PointLightHelper(light, 10);
    sence.add(PointLightHelper);

    light.position.set(400, 100, 0);

    sence.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    sence.add(ambient);

    const directionLight = new THREE.DirectionalLight(0xf66000, 1);
    directionLight.position.set(-200, 0, 0);
    sence.add(directionLight);

    const directionLightHelper = new THREE.DirectionalLightHelper(
      directionLight,
      5,
      0xff0000
    );
    sence.add(directionLightHelper);

    const render = new THREE.WebGLRenderer();

    render.setSize(width, height);

    render.render(sence, camera);

    render.antialias = true;
    render.setClearColor(0x444444, 1);

    render.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(render.domElement);

    const gui = new GUI();

    gui.domElement.style.right = "0";
    gui.domElement.style.width = "300px";

    // const obj = {
    //   x: 30,
    // };

    // gui.add(obj, "x", 0, 100);
    gui.add(meshPhong.position, "x", 0, 180).name("环境光强度");

    const obj = {
      color: 0x00ffff,
    };
    // .addColor()生成颜色值改变的交互界面
    gui.addColor(obj, "color").onChange(function (value) {
      mesh.material.color.set(value);
    });

    const controls = new OrbitControls(camera, render.domElement);
    controls.addEventListener("change", function () {
      render.render(sence, camera);
    });

    const clocks = new THREE.Clock();

    const stats = new Stats();
    // stats.setMode(1)
    document.body.appendChild(stats.domElement);

    renderder();

    window.onresize = function () {
      render.setSize(window.innerWidth, window.innerHeight);
      camera.aspect(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
    };

    function renderder() {
      stats.update();
      // const spt = clocks.getDelta() * 1000
      // console.log('spt', spt);
      render.render(sence, camera);
      mesh.rotateY(0.01);
      requestAnimationFrame(renderder);
    }
  },
};
</script>
