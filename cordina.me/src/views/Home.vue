<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useLayout } from '@/layout/composables/layout'
import { ProductService } from '@/service/ProductService'

const { layoutConfig } = useLayout()

const productService = new ProductService()

const products = ref(null)
const productsThisWeek = ref(null)
const productsLastWeek = ref(null)
const ordersChart = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
  datasets: [
    {
      label: 'Revenue',
      data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
      borderColor: ['#00acac'],
      backgroundColor: ['rgba(40, 136, 76, .05)'],
      borderWidth: 2,
      fill: true,
      borderDash: [3, 6],
      tension: 0.4
    },
    {
      label: 'Cost',
      data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
      borderColor: ['#2f8ee5'],
      backgroundColor: ['rgba(47, 142, 229, 0.05)'],
      borderWidth: 2,
      fill: true,
      pointRadius: 3,
      tension: 0.4
    }
  ]
})
const ordersOptions = ref(null)
const activeOrders = ref(0)
const trafficChart = ref(null)
const trafficOptions = ref({
  plugins: {
    legend: {
      display: false
    }
  },
  responsive: true
})
const activeTraffic = ref(0)
const goalChart = ref({
  labels: ['Complete', 'Not Complete', 'Extra Tasks'],
  datasets: [
    {
      data: [183, 62, 10],
      backgroundColor: ['#ffffff', 'rgba(255,255,255,.2)', 'rgba(255,255,255,.5)'],
      borderWidth: 0
    }
  ]
})
const goalOptions = ref({
  plugins: {
    legend: {
      display: false
    }
  },
  responsive: true
})
const items = ref([
  { label: 'View Profile', icon: 'pi pi-user' },
  { label: 'Update Profile', icon: 'pi pi-refresh' },
  { label: 'Delete Profile', icon: 'pi pi-trash' }
])
const val1 = ref(1)
const val2 = ref(2)
const orderWeek = ref([
  { name: 'This Week', code: '0' },
  { name: 'Last Week', code: '1' }
])
const selectedOrderWeek = ref(null)

onMounted(() => {
  productService.getProducts().then((data) => (products.value = data))
  productService.getProducts().then((data) => (productsThisWeek.value = data))
  productService.getProductsMixed().then((data) => (productsLastWeek.value = data))

  selectedOrderWeek.value = orderWeek.value[0]
  trafficChart.value = getTrafficChartData()
  refreshChart()
})

const refreshChart = () => {
  trafficChart.value = getTrafficChartData()

  if (layoutConfig.colorScheme.value !== 'light') {
    applyDarkTheme()
  } else {
    applyLightTheme()
  }
}

const getTrafficChartData = () => {
  return {
    labels: ['Add View', 'Total View'],
    datasets: [
      {
        data: [48, 52],
        backgroundColor: [
          getComputedStyle(document.body).getPropertyValue('--primary-dark-color') || '#2c84d8',
          getComputedStyle(document.body).getPropertyValue('--content-alt-bg-color') || '#B1B9C9'
        ],
        borderWidth: 0
      }
    ]
  }
}

