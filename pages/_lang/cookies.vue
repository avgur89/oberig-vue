<template lang="pug">
  Cookies
</template>

<script>
  import Cookies from '../../components/pages/cookies/Cookies.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'CookiesPage',
    components: { Cookies },
    mixins: [pageData]
  };
</script>
