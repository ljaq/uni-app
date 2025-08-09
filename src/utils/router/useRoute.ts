import { reactive } from 'vue';
import { RouteLocationRaw } from './type';

interface PageParams {
  fullPath: string;
  id?: number;
  meta?: object;
  openType?: string;
  options?: object;
  path?: string;
  route?: string;
  statusBarStyle?: string;
  [key: string]: any;
}

interface PageInstance extends Page.PageInstance {
  $page: PageParams;
  options: object;
}

export const useRoute = () => {
  const route = reactive<RouteLocationRaw>({
    query: {},
    path: '',
    fullPath: '',
    current: undefined,
    matched: [],
  });

  const getRoute = () => {
    const pages = getCurrentPages();
    const pageInstance = pages[pages.length - 1] as PageInstance;

    route.path = pageInstance.route || '';
    route.fullPath = pageInstance.$page?.fullPath || pageInstance.route || '';
    route.query = pageInstance.options || pageInstance.$page?.options || {};
    route.current = pageInstance;
    route.matched = pages;
  };

  getRoute();

  return route;
};
