<template>
  <div
    m-5
    flex
    justify-center
    gap-3
  >
    <div class="flex flex-column">
      <div class="shadow rounded">
        <div v-if="!$auth.loggedIn">
          <Login />
        </div>
        <div v-if="$auth.loggedIn" class="flex flex-column">
          <Logout />
        </div>
        <Navegation />
      </div>
    </div>
  </div>
</template>
