<template>
  <div class="flex justify-around mt-8">
    <NuxtLink v-if="$route.name !== 'user-home'" to="/user/home">
      <v-icon icon="i-line-md:account" />
    </NuxtLink>
  </div>
</template>
