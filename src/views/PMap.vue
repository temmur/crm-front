<template>
  <div class="flex h-[calc(100vh-64px)]">
    <!-- Left: Map -->
    <div class="relative flex-1">
      <!-- Top controls -->
      <div class="absolute z-[1000] top-4 left-1/2 -translate-x-1/2 w-[min(720px,92vw)]">
        <div class="rounded-2xl shadow-xl bg-white/90 backdrop-blur p-3 border border-gray-100">
          <div class="flex flex-wrap items-center gap-2">
            <!-- Search -->
            <div class="flex-1 min-w-[220px]">
              <div class="relative">
                <input
                    v-model="query"
                    type="text"
                    placeholder="Search address or place"
                    class="w-full rounded-xl border border-gray-200 bg-white px-10 py-2.5 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
                    @input="debouncedSearch"
                />
                <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 opacity-60"></i>
                <button
                    v-if="query"
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100"
                    @click="clearSearch"
                >
                  <i class="pi pi-times"></i>
                </button>
              </div>

              <!-- Autocomplete -->
              <ul
                  v-if="suggestions.length"
                  class="mt-2 max-h-56 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg"
              >
                <li
                    v-for="s in suggestions"
                    :key="s.place_id"
                    class="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                    @click="goToSuggestion(s)"
                >
                  {{ s.display_name }}
                </li>
              </ul>
            </div>

            <!-- Buttons -->
            <div class="flex items-center gap-2">
              <button class="btn" @click="locateMe"><i class="pi pi-compass mr-2"></i>Locate me</button>
              <button
                  class="btn"
                  :class="addMode ? 'btn-emerald' : 'btn-white'"
                  @click="toggleAddMode"
              >
                <i class="pi pi-map-marker mr-2"></i>{{ addMode ? 'Click on map to add' : 'Add marker mode' }}
              </button>
              <button class="btn btn-white" @click="fitAll"><i class="pi pi-arrows-alt mr-2"></i>Fit</button>
              <button class="btn btn-danger" @click="clearAll"><i class="pi pi-trash mr-2"></i>Clear</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Map container -->
      <div ref="mapEl" class="absolute inset-0 rounded-none sm:rounded-r-2xl"></div>
    </div>

    <!-- Right: Details panel -->
    <aside class="w-full sm:w-96 border-l border-gray-200 bg-white h-full overflow-auto">
      <div class="p-4 sm:p-6 space-y-6">
        <h2 class="text-lg font-semibold">Markers ({{ markers.length }})</h2>

        <div
            v-if="!markers.length"
            class="text-sm text-gray-500 rounded-xl border border-dashed border-gray-300 p-4"
        >
          No markers yet. Use <b>Add marker mode</b> and click on the map, or search a place.
        </div>

        <ul class="space-y-3">
          <li
              v-for="m in markers"
              :key="m.id"
              class="flex items-start justify-between rounded-xl border border-gray-200 p-3 hover:shadow-sm"
          >
            <div class="text-sm">
              <div class="font-medium">{{ m.title || 'Marker' }}</div>
              <div class="text-gray-500">Lat: {{ m.lat.toFixed(6) }}, Lng: {{ m.lng.toFixed(6) }}</div>
            </div>
            <div class="flex items-center gap-2">
              <button class="iconbtn" @click="flyTo(m)"><i class="pi pi-directions"></i></button>
              <button class="iconbtn danger" @click="removeMarker(m.id)"><i class="pi pi-times"></i></button>
            </div>
          </li>
        </ul>

        <div v-if="markers.length >= 2" class="pt-4 border-t border-gray-200">
          <h3 class="text-sm font-semibold mb-2">Quick measure</h3>
          <p class="text-sm text-gray-600">
            Distance between the last two markers:
          </p>
          <div class="mt-2 text-base font-semibold">
            {{ prettyKm(distanceBetweenLastTwo) }}
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue'
import 'primeicons/primeicons.css'

// Leaflet will be lazy-loaded to avoid SSR/build hiccups
let L: any = null

type Place = {
  place_id: number
  lat: string
  lon: string
  display_name: string
}

type UIMarker = {
  id: string
  lat: number
  lng: number
  title?: string
  lf?: any
}

const mapEl = ref<HTMLDivElement | null>(null)
const map = ref<any | null>(null)
const markers = reactive<UIMarker[]>([])

const addMode = ref(false)

// --- Search ---
const query = ref('')
const suggestions = ref<Place[]>([])
let searchTimer: any = null

const debouncedSearch = () => {
  clearTimeout(searchTimer)
  if (!query.value.trim()) {
    suggestions.value = []
    return
  }
  searchTimer = setTimeout(runSearch, 400)
}

