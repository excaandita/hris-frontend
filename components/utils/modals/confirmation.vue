<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center">
      <div @click="onToggle" class="absolute bg-black opacity-70 inset-0 z-0"></div>
      <div class="w-full max-w-lg p-3 relative rounded-xl shadow-lg bg-white">
        <!-- Isi modal disini -->
        <div>
          <div class="text-center p-3 flex-auto justify-center leading-6">
            <!-- Konten modal -->
            <h2 class="text-2xl font-bold py-4">Are you sure?</h2>
            <p class="text-md text-gray-500 px-8">
              Do you really want to exit without saving your work?
            </p>
          </div>
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button
              class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
            >
              Save
            </button>
            <button
              @click="onToggle"
              class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
            >
              Close
            </button>
          </div>
        </div>
        <!-- /Isi modal -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onToggle: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style scoped>
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 500ms ease-out;
  }
</style>
