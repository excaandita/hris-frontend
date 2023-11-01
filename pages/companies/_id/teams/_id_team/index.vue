<template>
  <div>
    <!-- Main Content -->
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
          <div class="text-[32px] font-semibold text-dark">My Teams</div>
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

      <section class="pt-[50px]">
        <div class="grid md:grid-cols-2 gap-11">
          <div>
            <!-- Section Header -->
            <div class="mb-[30px]">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <div class="text-xl font-medium text-dark">Documents</div>
                  <p class="text-grey">Standard procedure</p>
                </div>
              </div>
            </div>
            <div class="card md:min-h-[468px] max-w-full">
              <div class="m-auto text-center">
                <div class="text-xl font-bold text-dark">No Documents</div>
                <p class="text-grey mt-5 mb-[30px]">
                  Add guidance or design style for <br />
                  your employees in company
                </p>
                <button type="button" class="btn btn-primary">
                  Upload File
                </button>
              </div>
            </div>
          </div>

          <!-- History -->
          <div>
            <!-- Section Header -->
            <div class="mb-[30px]">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <div class="text-xl font-medium text-dark">Employees</div>
                  <p class="text-grey">Who's in this team</p>
                </div>
              </div>
            </div>
            <div class="card min-h-[468px] max-w-full">
              <div class="m-auto text-center" v-if="employees.length < 1">
                <div class="text-xl font-bold text-dark">No Employees</div>
                <p class="text-grey mt-5 mb-[30px]">
                  Information of employees added <br />
                  and promoting shown here
                </p>
                <!-- <button type="button" class="btn btn-primary">
                    Upload File
                </button> -->
              </div>
              <!-- Item -->
              <div
                v-else
                class="flex items-center justify-between pb-5 border-b border-gray-100"
                v-for="employee in employees"
                :key="employee.id"
              >
                <div class="flex items-center gap-4">
                  <img src="/assets/images/user-f-1.png" width="60" alt="" />
                  <div>
                    <div class="mb-1 font-semibold text-dark">
                      {{ employee.name }}
                    </div>
                    <p class="text-sm text-grey">{{ employee.role.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      team: {},
      employees: [],
    }
  },
  async fetch() {
    const response = await this.$axios.get(
      '/team/detail/' + this.$route.params.id_team
    )

    if (response.data && response.data.result) {
      this.employees = response.data.result.employees
      this.team = response.data.result.team
    }
  },
}
</script>
