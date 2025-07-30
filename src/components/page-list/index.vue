<script lang="ts" setup>
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app';
import { API_REQ_FUNCTION } from '../../api/types';
import { defineProps, ref, toRefs } from 'vue';
import { nextTick } from 'vue';
import { watch } from 'vue';
import { onMounted } from 'vue';

interface IProps {
  rowKey?: string;
  request: API_REQ_FUNCTION;
  commonParams?: { [key in string]?: any };
  renderType?: 'list' | 'fall' | 'grid';
  fallHeight?: string;
  quiet?: boolean;
  method?: 'GET' | 'POST';
}

const LOAD_NUMBER = 20;
const START_COUNT = 0;
const props = withDefaults(defineProps<IProps>(), {
  renderType: 'list',
  method: 'GET',
  fallHeight: 'calc(100vh - 230px - env(safe-area-inset-bottom))',
});
const { request, commonParams, rowKey, renderType, quiet, method, fallHeight } = toRefs(props);

const emits = defineEmits(['onChange']);
const isLoaded = ref(false);
const list = ref<any[]>([]);
const totalCount = ref(0);
const loading = ref(false);
const container = ref(null);
// watch(list, () => {
//   const res: any[][] = [[], []];
//   if (renderType.value === 'list') return res;
//   const fn = (i) => {
//     if (fallList.value.flat(3).length <= list.value.length) {
//       console.log(fallListHeight);

//       const index = fallListHeight[0] > fallListHeight[1] ? 1 : 0;

//       fallList.value[index].push(list.value[i]);
//       setTimeout(() => {
//         wx.createSelectorQuery()
//           .in(this)

//           .selectAll(`#fall${index}`)
//           .boundingClientRect(function (res) {
//             console.log(`#fall${index}`, res);
//             if (res[0]) {
//               fallListHeight[index] = res[0][index].height;
//             }

//             if (i < list.value.length - 1) fn(i + 1);
//           })
//           .exec();
//       }, 200);
//     }
//   };
//   fn(0);
// });

const fetchData = (isInit?: boolean, isUpdate?: boolean) => {
  if (quiet.value) return;
  if (list.value.length >= totalCount.value && !isInit && !isUpdate) return;
  if (loading.value) return;
  if (isInit) uni.pageScrollTo({ scrollTop: 0 });

  const SkipCount = isUpdate ? 0 : list && !isInit ? list.value.length : START_COUNT;
  const MaxResultCount = isUpdate ? Math.max(list.value.length, LOAD_NUMBER) : LOAD_NUMBER;
  loading.value = true;
  return request
    .value({
      method: method.value,
      data: {
        SkipCount,
        MaxResultCount,
        ...commonParams.value,
      },
    })
    .then((res) => {
      const arr = Array.isArray(res) ? res : res?.items || [];
      const _totalCount = Array.isArray(res) ? arr.length : res.totalCount;
      if (isInit || isUpdate) {
        list.value = arr;
      } else {
        list.value = [...list.value, ...arr];
      }
      totalCount.value = _totalCount;
      emits('onChange', list.value);
      loading.value = false;
      uni.stopPullDownRefresh();
    })
    .catch(() => {
      totalCount.value = 0;
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(commonParams, function fn() {
  if (loading.value) {
    setTimeout(() => {
      fn();
    }, 200);
  } else {
    fetchData(true);
  }
});

onShow(() => {
  // if (isLoaded) {
  fetchData(false, true);
  // }
});

onMounted(() => {
  nextTick(() => {
    fetchData(true)?.finally(() => (isLoaded.value = true));
  });
});

onPullDownRefresh(() => {
  fetchData(true);
});

onReachBottom(() => {
  fetchData();
});

defineExpose({
  fetchData,
  list,
});
</script>

<template>
  <wd-status-tip v-if="isLoaded && !list.length" image="search" tip="暂无数据"></wd-status-tip>
  <view v-else class="uni-page-list" :class="{ grid: renderType === 'grid' }">
    <template v-if="renderType !== 'fall'">
      <view
        ref="container"
        class="item-container"
        v-for="(item, index) in list"
        :key="item[rowKey || ''] ?? item['id'] ?? index"
      >
        <slot :item="item" :index="index"></slot>
      </view>
      <view class="uni-page-list-bottom">
        <!-- <wd-loadmore
          loading-text="加载中"
          finished-text="没有更多了"
          :status="loading ? 'loading' : list.length >= totalCount ? 'finished' : 'loading'"
          @clickLoadMore="fetchData()"
        /> -->
        <uni-load-more
          iconType="circle"
          :status="loading ? 'loading' : list.length >= totalCount ? 'no-more' : 'more'"
          @clickLoadMore="fetchData()"
        />
      </view>
    </template>
    <template v-else>
      <!-- <scroll-view type="custom" scroll-y :style="{ height: fallHeight }" @scrolltolower="() => fetchData()"> -->
      <grid-view type="masonry" :cross-axis-gap="12"
        ><view v-for="(item, index) in list" :key="item[rowKey || ''] ?? item['id'] ?? index">
          <slot :item="item" :index="index"></slot></view
      ></grid-view>
      <view class="uni-page-list-bottom">
        <uni-load-more
          iconType="circle"
          :status="loading ? 'loading' : list.length >= totalCount ? 'no-more' : 'more'"
          @clickLoadMore="fetchData()"
        />
      </view>
      <!-- </scroll-view> -->
      <!-- <view class="fall-container">
        <view class="fall-column" :id="`fall${cIndex}`" v-for="(column, cIndex) in fallList" :key="cIndex">
          <view v-for="(item, index) in column" :key="item[rowKey || ''] ?? item['id'] ?? index">
            <slot :item="item" :index="index"></slot
          ></view>
        </view>
      </view> -->
    </template>
  </view>
</template>

<style scoped lang="scss">
.uni-page-list {
  padding: 12px;
  .item-container {
    margin-bottom: 12px;
  }
  &.grid {
    padding: 12px 6px;
    .item-container {
      display: inline-block;
      width: calc(50% - 12px);
      margin: 0 6px 12px !important;
    }
  }
  &-bottom {
    color: #999;
    font-size: 12px;
    text-align: center;
    margin: 12px 0 24px;
  }

  .fall-container {
    display: flex;
    .fall-column {
      width: 50%;
      flex-shrink: 0;
    }
  }
}
</style>
