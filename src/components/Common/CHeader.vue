<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-100">
    <!-- Left: Search Input -->
    <div class="flex items-center space-x-3 w-full max-w-md">
      <div class="relative w-full">
        <input
            type="text"
            placeholder="Search..."
            class="w-full rounded-2xl bg-gray-100 pl-10 pr-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all duration-200"
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z" />
        </svg>
      </div>
    </div>

    <!-- Right: Buttons -->
    <div class="flex items-center space-x-4">
      <button
          class="px-5 py-2 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200"
      >
        Sign In
      </button>
      <button
          class="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
      >
        Sign Up
      </button>
    </div>
  </header>
</template>

