<template>
  <div class="bg-white flex min-h-screen p-6">
    <div class="m-auto flex gap-20 max-xl:gap-16 max-lg:gap-14 max-md:gap-12 max-sm:gap-8">
      <CustomSlider :datas="sliderIconList" :reversed="true" />
      <div>
        <div>
          <h1 class="title-text">Marketing Integrations</h1>
          <h2 class="title-text text-primary-gray-300 mt-6">
            Trust WASK's smart optimization features
          </h2>
        </div>
        <div class="mt-24 max-lg:mt-22 max-md:mt-20 max-sm:mt-18">
          <div>
            <div class="flex flex-wrap gap-7 max-xl:gap-6 max-lg:gap-4 max-md:gap-3 max-sm:gap-2">
              <div class="flex items-center flex-wrap gap-5 max-xl:gap-4 max-lg:gap-3 max-md:gap-2 max-sm:gap-1">
                <div class="flex items-center gap-4 max-md:gap-2">
                  <h5 class="text-primary-black font-semibold max-sm:text-xs max-md:text-xs max-lg:text-sm max-xl:text-base">
                    Select Ad Acount
                  </h5>
                  <ArrowRight class="max-md:w-5" />
                </div>
                <button
                  type="button"
                  :class="['main-button', { 'passive': !activeAccount.includes(item.id) }]"
                  @dblclick="handleDoubleClick(item.id, 'account')"
                  @click="handleClick(item.id, 'account')"
                  v-for="item in apiData.accounts"
                  :key="item.id"
                >
                  {{ item.name }}
                </button>
              </div>
              <div class="divider max-2xl:hidden"></div>
              <div class="flex items-center flex-wrap gap-5 max-xl:gap-4 max-lg:gap-3 max-md:gap-2 max-sm:gap-1">
                <div class="flex items-center gap-4 max-md:gap-2">
                  <h5 class="text-primary-black font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-base">
                    Select Metric
                  </h5>
                  <ArrowRight class="max-md:w-5" />
                </div>
                <button
                  type="button"
                  :class="['main-button', { 'passive': !activeMetric.includes(item) }]"
                  @dblclick="handleDoubleClick(item, 'metric')"
                  @click="handleClick(item, 'metric')"
                  v-for="item in filteredMetric"
                  :key="item"
                >
                  {{ item }}
                </button>
              </div>
            </div>
            <div class="mt-16 mb-24 max-xl:mt-14 max-lg:mt-12 max-md:mt-10 max-sm:mt-8">
              <LineChart
                :key="activeAccount + activeMetric"
                v-if="!!apiData?.accounts"
                :chartData="fixedChartData"
              />
            </div>
          </div>
        </div>
      </div>
      <CustomSlider :datas="sliderIconList" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import ArrowRight from './icons/ArrowRight.vue';
import icon1 from '../assets/ad-platroms-icons/icon1.png';
import icon2 from '../assets/ad-platroms-icons/icon2.png';
import icon3 from '../assets/ad-platroms-icons/icon3.png';
import icon4 from '../assets/ad-platroms-icons/icon4.png';
import icon5 from '../assets/ad-platroms-icons/icon5.png';
import icon6 from '../assets/ad-platroms-icons/icon6.png';
import icon7 from '../assets/ad-platroms-icons/icon7.png';
import icon8 from '../assets/ad-platroms-icons/icon8.png';
import icon9 from '../assets/ad-platroms-icons/icon9.png';
import icon10 from '../assets/ad-platroms-icons/icon10.png';
import icon11 from '../assets/ad-platroms-icons/icon11.png';
import icon12 from '../assets/ad-platroms-icons/icon12.png';
import icon13 from '../assets/ad-platroms-icons/icon13.png';
import icon14 from '../assets/ad-platroms-icons/icon14.png';
import icon15 from '../assets/ad-platroms-icons/icon15.png';
import icon16 from '../assets/ad-platroms-icons/icon16.png';
import LineChart from './LineChart.vue';
import CustomSlider from './CustomSlider.vue';

const apiData = ref({});
const url = ref(localStorage.getItem('url') || '');
const token = ref(localStorage.getItem('token') ||'');

const activeAccount = ref([1]);
const activeMetric = ref([1]);
const clickCount = ref(0);
const clickTimeout = ref(null);


const sliderIconList = [
  { id: '1', name: 'Facebook', img: icon1 },
  { id: '2', name: 'YouTube', img: icon2 },
  { id: '3', name: 'Instagram', img: icon3 },
  { id: '4', name: 'Shopify', img: icon4 },
  { id: '5', name: 'SnapChat', img: icon5 },
  { id: '6', name: 'Pixel', img: icon6 },
  { id: '7', name: 'MailChimp', img: icon7 },
  { id: '8', name: 'Twitter', img: icon8 },
  { id: '9', name: 'TikTok', img: icon9 },
  { id: '10', name: 'WhatsApp', img: icon10 },
  { id: '11', name: 'Google', img: icon11 },
  { id: '12', name: 'Google Analytics', img: icon12 },
  { id: '13', name: 'Wordpress', img: icon13 },
  { id: '14', name: 'LinkedIn', img: icon14 },
  { id: '15', name: 'Woo Commerce', img: icon15 },
  { id: '16', name: 'Yandex', img: icon16 },
];