const changeDataset = (event) => {
  const dataSet = [
    [31, 83, 69, 29, 62, 25, 59, 26, 46],
    [40, 29, 7, 73, 81, 69, 46, 21, 96]
  ]
  const dataSet2 = [
    [67, 98, 27, 88, 38, 3, 22, 60, 56],
    [74, 67, 11, 36, 100, 49, 34, 56, 45]
  ]

  activeOrders.value = parseInt(event.currentTarget.getAttribute('data-index'))

  ordersChart.value.datasets[0].data =
    dataSet[parseInt(event.currentTarget.getAttribute('data-index'))]
  ordersChart.value.datasets[1].data =
    dataSet2[parseInt(event.currentTarget.getAttribute('data-index'))]
  ordersChart.value.datasets[0].label = event.currentTarget.getAttribute('data-label')
  ordersChart.value.datasets[0].borderColor = event.currentTarget.getAttribute('data-stroke')
}
const changeTrafficset = (event) => {
  const traffidDataSet = [
    [48, 52],
    [26, 74],
    [12, 88]
  ]
  activeTraffic.value = parseInt(event.currentTarget.getAttribute('data-index'))

  trafficChart.value.datasets[0].data =
    traffidDataSet[parseInt(event.currentTarget.getAttribute('data-index'))]
}
const recentSales = (event) => {
  if (event.value.code === '0') {
    products.value = productsThisWeek.value
  } else {
    products.value = productsLastWeek.value
  }
}
const applyDarkTheme = () => {
  ordersOptions.value = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#ebedef'
        }
      }
    },
    responsive: true,
    hover: {
      mode: 'index'
    },
    scales: {
      y: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      },
      x: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      }
    }
  }
}
const applyLightTheme = () => {
  ordersOptions.value = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#A0A7B5'
        }
      }
    },
    responsive: true,
    hover: {
      mode: 'index'
    },
    scales: {
      y: {
        ticks: {
          color: '#A0A7B5'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      },
      x: {
        ticks: {
          color: '#A0A7B5'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      }
    }
  }
}
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}
const getBadgeSeverity = (inventoryStatus) => {
  switch (inventoryStatus.toLowerCase()) {
    case 'instock':
      return 'success'
    case 'lowstock':
      return 'warning'
    case 'outofstock':
      return 'danger'
    default:
      return 'info'
  }
}

watch(
  layoutConfig.colorScheme,
  () => {
    refreshChart()
  },
  { immediate: true }
)
</script>

