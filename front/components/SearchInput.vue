<template>
  <div class="mb-4">
    <div class="w-full">
      <div class="relative ml-10">
        <input
          type="text"
          placeholder="Пошук житла за адресою"
          class="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6a6 6 0 100 12 6 6 0 000-12zm0 0v4m0 0l2-2m-2 2l-2-2"
            />
          </svg>
        </div>
        <button
          class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/styles.css";

.search-wrapper {
  padding: 0 16px;
}

.custom-search-input {
  margin-top: 40px;
}
</style>
