<template>
  <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-5">
    <header class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <button @click="prevMonth" class="p-2 rounded-lg hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>

        <div>
          <p class="text-lg font-semibold">{{ monthName }} {{ currentYear }}</p>
          <p class="text-xs text-gray-500">{{ rangeLabel }}</p>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <button @click="today" class="px-3 py-1 text-sm rounded-md border">Today</button>
        <button @click="nextMonth" class="p-2 rounded-lg hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 mb-2">
      <div v-for="d in weekDays" :key="d" class="font-medium">{{ d }}</div>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div v-for="day in calendarDays" :key="day.key" class="h-20 p-2 rounded-lg relative"
           :class="dayCellClass(day)">

        <div class="flex items-start justify-between">
          <span class="text-sm font-medium">{{ day.date.getDate() }}</span>
          <span v-if="isToday(day.date)" class="text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white">Now</span>
        </div>

        <div class="mt-2 space-y-1">
          <template v-for="(ev, i) in eventsFor(day.date).slice(0,2)" :key="i">
            <div class="text-xs truncate" :title="ev.title">• {{ ev.title }}</div>
          </template>

          <div v-if="eventsFor(day.date).length > 2" class="text-xs text-gray-400">+{{ eventsFor(day.date).length - 2 }} more</div>
        </div>

        <button @click="$emit('day-click', day.date)" class="absolute inset-0"></button>
      </div>
    </div>

    <footer class="mt-4 text-xs text-gray-500">Click a day to emit an event. Pass events prop: [{date: '2025-10-25', title: 'Event'}]</footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // events: array of { date: 'YYYY-MM-DD' or Date, title: string }
  events: { type: Array, default: () => [] }
})

const month = ref(new Date().getMonth())
const year = ref(new Date().getFullYear())

const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const monthName = computed(() => new Date(year.value, month.value).toLocaleString(undefined, { month: 'long' }))
const currentYear = computed(() => year.value)

function startOfMonth(y, m) { return new Date(y, m, 1) }
function endOfMonth(y, m) { return new Date(y, m + 1, 0) }

const calendarDays = computed(() => {
  const start = startOfMonth(year.value, month.value)
  const end = endOfMonth(year.value, month.value)

  const startIndex = start.getDay() // 0-6
  const days = []

  // previous month's trailing days
  for (let i = startIndex - 1; i >= 0; i--) {
    const d = new Date(year.value, month.value, -i)
    days.push({ date: d, inMonth: false, key: `p-${d.toISOString()}` })
  }

  // current month days
  for (let d = 1; d <= end.getDate(); d++) {
    const dt = new Date(year.value, month.value, d)
    days.push({ date: dt, inMonth: true, key: `c-${dt.toISOString()}` })
  }

  // fill next month days to complete grid (42 cells max)
  while (days.length % 7 !== 0) {
    const nextIndex = days.length - startIndex + 1
    const d = new Date(year.value, month.value + 1, nextIndex)
    days.push({ date: d, inMonth: false, key: `n-${d.toISOString()}` })
  }

  return days
})

const eventsNormalized = computed(() => {
  return props.events.map(e => {
    const d = (typeof e.date === 'string') ? new Date(e.date) : new Date(e.date)
    // normalize to yyyy-mm-dd
    const key = d.toISOString().slice(0,10)
    return { ...e, _date: d, _key: key }
  })
})

function eventsFor(date) {
  const key = date.toISOString().slice(0,10)
  return eventsNormalized.value.filter(e => e._key === key)
}

function isToday(date) {
  const now = new Date()
  return now.toISOString().slice(0,10) === date.toISOString().slice(0,10)
}

function dayCellClass(day) {
  const base = 'border border-transparent'
  if (!day.inMonth) return base + ' text-gray-400 bg-gray-50'
  if (isToday(day.date)) return base + ' bg-gradient-to-br from-indigo-50 to-white border-indigo-200'
  return base + ' hover:bg-gray-50'
}

const rangeLabel = computed(() => {
  const s = calendarDays.value[0]?.date
  const e = calendarDays.value[calendarDays.value.length - 1]?.date
  if (!s || !e) return ''
  return `${s.toLocaleDateString()} — ${e.toLocaleDateString()}`
})

function prevMonth() {
  if (month.value === 0) { month.value = 11; year.value-- } else month.value--
}
function nextMonth() {
  if (month.value === 11) { month.value = 0; year.value++ } else month.value++
}
function today() {
  const now = new Date(); month.value = now.getMonth(); year.value = now.getFullYear()
}
</script>

<style scoped>
/* small upgrade for nicer scroll on mobile */
:root { --card-bg: white }
</style>

