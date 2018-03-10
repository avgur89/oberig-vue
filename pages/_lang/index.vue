<template lang="pug">
  Home
</template>

<script>
  import Home from '../../components/pages/home/Home.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'IndexPage',
    mixins: [pageData],
    components: { Home }
  };
</script>
