<template>
  <div>
    <div
      class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0"
    >
      <!-- Top Section -->
      <section
        class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
      >
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
            <svg
              class="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">Cuti</div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <input
              type="text"
              name=""
              id=""
              class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
              placeholder="Search people, team, project"
            />
          </form>
          <a
            href="#"
            class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
          >
            <img src="/assets/svgs/ic-bell.svg" alt="" />
          </a>
        </div>
      </section>

      <!-- main section -->
      <section class="pt-[50px]">
        <div class="mb-[30px]">
          <div
            class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
          >
            <div>
              <div class="text-xl font-medium text-dark">Daftar Pengajuan Cuti</div>
              <p class="text-grey">Empower company</p>
            </div>
            <NuxtLink :to="{name: 'companies-id-cuti-create'}" class="btn btn-primary"
              >Tambah Cuti</NuxtLink
            >
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left ">
            <thead class="text-base text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3 text-center">No</th>
                <th scope="col" class="px-6 py-3">Nama Pemohon</th>
                <th scope="col" class="px-6 py-3 text-center">Tanggal Awal</th>
                <th scope="col" class="px-6 py-3 text-center">Tanggal Akhir</th>
                <th scope="col" class="px-6 py-3">Nama Pengganti</th>
                <th scope="col" class="px-6 py-3">Alasan</th>
                <th scope="col" class="px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <!-- Loading -->
            <Loading v-if="loading" />

            <tbody v-else>
              <tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-100" v-for="(cuti, index) in cutis.result.data" :key="index">
                <td class="w-4 p-4">
                  <div class="flex items-center justify-center">{{ startIndex + index }}</div>
                </td>
                <th
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="">
                    <div class="text-base font-semibold text-black">{{ cuti.name_karyawan_pemohon }}</div>
                    <div class="font-normal text-gray-500">
                      {{ cuti.team_pemohon }}
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4 text-center">{{ formatTanggal(cuti.tgl_awal) }}</td>
                <td class="px-6 py-4 text-center">{{ formatTanggal(cuti.tgl_akhir) }}</td>
                <th
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="">
                    <div class="text-base font-semibold text-black">{{ cuti.name_karyawan_pengganti }}</div>
                    <div class="font-normal text-gray-500">
                      {{ cuti.team_pengganti }}
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4 justify-center">{{ cuti.alasan }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div v-if="cuti.status == 'Submitted'"
                      class="h-2.5 w-2.5 rounded-full bg-purple-500 mr-2"
                    ></div>
                    <div v-if="cuti.status == 'Rejected'"
                      class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"
                    ></div>
                    <div v-if="cuti.status == 'Pending'"
                      class="h-2.5 w-2.5 rounded-full bg-warning-500 mr-2"
                    ></div>
                    <div v-if="cuti.status == 'Pending Approval'"
                      class="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"
                    ></div>
                    <div v-if="cuti.status == 'Approved'"
                      class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"
                    ></div>
                    <div v-if="cuti.status == 'Cancelled'"
                      class="h-2.5 w-2.5 rounded-full bg-black-500 mr-2"
                    ></div>
                    {{ cuti.status }}
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <a
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline text-center"
                    @click="openModal(cuti.id)"
                    >preview</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- pagination  -->
        <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <Pagination :pagination="pagination" />
        </div>

      </section>
    </div>

    <!-- Gunakan komponen modal -->
    <ModalPreviewImage :is-open="isModalOpen" :on-toggle="closeModal">
      <div class="mt-3 text-center sm:ml-2 sm:mt-0 sm:text-left">
        <h2 class="text-base font-semibold leading-8 text-gray-900" id="modal-title">Preview File Pendukung : </h2>
        <div class="md:min-h-auto">
          <div class="mt-2" v-if="DataImageModal">
            <img :src="api_image_url+'/'+DataImageModal.replace('public', 'storage')" alt="" class="rounded-lg w-auto"/>
          </div>

          <div v-else class="text-center py-10 items-center content-center">
              <div class="text-base font-bold text-gray-500">
                  No Documents
              </div>
              <p class="text-grey mt-5 mb-[30px]">
                  Tidak terdapat dokumen pendukung <br>
                  pada pengajuan cuti ini.
              </p>
          </div>
        </div>
      </div>
    </ModalPreviewImage>

  </div>
</template>


<script>
import Pagination from "@/components/utils/Pagination.vue"; // Sesuaikan dengan path komponen Pagination Anda
import Loading from "@/components/utils/Loading.vue";
import ModalPreviewImage from "@/components/utils/modals/previewImage.vue";

export default {
  layout: 'dashboard',
  middleware: 'auth',
  components: {
    Pagination,
    Loading,
    ModalPreviewImage
  },
  data() {
    return {
      loading: true,
      isModalOpen: false,
      cutis: [],
      pagination: [],
      DataImageModal: null,
      api_image_url: process.env.API_IMAGE_URL,
    }
  },
  computed: {
    startIndex() {
      const itemsPerPage = 10; // Ganti dengan jumlah item per halaman
      const currentPage = this.pagination.current_page; // Ganti dengan halaman saat ini

      return (currentPage - 1) * itemsPerPage + 1;
    },
  },
  methods: {
    formatTanggal(value) {
      const date = new Date(value);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(0);
      return `${day}-${month}-${year}`;
    },
    async openModal(id) {
      const response = await this.$axios.get('/cuti', {
        params: {
          company_id: this.$route.params.id,
          id: id,
        }
      });
      if (response.data.result.total !== 0) {
        this.DataImageModal = response.data.result.data[0].file_pendukung;
      }

      this.isModalOpen = true;
    },
    closeModal() {
      this.DataImageModal = null;
      this.isModalOpen = false;
    },
  },
  async fetch() {
    const page = this.$route.params.page || 1;

    const response = await this.$axios.get('/cuti', {
      params: {
        company_id: this.$route.params.id,
        limit: 10,
        page: page,
      }
    })

    if (response.data && response.data.result) {
      this.loading = false;
      this.cutis = response.data;
      this.pagination = {
        current_page: response.data.result.current_page,
        from: response.data.result.from,
        links: response.data.result.links,
        next_page_url: response.data.result.next_page_url,
        per_page: response.data.result.per_page,
        prev_page_url: response.data.result.prev_page_url,
        to: response.data.result.to,
        total: response.data.result.total,
        last_page: response.data.result.last_page
      }
    }

  }
}
</script>
