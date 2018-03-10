<template lang="pug">
  Boutiques
</template>

<script>
  import Boutiques from '../../components/pages/boutiques/Boutiques.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'BoutiquesPage',
    components: { Boutiques },
    mixins: [pageData]
  };
</script>