<template>
  <div class="grid">
    <div class="col-12 md:col-12 xl:col-3">
      <div class="overview-card surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-4 flex justify-content-between align-items-center">
          <span class="font-semibold text-600">Revenue Status</span>
          <div
            class="header-button flex align-items-center justify-content-center border-1 border-circle border-transparent text-500 cursor-pointer hover:border-gray-500"
            style="height: 20px; width: 20px; transform: rotate(45deg)"
          >
            <i class="pi pi-arrow-up text-sm"></i>
          </div>
        </div>
        <div class="flex align-items-center justify-content-between">
          <h3 class="text-700">87363</h3>
          <div class="flex align-items-baseline gap-1">
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-blue-200 border-round-xs cursor-pointer hover:bg-blue-500 transition-ease-in-out transition-duration-200"
                style="height: 12px; width: 8px"
              >
                <span>12</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-blue-200 border-round-xs cursor-pointer hover:bg-blue-500 transition-ease-in-out transition-duration-200"
                style="height: 40px; width: 8px"
              >
                <span>40</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-blue-200 border-round-xs cursor-pointer hover:bg-blue-500 transition-ease-in-out transition-duration-200"
                style="height: 26px; width: 8px"
              >
                <span>26</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-blue-200 border-round-xs cursor-pointer hover:bg-blue-500 transition-ease-in-out transition-duration-200"
                style="height: 17px; width: 8px"
              >
                <span>17</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-blue-200 border-round-xs cursor-pointer hover:bg-blue-500 transition-ease-in-out transition-duration-200"
                style="height: 36px; width: 8px"
              >
                <span>36</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-blue-500 border-round-xs cursor-pointer transition-ease-in-out transition-duration-200"
                style="height: 51px; width: 8px"
              >
                <span>51</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 flex align-items-center gap-1">
          <span class="text-cyan-500 font-semibold"
            ><i class="pi pi-arrow-up"></i> <span>55%</span></span
          >
          <span class="text-xs">increase in today sales</span>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-12 xl:col-3">
      <div class="overview-card surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-4 flex justify-content-between align-items-center">
          <span class="font-semibold text-600">Page View</span>
          <div
            class="header-button flex align-items-center justify-content-center border-1 border-circle border-transparent text-500 cursor-pointer hover:border-gray-500"
            style="height: 20px; width: 20px; transform: rotate(45deg)"
          >
            <i class="pi pi-arrow-up text-sm"></i>
          </div>
        </div>
        <div class="flex align-items-center justify-content-between">
          <h3 class="text-700">5592</h3>
          <div class="flex align-items-baseline gap-1">
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-cyan-200 border-round-xs cursor-pointer hover:bg-cyan-500 transition-ease-in-out transition-duration-200"
                style="height: 30px; width: 8px"
              >
                <span>30</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-cyan-200 border-round-xs cursor-pointer hover:bg-cyan-500 transition-ease-in-out transition-duration-200"
                style="height: 43px; width: 8px"
              >
                <span>43</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-cyan-200 border-round-xs cursor-pointer hover:bg-cyan-500 transition-ease-in-out transition-duration-200"
                style="height: 48px; width: 8px"
              >
                <span>48</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-cyan-200 border-round-xs cursor-pointer hover:bg-cyan-500 transition-ease-in-out transition-duration-200"
                style="height: 40px; width: 8px"
              >
                <span>40</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-cyan-200 border-round-xs cursor-pointer hover:bg-cyan-500 transition-ease-in-out transition-duration-200"
                style="height: 52px; width: 8px"
              >
                <span>52</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-cyan-500 border-round-xs cursor-pointer transition-ease-in-out transition-duration-200"
                style="height: 18px; width: 8px"
              >
                <span>18</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 flex align-items-center gap-1">
          <span class="text-pink-500 font-semibold"
            ><i class="pi pi-arrow-down"></i> <span>12%</span></span
          >
          <span class="text-xs">decrease in today sales</span>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-12 xl:col-3">
      <div class="overview-card surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-4 flex justify-content-between align-items-center">
          <span class="font-semibold text-600">Bounce Rate</span>
          <div
            class="header-button flex align-items-center justify-content-center border-1 border-circle border-transparent text-500 cursor-pointer hover:border-gray-500"
            style="height: 20px; width: 20px; transform: rotate(45deg)"
          >
            <i class="pi pi-arrow-up text-sm"></i>
          </div>
        </div>
        <div class="flex align-items-center justify-content-between">
          <h3 class="text-700">55.95%</h3>
          <div class="flex align-items-baseline gap-1">
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-orange-200 border-round-xs cursor-pointer hover:bg-orange-500 transition-ease-in-out transition-duration-200"
                style="height: 20px; width: 8px"
              >
                <span>20</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-orange-200 border-round-xs cursor-pointer hover:bg-orange-500 transition-ease-in-out transition-duration-200"
                style="height: 23px; width: 8px"
              >
                <span>23</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-orange-200 border-round-xs cursor-pointer hover:bg-orange-500 transition-ease-in-out transition-duration-200"
                style="height: 52px; width: 8px"
              >
                <span>52</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-orange-200 border-round-xs cursor-pointer hover:bg-orange-500 transition-ease-in-out transition-duration-200"
                style="height: 18px; width: 8px"
              >
                <span>18</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-orange-200 border-round-xs cursor-pointer hover:bg-orange-500 transition-ease-in-out transition-duration-200"
                style="height: 28px; width: 8px"
              >
                <span>28</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-orange-500 border-round-xs cursor-pointer transition-ease-in-out transition-duration-200"
                style="height: 42px; width: 8px"
              >
                <span>42</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 flex align-items-center gap-1">
          <span class="text-cyan-500 font-semibold"
            ><i class="pi pi-arrow-up"></i> <span>6%</span></span
          >
          <span class="text-xs">increase in today sales</span>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-12 xl:col-3">
      <div class="overview-card surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-4 flex justify-content-between align-items-center">
          <span class="font-semibold text-600">Products Sale Rate</span>
          <div
            class="header-button flex align-items-center justify-content-center border-1 border-circle border-transparent text-500 cursor-pointer hover:border-gray-500"
            style="height: 20px; width: 20px; transform: rotate(45deg)"
          >
            <i class="pi pi-arrow-up text-sm"></i>
          </div>
        </div>
        <div class="flex align-items-center justify-content-between">
          <h3 class="text-700">15.37%</h3>
          <div class="flex align-items-baseline gap-1">
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-pink-200 border-round-xs cursor-pointer hover:bg-pink-500 transition-ease-in-out transition-duration-200"
                style="height: 17px; width: 8px"
              >
                <span>17</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-pink-200 border-round-xs cursor-pointer hover:bg-pink-500 transition-ease-in-out transition-duration-200"
                style="height: 39px; width: 8px"
              >
                <span>39</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-pink-200 border-round-xs cursor-pointer hover:bg-pink-500 transition-ease-in-out transition-duration-200"
                style="height: 22px; width: 8px"
              >
                <span>22</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-pink-200 border-round-xs cursor-pointer hover:bg-pink-500 transition-ease-in-out transition-duration-200"
                style="height: 34px; width: 8px"
              >
                <span>34</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-pink-200 border-round-xs cursor-pointer hover:bg-pink-500 transition-ease-in-out transition-duration-200"
                style="height: 28px; width: 8px"
              >
                <span>28</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center">
              <div
                class="tooltip-wrapper bg-pink-500 border-round-xs cursor-pointer transition-ease-in-out transition-duration-200"
                style="height: 52px; width: 8px"
              >
                <span>52</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 flex align-items-center gap-1">
          <span class="text-pink-500 font-semibold"
            ><i class="pi pi-arrow-down"></i> <span>1.1%</span></span
          >
          <span class="text-xs">decrease in today sales</span>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-9">
      <div class="surface-card py-3 px-4 shadow-1 border-round-md">
        <div class="mb-4">
          <h6 class="text-600 text-600">Top Products</h6>
        </div>
        <div id="order-tabs-container" class="flex justify-content-start">
          <div
            class="order-tab cursor-pointer py-2 px-4 border-round-sm mr-4"
            :class="{ 'order-tab-active': activeOrders === 0 }"
            @click="changeDataset($event)"
            data-label="New Sales"
            data-index="0"
            data-stroke="#00acac"
          >
            <h6 class="mb-1 text-color">Current Week</h6>
            <h3 class="m-0" :class="{ 'text-primary': activeOrders === 0 }">$455.55</h3>
          </div>
          <div
            class="order-tab cursor-pointer py-2 px-4 border-round-sm"
            :class="{ 'order-tab-active': activeOrders === 1 }"
            @click="changeDataset($event)"
            data-label="Previous Sales"
            data-index="1"
            data-stroke="#2f8ee5"
          >
            <h6 class="text-600 mb-1 text-color">Previous Week</h6>
            <h3 class="m-0" :class="{ 'text-primary': activeOrders === 1 }">$244.40</h3>
          </div>
        </div>
        <div class="overview-chart">
          <Chart ref="orders" type="line" :data="ordersChart" :options="ordersOptions"></Chart>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-12 xl:col-3">
      <div class="grid">
        <div class="col-12 md:col-6 xl:col-12">
          <div class="surface-card py-3 px-3 shadow-1 border-round-md">
            <div class="flex align-items-center justify-content-between pb-1">
              <h6 class="text-600 mb-0">Traffic</h6>
            </div>
            <span class="font-semibold text-sm text-700">26 May - 27 May</span>
            <div class="flex justify-content-center mt-3">
              <Chart
                ref="traffic"
                type="doughnut"
                :data="trafficChart"
                :options="trafficOptions"
                style="position: relative; width: 50%"
              ></Chart>
            </div>
            <div
              id="traffic-tabs-container"
              class="mt-5 flex gap-2 justify-content-between align-items-center"
            >
              <div
                class="traffic-tab border-round-sm text-center w-full cursor-pointer pt-1 pb-2"
                :class="{ 'traffic-tab-active text-white': activeTraffic === 0 }"
                @click="changeTrafficset($event)"
                data-label="New Sales"
                data-index="0"
              >
                <h6 class="m-0 mb-2 font-semibold" :class="{ 'text-white': activeTraffic === 0 }">
                  48%
                </h6>
                <i class="pi pi-facebook text-3xl"></i>
                <span class="block text-sm mt-2">Facebook</span>
              </div>
              <div
                class="traffic-tab border-round-sm text-center w-full cursor-pointer pt-1 pb-2"
                :class="{ 'traffic-tab-active text-white': activeTraffic === 1 }"
                @click="changeTrafficset($event)"
                data-label="Previous Sales"
                data-index="1"
              >
                <h6 class="m-0 mb-2 font-semibold" :class="{ 'text-white': activeTraffic === 1 }">
                  26%
                </h6>
                <i class="pi pi-twitter text-3xl"></i>
                <span class="block text-sm mt-2">Twitter</span>
              </div>
              <div
                class="traffic-tab border-round-sm text-center w-full cursor-pointer pt-1 pb-2"
                :class="{ 'traffic-tab-active text-white': activeTraffic === 2 }"
                @click="changeTrafficset($event)"
                data-label="Previous Sales"
                data-index="2"
              >
                <h6 class="m-0 mb-2 font-semibold" :class="{ 'text-white': activeTraffic === 2 }">
                  17%
                </h6>
                <i class="pi pi-github text-3xl"></i>
                <span class="block text-sm mt-2">Github</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-6 xl:col-12">
          <div
            class="surface-card py-3 px-4 shadow-1 border-round-md overflow-x-hidden"
            style="background: linear-gradient(134deg, var(--primary-700), var(--primary-500) 99%)"
          >
            <div class="flex align-items-center justify-content-between text-white">
              <h6 class="m-0 text-white">Today's Goal</h6>
              <span><span class="font-semibold">183</span> / <span class="text-sm">255</span></span>
            </div>
            <span class="text-white text-xs">22 June, 2020</span>
            <div class="flex justify-content-center py-4 px-0">
              <Chart
                ref="goal"
                type="pie"
                :data="goalChart"
                :options="goalOptions"
                :style="{ width: '50%' }"
              ></Chart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-4">
      <div class="surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="flex align-items-center justify-content-between pb-2">
          <h6 class="text-600 pb-1 m-0">Leaderboard</h6>
        </div>
        <ul class="m-0 p-0">
          <li
            class="flex align-items-center justify-content-between mt-2 p-1 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/leader-1.png"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600 mr-2">Peter Taylor</p>
            </div>
            <div class="flex align-items-center">
              <h6 class="text-600 m-0 font-semibold mr-3">$224.44</h6>
              <i class="pi pi-arrow-up text-cyan-500"></i>
            </div>
          </li>
          <li
            class="flex align-items-center justify-content-between mt-2 p-1 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/leader-2.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600 mr-2">Nicolina Lindholm</p>
            </div>
            <div class="flex align-items-center">
              <h6 class="text-600 m-0 font-semibold mr-3">$86.05</h6>
              <i class="pi pi-arrow-up text-cyan-500"></i>
            </div>
          </li>
          <li
            class="flex align-items-center justify-content-between mt-2 p-1 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/leader-3.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600 mr-2">Su Hua</p>
            </div>
            <div class="flex align-items-center">
              <h6 class="text-600 m-0 font-semibold mr-3">$59.44</h6>
              <i class="pi pi-arrow-up text-cyan-500"></i>
            </div>
          </li>
          <li
            class="flex align-items-center justify-content-between mt-2 p-1 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/leader-4.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600 mr-2">Maria Illescas</p>
            </div>
            <div class="flex align-items-center">
              <h6 class="text-600 m-0 font-semibold mr-3">$12.32</h6>
              <i class="pi pi-arrow-up text-cyan-500"></i>
            </div>
          </li>
          <li
            class="flex align-items-center justify-content-between mt-2 p-1 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/avatar-dengra.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600 mr-2">Ezequiel Dengra</p>
            </div>
            <div class="flex align-items-center">
              <h6 class="text-600 m-0 font-semibold mr-3">$12.32</h6>
              <i class="pi pi-arrow-up text-cyan-500"></i>
            </div>
          </li>
          <li
            class="flex align-items-center justify-content-between mt-2 p-1 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/avatar-conan.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600 mr-2">Conan Matusov</p>
            </div>
            <div class="flex align-items-center">
              <h6 class="text-600 m-0 font-semibold mr-3">$12.32</h6>
              <i class="pi pi-arrow-up text-cyan-500"></i>
            </div>
          </li>
          <li
            class="flex align-items-center justify-content-between mt-2 p-1 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/seller-1.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600 mr-2">Hector Mariano</p>
            </div>
            <div class="flex align-items-center">
              <h6 class="text-600 m-0 font-semibold mr-3">$12.32</h6>
              <i class="pi pi-arrow-up text-cyan-500"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-4">
      <div class="surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-2">
          <h6 class="text-600 text-600">Product List</h6>
        </div>
        <ul class="p-0 m-0 list-none">
          <li
            class="flex justify-content-between align-items-center mb-4 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/image-product-1.png"
                alt="posedion-layout"
                style="width: 5rem; height: 3rem"
              />
              <div class="mx-3">
                <p class="m-0 text-600">Nike Air X12</p>
                <span class="block text-sm font-normal text-color-secondary"
                  >Sold
                  <span class="font-semibold">250</span>
                  times</span
                >
              </div>
            </div>
            <i class="pi pi-arrow-up text-cyan-500"></i>
          </li>
          <li
            class="flex justify-content-between align-items-center mb-4 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/image-product-2.png"
                alt="posedion-layout"
                style="width: 5rem; height: 3rem"
              />
              <div class="mx-3">
                <p class="m-0 text-600">Nike Sports Watch</p>
                <span class="block text-sm font-normal text-color-secondary"
                  >Sold
                  <span class="font-semibold">189</span>
                  times</span
                >
              </div>
            </div>
            <i class="pi pi-arrow-up text-cyan-500"></i>
          </li>
          <li
            class="flex justify-content-between align-items-center mb-4 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/image-product-3.png"
                alt="posedion-layout"
                style="width: 5rem; height: 3rem"
              />
              <div class="mx-3">
                <p class="m-0 text-600">Heinz Yellow Mustard</p>
                <span class="block text-sm font-normal text-color-secondary"
                  >Sold
                  <span class="font-semibold">24</span>
                  times</span
                >
              </div>
            </div>
            <i class="pi pi-arrow-up text-cyan-500"></i>
          </li>
          <li
            class="flex justify-content-between align-items-center mb-4 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/image-product-4.png"
                alt="posedion-layout"
                style="width: 5rem; height: 3rem"
              />
              <div class="mx-3">
                <p class="m-0 text-600">Beats Headphone</p>
                <span class="block text-sm font-normal text-color-secondary"
                  >Sold
                  <span class="font-semibold">24</span>
                  times</span
                >
              </div>
            </div>
            <i class="pi pi-arrow-down down text-pink-500"></i>
          </li>
          <li
            class="flex justify-content-between align-items-center mb-4 border-round-xs cursor-pointer"
          >
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/image-product-5.png"
                alt="posedion-layout"
                style="width: 5rem; height: 3rem"
              />
              <div class="mx-3">
                <p class="m-0 text-600">Black Racing Bike</p>
                <span class="block text-sm font-normal text-color-secondary"
                  >Sold
                  <span class="font-semibold">24</span>
                  times</span
                >
              </div>
            </div>
            <i class="pi pi-arrow-up text-cyan-500"></i>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-4">
      <div class="surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-2">
          <h6 class="text-600 text-600">Seller List</h6>
        </div>
        <ul class="p-0 m-0 list-none">
          <li class="flex justify-content-between align-items-center mt-2 py-1">
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/seller-1.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600" style="min-width: 100px">Hector Mariano</p>
            </div>
            <span class="text-sm font-semibold text-600">Tier 1</span>
            <Rating :modelValue="val2" :readonly="true" :stars="3"></Rating>
            <Menu ref="menu1" :popup="true" :model="items"></Menu>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-secondary p-button-outlined h-2rem w-2rem"
              @click="$refs.menu1.toggle($event)"
            ></Button>
          </li>
          <li class="flex justify-content-between align-items-center mt-2 py-1">
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/seller-2.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600" style="min-width: 100px">Maria Illescas</p>
            </div>
            <span class="text-sm font-semibold text-600">Tier 2</span>
            <Rating :modelValue="val2" :readonly="true" :stars="3"></Rating>
            <Menu ref="menu2" :popup="true" :model="items"></Menu>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-secondary p-button-outlined h-2rem w-2rem"
              @click="$refs.menu2.toggle($event)"
            ></Button>
          </li>
          <li class="flex justify-content-between align-items-center mt-2 py-1">
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/seller-3.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600" style="min-width: 100px">Ngô Hải Giang</p>
            </div>
            <span class="text-sm font-semibold text-600">Tier 3</span>
            <Rating v-model="val1" :readonly="true" :stars="3"></Rating>
            <Menu ref="menu3" :popup="true" :model="items"></Menu>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-secondary p-button-outlined h-2rem w-2rem"
              @click="$refs.menu3.toggle($event)"
            ></Button>
          </li>
          <li class="flex justify-content-between align-items-center mt-2 py-1">
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/seller-4.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600" style="min-width: 100px">Tamas Bunce</p>
            </div>
            <span class="text-sm font-semibold text-600">Tier 4</span>
            <Rating v-model="val1" :readonly="true" :stars="3"></Rating>
            <Menu ref="menu4" :popup="true" :model="items"></Menu>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-secondary p-button-outlined h-2rem w-2rem"
              @click="$refs.menu4.toggle($event)"
            ></Button>
          </li>
          <li class="flex justify-content-between align-items-center mt-2 py-1">
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/avatar-conan.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600" style="min-width: 100px">Conan Matusov</p>
            </div>
            <span class="text-sm font-semibold text-600">Tier 4</span>
            <Rating v-model="val1" :readonly="true" :stars="3"></Rating>
            <Menu ref="menu5" :popup="true" :model="items"></Menu>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-secondary p-button-outlined h-2rem w-2rem"
              @click="$refs.menu5.toggle($event)"
            ></Button>
          </li>
          <li class="flex justify-content-between align-items-center mt-2 py-1">
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/leader-4.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600" style="min-width: 100px">Maria Illescas</p>
            </div>
            <span class="text-sm font-semibold text-600">Tier 4</span>
            <Rating v-model="val1" :readonly="true" :stars="3"></Rating>
            <Menu ref="menu6" :popup="true" :model="items"></Menu>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-secondary p-button-outlined h-2rem w-2rem"
              @click="$refs.menu6.toggle($event)"
            ></Button>
          </li>
          <li class="flex justify-content-between align-items-center mt-2 py-1">
            <div class="flex align-items-center">
              <img
                src="/demo/images/dashboard/leader-3.png"
                alt="posedion-layout"
                style="width: 2.3rem; height: 2.3rem"
                class="m-0 mr-3"
              />
              <p class="m-0 text-600" style="min-width: 100px">Su Hua</p>
            </div>
            <span class="text-sm font-semibold text-600">Tier 4</span>
            <Rating v-model="val1" :readonly="true" :stars="3"></Rating>
            <Menu ref="menu7" :popup="true" :model="items"></Menu>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-secondary p-button-outlined h-2rem w-2rem"
              @click="$refs.menu7.toggle($event)"
            ></Button>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-4">
      <div class="surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-2">
          <h6 class="text-600 text-600">Tasks</h6>
        </div>
        <div>
          <div class="p-0 pt-2 mb-2">
            <div class="flex justify-content-between align-items-center mb-3">
              <div class="text-color"><span class="font-semibold">12</span> Orders to fulfill</div>
              <div
                class="flex align-items-center justify-content-center border-1 border-circle bg-cyan-100 border-transparent text-500"
                style="height: 28px; width: 28px"
              >
                <i class="pi pi-tag border-circle text-sm text-cyan-600"></i>
              </div>
            </div>
            <div class="border-round-xs surface-300" style="height: 4px">
              <div class="border-round-xs h-full w-6 bg-cyan-500"></div>
            </div>
          </div>
          <div class="p-0 pt-2 mb-2">
            <div class="flex justify-content-between align-items-center mb-3">
              <div class="text-color">
                <span class="font-semibold">40+</span> Payments to withdraw
              </div>
              <div
                class="flex align-items-center justify-content-center border-1 border-circle bg-cyan-100 border-transparent text-500"
                style="height: 28px; width: 28px"
              >
                <i class="pi pi-money-bill border-circle text-sm text-cyan-600"></i>
              </div>
            </div>
            <div class="border-round-xs surface-300" style="height: 4px">
              <div class="border-round-xs h-full w-9 bg-cyan-500"></div>
            </div>
          </div>
          <div class="p-0 pt-2 mb-2">
            <div class="flex justify-content-between align-items-center mb-3">
              <div class="text-color"><span class="font-semibold">4</span> Reports to revise</div>
              <div
                class="flex align-items-center justify-content-center border-1 border-circle bg-orange-100 border-transparent text-500"
                style="height: 28px; width: 28px"
              >
                <i class="pi pi-file border-circle text-sm text-orange-600"></i>
              </div>
            </div>
            <div class="border-round-xs surface-300" style="height: 4px">
              <div class="border-round-xs h-full w-3 bg-orange-500"></div>
            </div>
          </div>
          <div class="p-0 pt-2 mb-2">
            <div class="flex justify-content-between align-items-center mb-3">
              <div class="text-color">
                <span class="font-semibold">6</span> Questions to respond
              </div>
              <div
                class="flex align-items-center justify-content-center border-1 border-circle bg-orange-100 border-transparent text-500"
                style="height: 28px; width: 28px"
              >
                <i class="pi pi-comment border-circle text-sm text-orange-600"></i>
              </div>
            </div>
            <div class="border-round-xs surface-300" style="height: 4px">
              <div class="border-round-xs h-full w-7 bg-orange-500"></div>
            </div>
          </div>
          <div class="p-0 pt-2 mb-2">
            <div class="flex justify-content-between align-items-center mb-3">
              <div class="text-color"><span>2</span> Chargebacks to review</div>
              <div
                class="flex align-items-center justify-content-center border-1 border-circle bg-pink-100 border-transparent text-500"
                style="height: 28px; width: 28px"
              >
                <i class="pi pi-check-square border-circle text-sm text-pink-600"></i>
              </div>
            </div>
            <div class="border-round-xs surface-300" style="height: 4px">
              <div class="border-round-xs h-full w-3 bg-pink-500"></div>
            </div>
          </div>

          <div class="p-0 pt-2 mb-2">
            <div class="flex justify-content-between align-items-center mb-3">
              <div class="text-color"><span class="font-semibold">12</span> Orders to fulfill</div>
              <div
                class="flex align-items-center justify-content-center border-1 border-circle bg-cyan-100 border-transparent text-500"
                style="height: 28px; width: 28px"
              >
                <i class="pi pi-tag border-circle text-sm text-cyan-600"></i>
              </div>
            </div>
            <div class="border-round-xs surface-300" style="height: 4px">
              <div class="border-round-xs h-full w-6 bg-cyan-500"></div>
            </div>
          </div>
          <div class="p-0 pt-2 mb-2">
            <div class="flex justify-content-between align-items-center mb-3">
              <div class="text-color">
                <span class="font-semibold">40+</span> Payments to withdraw
              </div>
              <div
                class="flex align-items-center justify-content-center border-1 border-circle bg-cyan-100 border-transparent text-500"
                style="height: 28px; width: 28px"
              >
                <i class="pi pi-money-bill border-circle text-sm text-cyan-600"></i>
              </div>
            </div>
            <div class="border-round-xs surface-300" style="height: 4px">
              <div class="border-round-xs h-full w-9 bg-cyan-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 xl:col-8">
      <div class="surface-card py-3 px-4 shadow-1 border-round-md h-full">
        <div class="mb-2 pb-1 flex justify-content-between align-items-center">
          <h6>Recent Sales</h6>
          <Dropdown
            :options="orderWeek"
            v-model="selectedOrderWeek"
            optionLabel="name"
            @change="recentSales($event)"
            class="dashbard-demo-dropdown"
            :style="{ 'min-width': '8rem' }"
          ></Dropdown>
        </div>

        <p>Your sales activity over time.</p>

        <DataTable :value="products" :paginator="true" :rows="5" responsiveLayout="scroll">
          <Column field="id" header="ID" :sortable="true" style="min-width: 7rem">
            <template #body="slotProps">
              <span class="p-column-title">Id</span>
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column field="category" header="Category" :sortable="true" style="min-width: 12rem">
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              {{ slotProps.data.category }}
            </template>
          </Column>
          <Column field="price" header="Price" :sortable="true" style="min-width: 12rem">
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="inventoryStatus" header="Status" :sortable="true" style="min-width: 12rem">
            <template #body="slotProps">
              <Tag :severity="getBadgeSeverity(slotProps.data.inventoryStatus)">{{
                slotProps.data.inventoryStatus.toUpperCase()
              }}</Tag>
            </template>
          </Column>
          <Column bodyStyle="text-align: center" style="min-width: 8rem">
            <template #body> <Button type="button" icon="pi pi-search"></Button></template
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
