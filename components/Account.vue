<script setup>
import { Icon } from '@iconify/vue'
const login = false
function do_login() {
  login.value = true
  // login()
}
</script>

<template>
  <div
    m-5
    flex
    justify-center
    gap-3
  >
    <div class="flex flex-column">
      <div class="bg-white shadow rounded">
        <Login dialog="login">
        <!-- <div class="i-line-md:loading-alt-loop" />
        <Icon icon="eos-icons:installing" /> -->
        </login>
      </div>

      <div class="pa-2 mr-5">
        <a class="decoration-line-through" href="#">Register</a>
      </div>
    </div>
  </div>
</template>
