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
          <div>
            <BeforeLogin />
          </div>
        </div>
        <div v-if="$auth.loggedIn" class="rounded">
          <LinkUserHome />
          <Logout />
        </div>
      </div>
    </div>
  </div>
</template>
