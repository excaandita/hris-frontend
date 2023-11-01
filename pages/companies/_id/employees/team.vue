<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Add to Team</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Add your new people to grow the <br />
      company reaching their goals
    </p>
    <div
      class="w-full card !max-w-[560px] sm:!flex-row items-center justify-between"
    >
      <div class="flex flex-row items-center gap-4">
        <img src="/assets/images/user-f-1.png" width="70" alt="" />
        <div>
          <div class="text-lg font-semibold">{{ this.$store.state.employee.name }}</div>
          <p class="text-base text-grey">{{ this.$store.state.employee.email }}</p>
        </div>
      </div>
      <p class="text-right text-grey">{{ this.$store.state.employee.role_name }}</p>
    </div>

    <!-- Your Teams -->
    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Your Teams</div>
            <p class="text-grey">Improve your growth</p>
          </div>
        </div>
      </div>

      <form>
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3 mb-[50px]"
        >
          <p v-if="$fetchState.pending">Fetching Responsibility...</p>

          <div v-else class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0" v-for="team in teams.result.data" :key="team.id">
            <input
              type="radio"
              name="productGrowth"
              id="productGrowth"
              class="absolute inset-0 checked:ring-2 ring-primary rounded-[26px] appearance-none"
              :value="team.id"
              @click="updateTeamId"
            />
            <img :src="team.icon ? team.icon : 'https://via.placeholder.com/640x480.png/00cc88?text='+team.name+' '" class="w-24" alt="" />
            <div class="mt-6 mb-1 font-semibold text-center text-dark">
              {{ team.name }}
            </div>
            <p class="text-center text-grey">{{ team.employees_count }} People</p>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            @click="createEmployee()"
            type="button"
            id="continueBtn"
            class="btn btn-primary"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'form',
  middleware: 'auth',
  data() {
    return {
      teams: [],
    }
  },
  async fetch() {
    const response = await this.$axios.get('/team', {
      params: {
        company_id: this.$route.params.id,
        limit: 10
      }
    })

    if (response.data && response.data.result) {
      this.teams = response.data;
    }
  },
  computed: {
    team_id() {
      return this.$store.state.employee.team_id
    },
  },
  methods: {
    updateTeamId(event) {
      this.$store.commit('employee/updateTeamId', event.target.value)
    },
    async createEmployee() {
      try {
        // send employee create data to server api
        let response = await this.$axios.post('/employee', {
          'name': this.$store.state.employee.name,
          'email': this.$store.state.employee.email,
          'gender': this.$store.state.employee.gender,
          'age': this.$store.state.employee.age,
          'team_id': this.$store.state.employee.team_id,
          'role_id': this.$store.state.employee.role_id,
          'phone': this.$store.state.employee.phone,
        })

        // clear vuex
        this.$store.commit('employee/updateName', '')
        this.$store.commit('employee/updateEmail', '')
        this.$store.commit('employee/updateAge', '')
        this.$store.commit('employee/updateGender', '')
        this.$store.commit('employee/updatePhone', '')
        this.$store.commit('employee/updateTeamId', '')
        this.$store.commit('employee/updateRoleId', '')
        this.$store.commit('employee/updateRoleName', '')

        // redirect to employee page
        this.$router.push({
          name: 'companies-id-employees'
        })

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>
