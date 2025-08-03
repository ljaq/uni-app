<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-toast />
    <wd-notify />
    <wd-message-box />
    <TabList />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni';
import TabList from '../components/tabbar/index.vue';

const themeVars: ConfigProviderThemeVars = {};
</script>
