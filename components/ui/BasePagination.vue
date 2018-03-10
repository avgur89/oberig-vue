<template lang="pug">
  nav.BasePagination(v-if="data.total > data.per_page")
    ul.BasePagination__inner(v-if="data.last_page <= 5")
      li.BasePagination__item(
        v-for="page in data.last_page",
        :key="page",
        :class="getActiveClass(page)",
        @click="changePage(page)"
      ) {{ page }}
    ul.BasePagination__inner(v-else)
      template(v-if="hasPaginationStart")
        li.BasePagination__item(
          :class="getActiveClass(1)",
          @click="changePage(1)"
        ) {{ 1 }}
        .BasePagination__dots ...
      li.BasePagination__item(
        v-for="page in visiblePages",
        :key="page",
        :class="getActiveClass(page)",
        @click="changePage(page)"
      ) {{ page }}
      template(v-if="hasPaginationEnd")
        .BasePagination__dots ...
        li.BasePagination__item(
          :class="getActiveClass(data.last_page)",
          @click="changePage(data.last_page)"
        ) {{ data.last_page }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import queryProductChange from '../../mixins/queryProductChange';
  import { css } from '../../modules/_helpers';

  @Component({
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    mixins: [queryProductChange],
    watch: {
      data({ current_page }) {
        this.activePage = current_page;
      }
    }
  })
  export default class BasePagination extends Vue {
    /**
     * Currently active page
     *
     * @type {Number}
     */
    activePage = this.data.current_page;

    /**
     * Pagination has '1 ...' part
     *
     * @return {Boolean}
     */
    get hasPaginationStart() {
      return this.activePage >= 4;
    }

    /**
     * Pagination has '... N' part
     *
     * @return {Boolean}
     */
    get hasPaginationEnd() {
      return this.activePage <= (this.data.last_page - 4);
    }

    /**
     * Pagination visible pages
     *
     * @return {Array}
     */
    get visiblePages() {
      if (!this.hasPaginationStart) {
        return [1, 2, 3, 4];
      }

      if (!this.hasPaginationEnd) {
        const pageCount = this.data.last_page;
        return [(pageCount - 3), (pageCount - 2), (pageCount - 1), pageCount];
      }

      return [(this.activePage - 1), this.activePage, (this.activePage + 1)];
    }

    /**
     * Set/unset active class
     *
     * @param {Number} page
     */
    getActiveClass(page) {
      return page === this.activePage ? css.active : '';
    }

    /**
     * Perform page change
     *
     * @param {Number} page
     */
    changePage(page) {
      const { search: queryString } = window.location;
      const newPageQuery = `page=${page}`;
      const toTheFirstPage = page === 1;

      // trying to navigate to the current page
      if (queryString.includes(newPageQuery)) return;

      this.activePage = page;

      // no query string at all, set page
      if (!queryString) {
        if (toTheFirstPage) return;

        return this.changeQuery(`?${newPageQuery}`);
      }

      // no page param at query string
      if (!queryString.includes('page')) {
        if (toTheFirstPage) return;

        return this.changeQuery(`${queryString}&${newPageQuery}`);
      }

      // change page param
      const params = queryString.replace('?', '').split('&');
      const newParams = params.map((param) => {
        const [paramName] = param.split('=');

        if (paramName !== 'page') return param;

        return toTheFirstPage ? null : newPageQuery;
      }).join('&');
      this.changeQuery(newParams ? `?${newParams}` : '');
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/mixins";
  @import "../../assets/scss/variables";

  .BasePagination {
    position: relative;
    width: 100%;
    height: auto;
    text-align: center;

    margin-top: 20px;

    z-index: 2;

    &__inner {
      display: inline-block;
      position: relative;
      list-style-type: none;
    }

    &__item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 41px;
      height: 41px;
      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 24px;
      text-transform: uppercase;
      box-shadow: none;
      border-radius: 50%;
      cursor: pointer;

      transition: all 0.75s ease !important;

      color: #736d7b;

      @media (min-width: $desktop) {
        &:not(.js-active) {
          &:hover {
            color: #ab8cc0;
          }
        }
      }

      &.js-active {
        box-shadow: 1px -2px 16px rgba(30, 75, 120, 0.18);
      }
    }

    &__dots {
      display: inline-block;
      margin-left: 5px;
      margin-right: 5px;
      letter-spacing: 7px;
      color: #736d7b;
    }
  }
</style>
