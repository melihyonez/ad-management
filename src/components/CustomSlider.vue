<template>
  <div :class="[{'slide-wrapper-reverse': props.reversed}, {'slide-wrapper': !props.reversed}, {'after:slide-shadow-bottom': props.reversed}, {'after:slide-shadow-top': !props.reversed}]">
    <ul class="slide-icon-wrapper animate-slide" :class="['slide-icon-wrapper', {'animate-slide-reverse': props.reversed}, {'animate-slide': !props.reversed}]">
      <li class="slide-icon-box" v-for="icon in (fixedData || [])" :key="icon.id">
        <img :src="icon.img" :alt="icon.name" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['reversed', 'datas']);
const fixedData = computed(() => [...(props.datas || []), ...(props.datas?.slice?.(0, Math.ceil(props.datas.length / 2)) || [])]); // this required for css infinite animations

</script>