async function runSearch() {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query.value
    )}`
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
    const data = await res.json()
    suggestions.value = data.slice(0, 8)
  } catch (e) {
    console.error('Search failed', e)
  }
}

function clearSearch() {
  query.value = ''
  suggestions.value = []
}

function goToSuggestion(s: Place) {
  clearSearch()
  const lat = Number(s.lat)
  const lng = Number(s.lon)
  map.value?.setView([lat, lng], 15)
  addMarker(lat, lng, s.display_name)
}

// --- Map init ---
onMounted(async () => {
  const m = await ensureLeaflet()
  if (!mapEl.value) return

  map.value = m.map(mapEl.value, {
    center: [41.3111, 69.2797], // default to Tashkent
    zoom: 12,
    zoomControl: true
  })

  m
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
      })
      .addTo(map.value)

  // ensure map is rendered correctly (fix for hidden/animated containers)
  setTimeout(() => {
    map.value.invalidateSize?.()
  }, 100)

  map.value.on('click', (ev: any) => {
    if (!addMode.value) return
    const { lat, lng } = ev.latlng
    addMarker(lat, lng, 'New marker')
  })
})

onBeforeUnmount(() => {
  map.value?.remove?.()
})

// --- Marker helpers ---
function addMarker(lat: number, lng: number, title?: string) {
  if (!map.value || !L) return
  const marker = L.marker([lat, lng], { draggable: true })
      .addTo(map.value)
      .bindPopup(`<b>${title || 'Marker'}</b><br/>${lat.toFixed(6)}, ${lng.toFixed(6)}`)

  const id = cryptoRandom()
  const m: UIMarker = { id, lat, lng, title, lf: marker }
  markers.push(m)

  marker.on('dragend', () => {
    const pos = marker.getLatLng()
    m.lat = pos.lat
    m.lng = pos.lng
    marker.setPopupContent(
        `<b>${m.title || 'Marker'}</b><br/>${m.lat.toFixed(6)}, ${m.lng.toFixed(6)}`
    )
  })
}

function removeMarker(id: string) {
  const idx = markers.findIndex(m => m.id === id)
  if (idx >= 0) {
    markers[idx].lf?.remove()
    markers.splice(idx, 1)
  }
}

function flyTo(m: UIMarker) {
  map.value?.flyTo([m.lat, m.lng], Math.max(map.value?.getZoom?.() ?? 13, 15))
  m.lf?.openPopup()
}

function fitAll() {
  if (!map.value || !L || markers.length === 0) return
  const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]))
  map.value.fitBounds(bounds, { padding: [40, 40] })
}

function clearAll() {
  markers.forEach(m => m.lf?.remove())
  markers.splice(0, markers.length)
}

// --- Modes & UX ---
function toggleAddMode() {
  addMode.value = !addMode.value
}

// --- Geolocation ---
function locateMe() {
  if (!map.value || !L) return
  map.value.locate({ setView: true, maxZoom: 16 })
  map.value.once('locationfound', (e: any) => {
    addMarker(e.latlng.lat, e.latlng.lng, 'My location')
  })
  map.value.once('locationerror', () => {
    alert('Location permission denied')
  })
}

// --- Distance helper (last two markers) ---
const distanceBetweenLastTwo = computed(() => {
  if (markers.length < 2) return 0
  const a = markers[markers.length - 2]
  const b = markers[markers.length - 1]
  return haversine(a.lat, a.lng, b.lat, b.lng)
})

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3 // meters
  const toRad = (d: number) => (d * Math.PI) / 180
  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1)
  const Δλ = toRad(lon2 - lon1)
  const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // meters
}

function prettyKm(meters: number) {
  if (!meters) return '0 m'
  if (meters < 1000) return `${meters.toFixed(0)} m`
  return `${(meters / 1000).toFixed(2)} km`
}

// --- Leaflet loader + icon fix for Vite bundlers ---
async function ensureLeaflet() {
  if (L) return L
  const mod = await import('leaflet')
  L = mod.default || mod

  // load CSS (important)
  await import('leaflet/dist/leaflet.css')

  // Fix default marker icons in bundlers (Vite)
  try {
    const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString()
    const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString()
    const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString()
    L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })
  } catch (e) {
    // ignore if URL construction fails in some environments
    console.warn('Could not set leaflet icon URLs statically', e)
  }

  return L
}

// --- utils ---
function cryptoRandom() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-ignore
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}
</script>

<style scoped>
/* Minimal helper classes when not using @apply or if Tailwind utilities are missing */
.btn {
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
  font-weight: 500;
}
.btn-white {
  background: white;
}
.btn-emerald {
  background: #10b981;
  color: white;
}
.btn-danger {
  background: #ef4444;
  color: white;
}
.iconbtn {
  padding: 0.375rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}
.iconbtn.danger {
  color: #ef4444;
}
</style>

