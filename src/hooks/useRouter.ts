import { onLoad } from '@dcloudio/uni-app';
import { reactive } from 'vue';

export const useRouter = () => {
  const router = reactive({
    params: {},
    path: '',
    page: '',
  });

  onLoad((options: any) => {
    const pages = getCurrentPages();
    const pageInstance: any = pages[pages.length - 1];

    router.params = Object.entries(options).reduce((cur, next) => {
      const [key, value] = next;
      cur[key] = decodeURIComponent(value as string);
      return cur;
    }, {} as any);
    router.page = pageInstance.route;
    router.path = decodeURIComponent(pageInstance.$page.fullPath);
  });

  return router;
};
