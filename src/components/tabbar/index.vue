<template>
  <wd-tabbar bordered safe-area-inset-bottom placeholder fixed v-model="tabStore.current" @change="handleChange">
    <wd-tabbar-item
      v-for="(item, index) in tabList"
      :key="index"
      :title="item.text"
      :name="index"
      :icon="tabStore.current === index ? item.selectedIconPath : item.iconPath"
    ></wd-tabbar-item>
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { tabList } from './tab-list';
import { onLoad } from '@dcloudio/uni-app';
import { useTabStore } from 'stores/tab';
import { useRoute, useRouter } from 'utils/router';

const tabStore = useTabStore();
const route = useRoute();
const router = useRouter();

const handleChange = (e: any) => {
  router.push({
    url: '/' + tabList[e.value].pagePath,
    tabBar: true,
  });
};

onLoad(() => {
  const index = tabList.findIndex((item) => item.pagePath === route.path);
  tabStore.current = index !== -1 ? index : 0;
});
</script>
