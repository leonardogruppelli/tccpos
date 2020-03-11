<template>
  <header>
    <nav class="bar">
      <ul class="bar__list">
        <li class="bar__item">
          <nuxt-link to="/">
            <logo />
          </nuxt-link>

          <hamburguer />
        </li>

        <li class="bar__item bar__item--search">
          <search />
        </li>
        
        <li class="bar__item">
          <profile />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from '~/assets/images/logo.svg?inline'
import Hamburguer from '~/components/atoms/hamburguer'
import Profile from '~/components/molecules/profile'
import Search from '~/components/molecules/search'

export default {
	components: {
		Logo,
		Hamburguer,
		Profile,
		Search
	}
}
</script>