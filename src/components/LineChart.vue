<template>
  <div class="h-[400px] w-full relative">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'LineChart',
  props: {
    chartData: {
      type: Object,
      required: true,
      default() {
        return { datasets: [], labels: [] }
      }
    },
  },
  data() {
    return {
      lineChartData: {
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          resizeDelay: 500,
          plugins: {
            filler: {
              propagate: false,
            },
            tooltip: {
              callbacks: {
                label: (tooltipItems) => this.tooltip(tooltipItems),
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              type: 'logarithmic',
              ticks: this.ticks || {
                callback: (label) => this.fixValue(label)
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart();
  },
  watch() {
    this.chartData
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chartInstance = new Chart(ctx, this.lineChartData);
    },
    fixValue(val) {
      if (this.chartData?.datasets?.every((sm) => sm.currency)) {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: this.chartData?.datasets?.[0]?.currency }).format(val);
      }
      return new Intl.NumberFormat('tr-TR').format(val);
    },
    tooltip(tooltipItems) {
      if (tooltipItems.dataset.currency) {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: tooltipItems.dataset.currency }).format(tooltipItems.raw);
      }
      return new Intl.NumberFormat('tr-TR').format(tooltipItems.raw);
    },
    handleResize() {
      this.chartInstance?.resize(200, 400);
      this.chartInstance?.resize();
    }
  }
}
</script>
