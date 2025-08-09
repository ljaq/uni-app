import { useRoute } from './useRoute';
import { useRouter } from './useRouter';
import type { RouterConfig, RouterLocationRaw } from './type';
import { useTabStore } from 'stores/tab';
import { tabList } from 'components/tabbar/tab-list';

const targetList = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack'];

type NavigationGuardWith = (
  to: string,
  from: string,
  next: (options?: RouterConfig & RouterLocationRaw) => void,
) => void | boolean;

export function beforeEach(guard: NavigationGuardWith) {
  targetList.forEach((api) => {
    uni.addInterceptor(api, {
      invoke: (params) => {
        let { url } = params;

        const route = useRoute();
        const router = useRouter();
        const tabStore = useTabStore();
        const from = route.path;

        let invokeRes = false;

        let _guardRes = guard(url, from, (options) => {
          if (!options) {
            invokeRes = true;
          } else {
            invokeRes = false;
            router.push(options);
          }
        });

        if (typeof _guardRes === 'boolean') {
          invokeRes = _guardRes;
        }

        if (!invokeRes) {
          const index = tabList.findIndex((item) => item.pagePath === from);
          if (index > -1) {
            tabStore.current = index;
          }
        }

        console.log('invokeRes', invokeRes);

        return invokeRes;
      },
    });
  });
}

type NavigationHookAfter = (to: string, from: string, failure?: any) => any;

export function afterEach(guard: NavigationHookAfter) {
  targetList.forEach((target) => {
    let to = '';

    uni.addInterceptor(target, {
      invoke: ({ url, delta }) => {
        const route = useRoute();
        if (delta) {
          url = route.matched?.at?.(-1)?.route || '';
        }

        to = url;
      },
      returnValue: async (e) => {
        const route = useRoute();

        return guard(to, route.path, await e);
      },
    });
  });
}
