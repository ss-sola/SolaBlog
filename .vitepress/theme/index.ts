import DefaultTheme from 'vitepress/theme'
import './styles.css'

const onlyMd=[`%E5%85%B3%E4%BA%8EFreeMovie`]

function includeOnlyMd(to: any) {
  return  onlyMd.some(item=> to.includes(item))
}
export default {
  ...DefaultTheme,
  enhanceApp({ app,router }) {
    /**@ts-ignore */
    if (import.meta.env.SSR) return; // 避免 SSR 访问 document
    console.log(router)
    //监听每次路由变化后触发
    router.onAfterRouteChanged = (to: any) => {
      if (includeOnlyMd(to)) {
        document.documentElement.classList.add('custom-hidden');
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.remove('custom-hidden');
      }
    };
  }
}
