import { useDark, useMediaQuery, useStorage, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, watch } from 'vue';

const isDarkTheme = location.href.indexOf('sysdarkmode=true') != -1; // useDark();
if (isDarkTheme) {
  document.body.className = document.body.className + ' dark';
}

export const useStyleStore = defineStore('style', {
  state: () => {
//    const isDarkTheme = isDark// useDark();
    const toggleDark = useToggle(isDarkTheme);
    // const isSmallScreen = useMediaQuery('(max-width: 700px)');
    // const isMenuCollapsed = useStorage('isMenuCollapsed', isSmallScreen.value) as Ref<boolean>;
    const isSmallScreen = true;
    // watch(isSmallScreen, v => (isMenuCollapsed.value = v));

    return {
      isDarkTheme,
      toggleDark,
      isMenuCollapsed:true,
      isSmallScreen,
    };
  },
});
