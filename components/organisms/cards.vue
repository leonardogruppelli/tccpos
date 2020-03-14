<template>
  <ul class="cards">
    <li class="cards__item c-primary">
      <span class="cards__item__value">{{ cards.condominiums[0].condominiums }}</span>
      <span class="cards__item__name">Condominiums</span>
    </li>

    <li class="cards__item c-success">
      <span class="cards__item__value">{{ cards.users[0].users }}</span>
      <span class="cards__item__name">Users</span>
    </li>
  </ul>
</template>

<script>
export default {
	props: [ 
		'cards' 
	]
}
</script>