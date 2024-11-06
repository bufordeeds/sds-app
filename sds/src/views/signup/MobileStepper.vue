<template>
  <span
    id="mobile-stepper"
    class="flex flex-col"
  >
    <ol>
      <li
        v-if="step === 1"
        class="steps__list-item flex flex-row steps__list-item--active"
      >
        <span class="steps__counter">1</span>
        <span class="flex flex-col">
          <p>Step 1/4</p>
          <p>
            Account Type
          </p>
        </span>
      </li>
      <li
        v-if="step === 2"
        class="steps__list-item flex flex-row steps__list-item--active"
      >
        <span class="steps__counter">2</span>
        <span class="flex flex-col">
          <p>Step 2/4</p>
          <p>
            Email Verification
          </p>
        </span>
      </li>
      <li
        v-if="step === 3"
        class="steps__list-item flex flex-row steps__list-item--active"
      >
        <span class="steps__counter">3</span>
        <span class="flex flex-col">
          <p>Step 3/4</p>
          <p>
            Terms & Conditions
          </p>
        </span>
      </li>
      <li
        v-if="step === 4"
        class="steps__list-item flex flex-row steps__list-item--active"
      >
        <span class="steps__counter">4</span>
        <span class="flex flex-col">
          <p>Step 4/4</p>
          <p>Basic Info</p>
        </span>
      </li>
    </ol>
    <v-progress-linear
      :value="25 * step"
      height="4"
      rounded
    />
  </span>
</template>

<script>
export default {
  name: "MobileStepper",
  props: {
    step: { type: Number, default: 1 },
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
@import url('../main.css');

  #mobile-stepper {
    list-style-type: none;
    margin: 0;
    padding: 16px 16px 0 16px;
    row-gap: 16px;

    .steps__list-item {
      color: var(--text-default);
      font-size: 17px;
      font-weight: 700;
      line-height: 24px;
      text-align: left;

      p,
      ol {
        margin: 0;
        padding: 0;
      }
      
      .steps__counter {
        align-items: center;
        background-color: var(--surface-light-white);
        border-radius: 50%;
        color: var(--text-medium);
        display: flex;
        flex-grow: 0;
        font-weight: 700;
        height: 40px;
        justify-content: center;
        position: relative;
        width: 40px;
      }
      
      &.steps__list-item--active  {
        color: var(--brand-primary-500);

        .steps__counter {
          background-color: var(--button-form-button);
          color: var(--text-white);
        }
      }

      &.steps__list-item--finished {
        .steps__counter::before {
          background-color: var(--surface-light-white);
          border: 2px solid var(--button-form-button);
          border-radius: 50%;
          content: '';
          height: 40px;
          position: absolute;
          width: 40px;
        }

        .steps__counter::after {
          border-bottom: 2px solid var(--button-form-button);
          border-right: 2px solid var(--button-form-button);
          content: '';
          height: 20px;
          transform: rotate(45deg) translate(-5px, 1px);
          width: 10px;
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {
    #mobile-stepper {
      display: none;
    }
  }
</style>