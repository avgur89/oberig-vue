<template lang="pug">
  Services
</template>

<script>
  import Services from '~/components/pages/services/Services.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'ServicesPage',
    components: { Services },
    mixins: [pageData]
  };
</script>
