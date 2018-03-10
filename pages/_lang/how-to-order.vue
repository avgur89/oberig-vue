<template lang="pug">
  HowToOrder
</template>

<script>
  import HowToOrder from '../../components/pages/how-to-order/HowToOrder.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'HowToOrderPage',
    components: { HowToOrder },
    mixins: [pageData]
  };
</script>
