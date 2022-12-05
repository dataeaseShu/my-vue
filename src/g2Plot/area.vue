<template>
  <div id="container"></div>
</template>

<script>
import { Area } from '@antv/g2plot';
import * as G2 from '@antv/g2plot';
export default {
    mounted() {
        console.log('G2.version', G2.version);
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((res) => res.json())
            .then((data) => {
                const area = new Area('container', {
                data,
                xField: 'timePeriod',
                yField: 'value',
                legend: {
                    layout: 'horizontal',
                    position: 'right'
                    },
                xAxis: {
                    range: [0, 1],
                },
                });
                area.render();
            });
    }
}
</script>

<style>

</style>