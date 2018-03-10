<template lang="pug">
  Error
</template>

<script>
  import Error from '../../components/pages/error/Error.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'ErrorPage',
    components: { Error },
    mixins: [pageData]
  };
</script>
