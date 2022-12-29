<template>
  <div
    text="xl gray4"
    m-5
    flex
    justify-center
    gap-3
    items-start
  >
    <NuxtLink to="/" title="Home">
      <v-icon icon="i-carbon:campsite" />
    </NuxtLink>
    <DarkToggle />
    <NuxtLink to="https://twitter.com/pyxilink" title="Home">
      <v-icon icon="i-carbon:logo-twitter" />
    </NuxtLink>
    
  </div>
</template>
