<template>
  <div>
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
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
        <div class="card md:min-h-[468px] max-w-full">
          <form @submit.prevent="createCuti">
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <div class=" flex justify-between items-center">
                  <div>
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Pengajuan Cuti</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
                  </div>
                  <a href="#" onclick="history.back()">
                    <img src="/assets/svgs/ric-close-white.svg" alt="" />
                  </a>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Karyawan Pemohon</label>
                    <div class="mt-2">
                      <multiselect
                        v-model="cuti.id_karyawan_pemohon"
                        :options="optionsKaryawanPemohon"
                        label="name"
                        :trackBy="id"
                        placeholder="Pilih opsi"
                        :searchable="true"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Karyawan Pengganti</label>
                    <div class="mt-2">
                      <multiselect
                        v-model="cuti.id_karyawan_pengganti"
                        :options="optionsKaryawanPengganti"
                        label="name"
                        :track-by="age"
                        placeholder="Pilih opsi"
                        :searchable="true"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Jenis Cuti</label>
                    <div class="mt-2">
                      <multiselect
                        v-model="cuti.jenis_cuti"
                        :options="optionsJenisCuti"
                        :track-by="name"
                        placeholder="Pilih opsi"
                        :searchable="true"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-1">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Tanggal Awal Cuti</label>
                    <div class="mt-2">
                      <input v-model="cuti.tgl_awal" id="tgl_awal" name="tgl_awal" type="date" autocomplete="date" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div class="sm:col-span-1">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Tanggal Akhir Cuti</label>
                    <div class="mt-2">
                      <input v-model="cuti.tgl_akhir" id="tgl_akhir" name="tgl_akhir" type="date" autocomplete="date" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Alasan</label>
                    <div class="mt-2">
                      <textarea v-model="cuti.alasan" id="alasan" name="alasan" rows="3" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                  </div>

                  <div class="col-span-full">
                    <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Dokumen Pendukung</label>
                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div class="text-center">
                        <div v-if="selectedFileName" class="items-center card py-4 md:!py-4 md:!px-[5px] w-48 !gap-y-0 border border-gray-300 shadow-xl" >
                          <img :src="selectedFileData" alt="Uploaded File" class="w-40 h-32 rounded-lg" />
                          <div class="mt-3   w-32 text-center text-dark">
                            {{ selectedFileName }}
                          </div>
                        </div>

                        <DocumentAddIcon v-else class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div class="justify-center mt-4 flex text-sm leading-6 text-gray-600">
                          <label for="file-upload" class="justify-center relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span >Upload a file</span>
                          </label>
                        </div>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileUpload" ref="fileInput"/>
                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
              <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { DocumentAddIcon } from "@vue-hero-icons/solid"
  import Multiselect from 'vue-multiselect';
  import 'vue-multiselect/dist/vue-multiselect.min.css'; // Import CSS styles

  export default {
    layout: 'dashboard',
    middleware: 'auth',
    components: {
      DocumentAddIcon,
      Multiselect,
    },
    data() {
      return {
        selectedFileName: null,
        selectedFileData: null,
        optionsKaryawanPemohon: [],
        optionsKaryawanPengganti: [],
        optionsJenisCuti: [
          'Tahunan',
          'Melahirkan',
          'Sakit',
          'Lembur',
        ],
        cuti: {
          id_karyawan_pemohon: '',
          id_karyawan_pengganti: '',
          jenis_cuti: '',
          tgl_awal: '',
          tgl_akhir: '',
          alasan: '',
          file_pendukung: '',
        }
      }
    },

    created() {
      this.employeesFetch()
    },
    methods: {
      //untuk panggil autocomplete karyawan
      employeesFetch() {
        this.$axios.get('/employee', {
          params: {
            company_id: this.$route.params.id,
          },
        })
        .then(({data}) => {
          this.optionsKaryawanPemohon = data.result.data
          this.optionsKaryawanPengganti = data.result.data
        })
        .catch((error) => {
          console.error("Gagal mendapatkan data:", error);
        });
      },
      //function create cuti
      async createCuti() {
        try {
          //append valuue to formData
          let formData = new FormData();
          formData.append('id_karyawan_pemohon', this.cuti.id_karyawan_pemohon.id);
          formData.append('id_karyawan_pengganti', this.cuti.id_karyawan_pengganti.id);
          formData.append('jenis_cuti', this.cuti.jenis_cuti);
          formData.append('tgl_awal', this.cuti.tgl_awal);
          formData.append('tgl_akhir', this.cuti.tgl_akhir);
          formData.append('alasan', this.cuti.alasan);
          formData.append('file_pendukung', this.cuti.file_pendukung);
          formData.append('status', 'Submitted');

          // send data to server
          let response = await this.$axios.post('/cuti', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Pastikan Anda mengatur tipe konten sebagai multipart/form-data
            },
          })

          //redirect to cuti page
          if(response.data.meta.code == 200) {
            this.$router.push({name: 'companies-id-cuti-page', params: {page:1} })
          }
        } catch (error) {
          console.log(error)
        }
      },
      handleFileUpload(event) {
        const fileInput = this.$refs.fileInput;
        if (fileInput.files.length > 0) {
          this.selectedFileName = fileInput.files[0].name;
          this.selectedFileData = URL.createObjectURL(fileInput.files[0]);
          this.cuti.file_pendukung = event.target.files[0];
        } else {
          this.selectedFileName = null;
          this.selectedFileData = null;
        }
      },
    }
  }

</script>

