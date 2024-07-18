<template>
  <div class="deals-page container">
    <h2>Choise deal</h2>
    <!-- <deal-list :deals="deals" /> -->
    <div v-for="deal in deals" :key="id">{{ deal }}</div>
  </div>
</template>

<script>
// import DealsList from '../components/DealsList';

export default {
  // components: { DealsList},
  data() {
    return {
      deals: [],
    };
  },
  created() {
    this.$load(async () => {
      this.deals = (await this.$api.deals.getAllDeals()).data;
      console.log(this.deals);
    });
  },
};
</script>

<style scoped>
h2 {
  font-size: 40px;
  color: #fff;
  margin-bottom: 30px;
}
</style>
