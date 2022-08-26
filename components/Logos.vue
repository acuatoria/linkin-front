<template>
  <div inline-flex text-2xl font-300 cursor-default>
    <div flex flex-col children:mx-auto>
      <div w-18 h-18 class="logo" />
      <span text-purple9 mt--2>Linkin</span>
    </div>
  </div>
</template>

<style scoped>
.logo{
  background-image: url('~/src/assets/logo_256_simple.svg');
  background-size: cover;
  border:0px !important;
}
</style>
