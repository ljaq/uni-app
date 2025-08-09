<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
import { beforeEach } from 'utils/router';

onLaunch(() => {
  beforeEach((to, from, next) => {
    console.log('beforeEach', to, from);
    if (to.includes('/pages/my/index')) {
      next('/pages/index/index');
    } else {
      return true;
    }
  });
});
</script>
<style lang="scss"></style>
