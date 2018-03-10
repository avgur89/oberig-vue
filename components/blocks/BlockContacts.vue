<template lang="pug">
  section.SectionContacts
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    .SectionContacts__title {{ formData.title }}
    form.SectionContacts__form
      .SectionContacts__form-flex
        .SectionContacts__form-wrapper
          .SectionContacts__form-group(:class="{ 'has-error': $v.models.userName.$error }")
            input(
              type="text",
              name="userName",
              v-model="models.userName",
              :class="[cssClassesObject, cssDefaultClass]",
              :placeholder="formData.namePlacholder",
              @focus="toggleClass",
              @blur="() => { toggleClass(); $v.models.userName.$touch(); }",
              @input="$v.models.userName.$touch()"
            )
            span.focus-border
            span.border
            .SectionContacts__form-error
              span *
              span {{ t.name_required_error }}
          .SectionContacts__form-group(:class="{ 'has-error': $v.models.userPhone.$error }")
            input(
              type="text",
              name="userPhone",
              v-model="models.userPhone",
              :class="[cssClassesObject, cssDefaultClass]",
              :placeholder="formData.phonePlacholder",
              @focus="toggleClass",
              @blur="() => { toggleClass(); $v.models.userPhone.$touch(); }",
              @input="$v.models.userPhone.$touch()"
            )
            span.focus-border
            span.border
            .SectionContacts__form-error
              span *
              span {{ t.phone_required_error }}
          .SectionContacts__form-group(:class="{ 'has-error': $v.models.userEmail.$error }")
            input(
              type="text",
              name="userEmail",
              v-model="models.userEmail",
              :class="[cssClassesObject, cssDefaultClass]",
              :placeholder="formData.emailPlaceholder",
              @focus="() => { toggleClass(); $v.models.userEmail.$reset(); }",
              @blur="() => { toggleClass(); $v.models.userEmail.$touch(); }"
            )
            span.focus-border
            span.border
            .SectionContacts__form-error
              span *
              span(v-if="!$v.models.userEmail.required && !models.userEmail.length") {{ t.email_required_error }}
              span(v-else) {{ t.incorrect_email_error }}
        .SectionContacts__form-wrapper
          .SectionContacts__form-title {{ formData.communicationMethodLabel }}
          .SectionContacts__form-checkbox-wrapper
            BaseCheckbox(
              v-for="(item, index) in pageData.form.communicationMethods",
              type="radio",
              name="communicationMethod",
              @change.native="communicationMethodChange(item)",
              :key="index",
              :id="index",
              :value="item.label",
              :label="item.label",
              :isChecked="index === 0"
            )
          transition(name="fade")
            .SectionContacts__form-group.SectionContacts__form-group-method(
             :style="{ display: communicationMethodVisibility }"
            )
              input(
                type="text",
                :class="[cssClassesObject, cssDefaultClass]",
                :placeholder="models.communicationMethod.placeholder",
                v-model="models.userMessenger",
                @focus="toggleClass",
                @blur="toggleClass",
              )
              span.focus-border
              span.border
      ButtonRainbowGradient(
        :url="formData.emailPlaceholder",
        :text="formData.buttonLabel",
        isStatic,
        @click.native="submit"
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import {
    required,
    requiredIf,
    email
  } from 'vuelidate/lib/validators';
  import { css, phoneValidation as numeric } from '../../modules/_helpers';
  import BaseReveal from '../ui/BaseReveal.vue';
  import BaseCheckbox from '../ui/BaseCheckbox.vue';
  import ButtonRainbowGradient from '../ui/ButtonRainbowGradient.vue';

  @Component({
    components: {
      BaseReveal,
      BaseCheckbox,
      ButtonRainbowGradient
    },
    mixins: [validationMixin],
    props: {
      value: {
        type: String,
        default: ''
      },
      initiallyActive: {
        type: Boolean,
        default: false
      },
      defaultClass: {
        type: String,
        default: 'SectionContacts__form-input'
      },
      onSubmitAction: {
        type: Function,
        required: true
      }
    },
    computed: mapGetters(['pageData', 'p', 't']),
    validations: {
      models: {
        userName: {
          required
        },
        userPhone: {
          required,
          numeric
        },
        userEmail: {
          email,
          requiredIf: requiredIf(({ communicationMethod: { id } }) => (
            id === 1
          ))
        }
      }
    }
  })
  export default class SectionContacts extends Vue {
    /**
     * Active state indicator
     *
     * @type {Boolean}
     */
    isActive = this.initiallyActive;

    /**
     * Form input models
     */
    models = {
      userName: '',
      userEmail: '',
      userPhone: '',
      userMessenger: '',

      /**
       * Currently selected communication method
       *
       * @type {Object}
       */
      communicationMethod: {
        id: null,
        placeholder: null
      }
    };

    /**
     * @return {Object}
     */
    get cssClassesObject() {
      return { [css.active]: this.isActive };
    }

    /**
     * @return {String}
     */
    get cssDefaultClass() {
      return this.defaultClass;
    }

    /**
     * @return {String}
     */
    get formData() {
      return this.pageData.form.static;
    }

    /**
     * @return {String}
     */
    get communicationMethodVisibility() {
      const currentMethodId = this.models.communicationMethod.id;
      return (currentMethodId !== 1 && currentMethodId !== 2) ? 'block' : 'none';
    }

    beforeMount() {
      const [initialMethod] = this.pageData.form.communicationMethods;
      this.communicationMethodChange(initialMethod);
    }

    /**
     * Switch state
     */
    toggleClass() {
      this.isActive = !this.isActive;
    }

    /**
     * Verify and send data when form submitted
     */
    submit() {
      if (this.$v.$invalid) return this.$v.$touch();

      const { models } = this;
      const dataToSend = {
        type: this.pageData.form.type,
        name: models.userName,
        phone: models.userPhone,
        email: models.userEmail,
        additionalNumber: models.userMessenger,
        additionalMethod: models.communicationMethod.label
      };

      this.onSubmitAction(dataToSend);
    }

    /**
     * Reveal contacts section
     */
    revealSection() {
      TweenMax.to(this.$el, 1, { opacity: 1, ease: Power1.easeOut });
    }

    /**
     * Change active communication method
     *
     * @param {Object} method
     */
    communicationMethodChange(method) {
      this.models.communicationMethod = method;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .SectionContacts {
    padding-left: 40px;
    margin-right: 40px;

    margin-bottom: 145px;

    position: relative;

    opacity: 0;

    .BaseCheckbox__label {
      margin-left: 33px;
    }

    @media (max-width: $minDesktop) {
      padding-left: 0;
      margin-right: 0;
    }

    &__title {
      @include gradient-text(false);

      max-width: 335px;
      width: 100%;

      margin-bottom: 35px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 1.25px;

      color: #3f4144;

      @media (max-width: $minTablet) {
        margin: 0 auto 38px auto;
        text-align: center;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__form {
      position: relative;

      @media (max-width: $minTablet) {
        text-align: center;
      }

      &-error {
        position: absolute;
        opacity: 0;
        left: 0;
        bottom: -21px;

        transition: opacity .5s ease;

        span {
          font-family: $Calibri;
          font-size: 13px;
          line-height: 26px;
          letter-spacing: 0.65px;

          &:first-child {
            color: #b93e80;
          }

          &:last-child {
            color: #a5a5a5;
            margin-left: 3px;
          }
        }
      }

      &-group {
        position: relative;
        margin-bottom: 26px;

        transition: opacity .6s ease;

        &-method {
          @media (min-width: $desktop) {
            position: absolute;
            left: 0;
            top: calc(100% - 2px);
            width: 90%;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        &.has-error {
          .SectionContacts__form {
            &-error {
              opacity: 1;
            }
            &-input {
              color: #b93e80;
            }
          }
        }
      }

      &-flex {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        text-align: left;

        @media (max-width: $minDesktop) {
          flex-direction: column;
          justify-content: flex-start;
        }
      }

      &-wrapper {
        position: relative;
        flex: 1 1 50%;

        margin-right: 60px;
        margin-bottom: 53px;

        &:last-child {
          margin-right: 0;

          @media (min-width: $desktop) {
            flex-basis: 52%;
          }
        }

        @media (max-width: $minDesktop) {
          flex: 1 1 auto;
          width: 100%;

          margin-right: 0;
          margin-bottom: 48px;

          &:last-child {
            margin-bottom: 54px;
          }
        }
      }

      &-title {
        margin-top: 28px;
        margin-bottom: 28px;

        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;

        @media (max-width: $minDesktop) {
          margin-top: 0;
        }
      }

      &-checkbox {
        visibility: hidden;

        &:checked + &-hidden-label:after {
          opacity: 1;
        }

        &-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          margin-bottom: 32px;

          @media (max-width: $minDesktop) {
            justify-content: space-between;
          }

          @media (max-width: $minTablet) {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
        }

        &-group {
          position: relative;

          flex: 0 1 auto;
          height: 32px;

          display: flex;
          justify-content: flex-start;
          align-items: center;

          margin-right: 33px;

          &:last-child {
            margin-right: 0;
            margin-bottom: 0;
          }

          @media (max-width: $minTablet) {
            margin-right: 0;
            margin-bottom: 30px;
          }
        }

        &-label {
          @include gradient-text(false);

          margin-left: 28px;

          font-family: $Calibri;
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;

          color: #444344;
          cursor: pointer;
        }

        &-hidden-label {
          position: absolute;
          left: 0;
          top: 0;

          height: 32px;
          width: 32px;
          border-radius: 50%;

          box-shadow: 0 9px 16px rgba(30, 75, 120, 0.2);
          background-color: #ffffff;

          cursor: pointer;

          &:after {
            content: "";
            position: absolute;
            top: 16px;
            left: 16px;

            width: 10px;
            height: 10px;
            border-radius: 50%;

            background-color: #ffffff;
            background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

            transform: translate(-50%, -50%);
            opacity: 0;
          }
        }
      }

      &-input {
        width: 100%;

        outline: none;
        border: none;

        padding-bottom: 19px;

        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;
        background-color: transparent;

        transition: color .5s ease;

        & ~ .border {
          position: absolute;

          bottom: 5px;
          left: 0;

          width: 100%;
          height: 1px;

          background-image: linear-gradient(to right, #49546e 0%, #ba6946 100%);

          transition: 1s;
        }

        & ~ .focus-border {
          position: absolute;

          bottom: 5px;
          left: 50%;

          width: 0;
          height: 1px;

          background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

          transition: 0.6s;
        }

        &:focus {
          &.js-active {
            & ~ .focus-border {
              left: 0;
              width: 100%;

              transition: 0.4s;
            }

            & ~ .border {
              opacity: 0;
              transition: 0.4s;
            }
          }
        }
      }
    }
  }
</style>
