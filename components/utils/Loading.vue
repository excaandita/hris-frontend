<template>
  <div>
    <RotatingPlaneSpinner :loading="isLoading" />
  </div>
</template>

<script>
import { RotatingPlaneSpinner } from 'vue-spinners';

export default {
  components: {
    RotatingPlaneSpinner
  },
  data() {
    return {
      isLoading: true, // Atur menjadi true saat data sedang diambil
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
};
</script>
