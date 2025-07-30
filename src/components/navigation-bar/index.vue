<script lang="ts" setup>
import { onPageScroll } from '@dcloudio/uni-app';
import useScreenInfo from 'hooks/useScreenInfo';
import { watch } from 'vue';
import { ref, toRefs } from 'vue';

interface IProps {
  needBackIcon?: boolean;
  backIcon?: string;
  navTitle?: string | null;
  occupied?: boolean;
  fontColor?: string;
  backgroundColor?: string;
  onBack?: () => void;
  onPageScroll?: (e: any) => void;
  scrollTop?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  backIcon: 'thin-arrow-left',
  occupied: true,
  needBackIcon: true,
  scrollTop: 0,
  backgroundColor: '#fff',
});
const { occupied, navTitle, fontColor, backgroundColor, backIcon } = toRefs(props);
const { navBarHeight, statusBarHeight } = useScreenInfo().value;
const top = ref(0);

onPageScroll(({ scrollTop }) => {
  if (scrollTop >= 100 && top.value >= 100) return;
  top.value = scrollTop >= 100 ? 100 : scrollTop;
});

const goBackPage = () => {
  const pages = getCurrentPages();
  if (pages.length <= 1) {
    uni.navigateTo({ url: '/pages/home/index' });
    return;
  }
  uni.navigateBack({
    delta: 1,
  });
};

// watch([props], () => {
//   if (props.scrollTop >= 100 && top.value >= 100) return;
//   top.value = props.scrollTop >= 100 ? 100 : props.scrollTop;
// });
</script>

<template>
  <View
    class="nav_custom_bar"
    :style="{
      height: navBarHeight - statusBarHeight + 'px',
      top: 0,
      paddingTop: statusBarHeight + 'px',
    }"
  >
    <div class="nav_custom_bar-bg" :style="{ background: backgroundColor, opacity: occupied ? 1 : top / 100 }"></div>
    <View class="left">
      <slot name="left">
        <div
          :class="`nav_custom_bar_back ${needBackIcon ? '' : 'hidden'}`"
          :style="{
            padding: '0 24px 0 0',
            textShadow: fontColor === '#fff' && !occupied && top < 50 ? '0 0 2px #000' : 'none',
          }"
          @click="
            () => {
              onBack ? onBack() : goBackPage();
            }
          "
        >
          <!-- <uni-icons type="left" :color="top >= 50 ? undefined : fontColor" :size="20" /> -->
          <wd-icon :name="backIcon" :color="top >= 50 ? undefined : fontColor" size="20px"></wd-icon>
        </div>
      </slot>
    </View>
    <View
      class="nav_custom_bar_title"
      :style="{
        color: top >= 50 ? '' : fontColor,
        textShadow: fontColor === '#fff' && !occupied && top < 50 ? '0 0 2px #000' : 'none',
      }"
    >
      {{ navTitle }}
    </View>
    <View></View>
  </View>
  <View v-if="occupied" :style="{ height: navBarHeight + 'px' }" class="origin-bar" />
</template>

<style lang="scss" scoped>
.nav_custom_bar_background {
  width: 100%;
  filter: blur(8px);
  position: relative;
}
.nav_custom_bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  padding: 0 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  z-index: 99999;
  &-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .left {
    position: relative;
    width: 0;
    white-space: nowrap;
    .nav_custom_bar_back.hidden {
      display: none;
    }
  }
  .nav_custom_bar_title {
    position: relative;
    font-size: 16px;
    font-family: 'song font', Microsoft YaHei, Microsoft YaHei-Regular;
    transform: translate(-12px);
  }
}
.origin-bar {
  position: relative;
}
.fix-bar {
  height: 87px;
  z-index: 10;
  background: #fff;
  position: fixed;
  width: 100%;
}
</style>
