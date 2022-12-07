<template>
  <div
    m-5
    flex
    justify-center
    gap-3
  >
    <div class="flex flex-column">
      <div>
        <div v-if="!$auth.loggedIn">
          <div m-3>
            <Login />
          </div>
        </div>
        <div v-if="$auth.loggedIn" class="shadow rounded">
          <Logout />
          <LinkUserHome />
        </div>
      </div>
    </div>
  </div>
</template>
