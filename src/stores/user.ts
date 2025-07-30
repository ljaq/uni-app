import { request } from 'api';
import { TOKEN, USER } from 'constant';
import useStorage from 'hooks/useStorage';
import { defineStore } from 'pinia';
import { ApplyStatus } from 'types/enum';
import { computed, ref } from 'vue';

interface IUser {
  id?: string;
  name?: string;
  phoneNumber?: string;
  points?: number;
  digitalStampCount?: number;
  achievement?: string;
  member?: string;
  userAddress?: string;
  profilePictureUrl?: string;
  odds?: string;
  answerQuestionCount?: number;
  answerQuestionAllCount?: number;
  questionPoint?: string;
  remainingMemberDays?: number;
  roles?: string[];
  narratorStatus?: ApplyStatus;
}

export const useUserStore = defineStore('user', () => {
  // const [user, setUser, removeUser] = useStorage<IUser>(USER);
  const user = ref<IUser>(uni.getStorageSync(USER));
  const scriptSex = ref({
    halfBodyPictureUrl: '',
    profilePictureUrl: '',
    sexType: 0,
    data: '{}',
  });
  const [, , removeToken] = useStorage(TOKEN);

  const isLogin = computed(() => !!user.value?.id);
  const isOrderVerify = computed(() => user.value?.roles?.includes('WriteOffAdmin'));

  const setUser = (u) => {
    uni.setStorageSync(USER, u);
    user.value = u;
  };

  const removeUser = () => {
    uni.removeStorageSync(USER);
    user.value = {};
  };

  const getUser = async () => {
    try {
      const app = await request.account.application({ method: 'GET' });

      setUser(app);
      return app;
    } catch (err) {
      setUser({});
      console.log('getUser error', err);
    }
  };

  const logout = (params?: { redirect?: boolean }) => {
    const { redirect } = params || {};
    removeUser();
    removeToken();
    if (redirect) {
      uni.reLaunch({ url: '/pages/home/index' });
    }
  };

  return { user, getUser, logout };
});
