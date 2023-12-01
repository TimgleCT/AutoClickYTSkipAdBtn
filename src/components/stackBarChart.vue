<script setup>
import {
    ref, onMounted, onUnmounted, watch,
} from 'vue';
import * as echarts from 'echarts/core.js';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components.js';
import { BarChart } from 'echarts/charts.js';
import { CanvasRenderer } from 'echarts/renderers.js';

echarts.use([GridComponent, TooltipComponent, LegendComponent, BarChart, CanvasRenderer]);

const props = defineProps({
    xData: {
        type: Array,
        required: true,
        default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yData: {
        type: Array,
        required: true,
        default: () => [
            {
                type: '點擊廣告',
                data: [10, 20, 30, 50, 10, 20, 15],
            },
            {
                type: '固定廣告',
                data: [6, 9, 2, 12, 11, 5, 15],
            },
        ],
    },
    yParamUnit: {
        type: String,
        default: '個',
    },
});

const chart = ref(null);
let chartInstance = null;
const option = ref({
    legend: {
        show: true,
        left: '2.5%',
        top: '5%',
        icon: 'circle',
    },
    tooltip: {
        show: true,
        trigger: 'axis',
        textStyle: {
            align: 'left',
        },
        valueFormatter: (value) => `${value} ${props.yParamUnit}`,
    },
    grid: {
        top: '22.5%',
        left: '12.5%',
        right: '5%',
        bottom: '15%',
    },
    xAxis: {
        type: 'category',
        data: null,
    },
    yAxis: {
        type: 'value',
    },
    series: [],
});

function setXAxis() {
    option.value.xAxis.data = props.xData;
}

function setSeries() {
    const series = JSON.parse(JSON.stringify(props.yData)).map((ele) => ({
        data: ele.data,
        type: 'bar',
        stack: 'a',
        name: ele.type,
        emphasis: {
            focus: 'series',
        },
    }));

    const stackInfo = {};

    for (let i = 0; i < series[0].data.length; ++i) {
        for (let j = 0; j < series.length; ++j) {
            const stackName = series[j].stack;
            if (!stackName) {
                // eslint-disable-next-line no-continue
                continue;
            }
            if (!stackInfo[stackName]) {
                stackInfo[stackName] = {
                    stackStart: [],
                    stackEnd: [],
                };
            }
            const info = stackInfo[stackName];
            const data = series[j].data[i];
            if (data && data !== '-') {
                if (info.stackStart[i] == null) {
                    info.stackStart[i] = j;
                }
                info.stackEnd[i] = j;
            }
        }
    }

    for (let i = 0; i < series.length; ++i) {
        const { data } = series[i];
        const info = stackInfo[series[i].stack];
        for (let j = 0; j < series[i].data.length; ++j) {
            const isEnd = info.stackEnd[j] === i;
            const topBorder = isEnd ? 20 : 0;
            const bottomBorder = 0;
            data[j] = {
                value: data[j],
                itemStyle: {
                    borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder],
                },
            };
        }
    }

    option.value.series = series;
}

function drawChart() {
    setXAxis();
    setSeries();
    if (!chartInstance) {
        chartInstance = echarts.init(chart.value);
    }
    chartInstance.setOption(option.value);
}

onMounted(() => {
    drawChart();
    window.addEventListener('resize', () => {
        chartInstance.resize();
    });
    new ResizeObserver(() => chartInstance.resize()).observe(chart.value);
});

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.dispose();
    }
});

watch(
    () => [props.xData, props.yData],
    () => {
        if (chartInstance) {
            drawChart();
        }
    },
    { deep: true },
);

</script>

<template>
    <div class="stackBarChart w-100 h-100">
        <div ref="chart" class="h-100 w-100"></div>
    </div>
</template>

<style scoped>
</style>
