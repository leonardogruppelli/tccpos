<template>
  <div class="error">
    <h1 class="error__title">
      page not found
    </h1>
    <p class="error__text">
      the page you we're looking for was not found
    </p>

    <nuxt-link
      to="/"
      class="error__link error__link--not-found"
    >
      <span class="error__link__icon error__link__icon--not-found" />
      back to home page
    </nuxt-link>
  </div>
</template>