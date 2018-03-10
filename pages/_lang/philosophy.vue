<template lang="pug">
  Philosophy
</template>

<script>
  import Philosophy from '../../components/pages/philosophy/Philosophy.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'PhilosophyPage',
    components: { Philosophy },
    mixins: [pageData]
  };
</script>
