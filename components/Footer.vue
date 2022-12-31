<template>
  <div
    text="xl gray4"
    m-5
    flex
    justify-center
    gap-3
    items-start
  >
    <NuxtLink to="/" title="go to Home">
      <v-icon icon="i-carbon:campsite" />
    </NuxtLink>
    <DarkToggle />
    <NuxtLink to="https://www.reddit.com/r/interesting_Links/" title="go to subreddit">
      <v-icon icon="i-line-md:reddit" />
    </NuxtLink>
  </div>
</template>
