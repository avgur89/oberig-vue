<template lang="pug">
  Personal
</template>

<script>
  import Personal from '~/components/pages/personal/Personal.vue';
  import pageData from '~/mixins/pageData';

  export default {
    name: 'PersonalPage',
    components: { Personal },
    mixins: [pageData]
  };
</script>