const chartColorsList = [
  { id: '1', bg: 'rgba(0, 123, 255, 0.5)', br: 'rgba(0, 123, 255, 1)'},
  { id: '2', bg: 'rgba(123, 123, 255, 0.5)', br: 'rgba(123, 123, 255, 1)'},
  { id: '3', bg: 'rgba(0, 231, 155, 0.5)', br: 'rgba(0, 231, 155, 1)'},
];

async function fetchData() {
  try {
    const headers = new Headers();
    headers.append('Token', token.value || localStorage.getItem('token'));
    const response = await fetch(url.value || localStorage.getItem('url'), { headers: headers });
    const responseData = await response.json();
    apiData.value = responseData;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  if (!localStorage.getItem('url')) {
    url.value = prompt('Your Api Url:');
  }
  if (!localStorage.getItem('token')) {
    token.value = prompt('Your Token:');
  }
  if (url.value && token.value) {
    await fetchData();
    activeAccount.value = [apiData.value.accounts[0].id];
    activeMetric.value = [filteredMetric.value[0]];
  }
});

const filteredMetric = computed(() => {
  let newArr = [];
  if (apiData?.value?.accounts?.[0]?.insights?.data.length) {
    newArr = Object.keys(apiData?.value?.accounts?.[0]?.insights?.data[0]).filter(ft => ft !== 'date_start' && ft !== 'date_end').sort();
    return newArr;
  }
  return newArr;
});

watch([url, token], ([newUrl, newToken]) => {
  if (url.value) {
    localStorage.setItem('url', newUrl || url.value);
  }
  if (token.value) {
    localStorage.setItem('token', newToken || token.value);
  }
})

function handleClick(value, type) {
  if ((type === 'account' && !(activeAccount.value.length === 1 && activeAccount.value[0] === value)) || (type === 'metric' && !(activeMetric.value.length === 1 && activeMetric.value[0] == value))) { // blocks unnecessary rendering
    clickCount.value++;
    clickTimeout.value = setTimeout(() => {
      if (clickCount.value === 1) {
        if (type === 'account') {
          activeAccount.value = [value]
        }
        if (type === 'metric') {
          activeMetric.value = [value]
        }
      }
      clickCount.value = 0;
      clearTimeout(clickTimeout);
    }, 200);
  }
}

function handleDoubleClick(value, type) {
  if ((type === 'account' && !(activeAccount.value.length === 1 && activeAccount.value[0] === value)) || (type === 'metric' && activeAccount.value.length === 1 && !(activeMetric.value.length === 1 && activeMetric.value[0] === value))) { // blocks unnecessary rendering
    clearTimeout(clickTimeout);
    if (type === 'account') {
      if (activeAccount.value.includes(value)) {
        if (activeAccount.value.length !== 1) {
          activeAccount.value = [...activeAccount.value.filter(ft => ft !== value)];
        }
      } else {
        activeAccount.value = [...activeAccount.value, value];
        if (activeMetric.value.length > 1) {
          activeMetric.value = [filteredMetric.value[0]];
        }
      }
    }
    if (type === 'metric') {
      if (activeMetric.value.includes(value)) {
        if (activeMetric.value.length !== 1) {
          activeMetric.value = [...activeMetric.value.filter(ft => ft !== value)];
        }
      } else {
        activeMetric.value = [...activeMetric.value, value];
      }
    }
  }
}

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const fixedChartData = computed(() => {
  if (apiData.value) {
    let fixedDatasets = [];
    let allLabels = [];
    let fixedLabel = (lbls) => [...new Set(lbls)].sort();
    
    for (let i = 0; i < activeAccount.value.length; i++) {
      const activeAccountKey = activeAccount.value[i];
      const data = apiData?.value?.accounts?.find?.(fn => fn.id === activeAccountKey);
    
      for (let j = 0; j < activeMetric.value.length; j++) {
        for (let k = 0; k < data?.insights.data.length; k++) {
          const element = data?.insights.data[k];
          allLabels.push(element.date_start);
        }
      }
    }
    
    for (let i = 0; i < activeAccount.value.length; i++) {
      const activeAccountKey = activeAccount.value[i];
      const data = apiData?.value?.accounts?.find(fn => fn.id === activeAccountKey);
  
      for (let j = 0; j < activeMetric.value.length; j++) {
        const activeInsightName = activeMetric.value[j];
        fixedDatasets.push(
          {
            label: data?.name + (activeMetric?.value?.length > 1 ? ': ' + activeInsightName : ''),
            data: fixedLabel(allLabels)?.map(fl => data?.insights.data?.find(itm => itm?.date_start === fl)?.[activeInsightName] || NaN),
            backgroundColor: chartColorsList?.[i + j]?.bg || 'rgba(255, 0, 0, 1)',// <= error color is red
            borderColor: chartColorsList?.[i + j]?.br || 'rgba(255, 0, 0, 0.5)',// <= error color is red
            borderWidth: 1,
            fill: 'start',
            radius: 8,
            pointRadius: 8,
            pointHoverRadius: 8,
            segment: {
              borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)'),
              borderDash: ctx => skipped(ctx, [6, 6]),
            },
            spanGaps: true,
            currency: activeInsightName === 'spend' ? data.currency : null,
          }
        )
      }
    }

    return { datasets: fixedDatasets, labels: fixedLabel(allLabels)?.map(fl => new Intl.DateTimeFormat('tr-TR').format(new Date(fl))) };
  }
  return { datasets: [], labels: [] };

})
</script>