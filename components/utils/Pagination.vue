<template>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ pagination.from }}</span>
        to
        <span class="font-medium">{{ pagination.to }}</span>
        of
        <span class="font-medium">{{ pagination.total }}</span>
        results
      </p>
    </div>
    <div>
      <nav
        class="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <NuxtLink
          v-if="pagination.current_page > 1"
          :to="{
            name: 'companies-id-cuti-page',
            params: { page: pagination.current_page - 1 },
          }"
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>
        </NuxtLink>

        <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
        <template v-for="link in visiblePages">
          <NuxtLink
            :key="link"
            :to="{ name: 'companies-id-cuti-page', params: { page: link } }"
            :class="{
              'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
                link === pagination.current_page,
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover.bg-gray-50 focus:z-20 focus:outline-offset-0':
                link !== pagination.current_page,
            }"
          >
            {{ link }}
          </NuxtLink>
        </template>

        <NuxtLink
          v-if="pagination.current_page < pagination.last_page"
          :to="{
            name: 'companies-id-cuti-page',
            params: { page: pagination.current_page + 1 },
          }"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      pagination: Object, // Data pagination dari komponen lain
    },
    computed: {
      visiblePages() {
        const currentPage = this.pagination.current_page;
        const lastPage = this.pagination.last_page;
        const maxPages = 5; // Ganti dengan jumlah maksimum halaman yang ingin ditampilkan
        const pages = [];

        for (let i = currentPage - Math.floor(maxPages / 2); i <= currentPage + Math.floor(maxPages / 2); i++) {
          if (i > 0 && i <= lastPage) {
            pages.push(i);
          }
        }

        return pages;
      },
    },
  };
</script>
