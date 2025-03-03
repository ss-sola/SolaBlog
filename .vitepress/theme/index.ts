import DefaultTheme from 'vitepress/theme'
import './styles.css'

const onlyMd=[`%E5%85%B3%E4%BA%8EFreeMovie`]

function includeOnlyMd(to: any, from: any) {
  return  onlyMd.some(item=> to.includes(item))
}
export default {
  ...DefaultTheme,
  enhanceApp({ app,router }) {
    /**@ts-ignore */
    if (import.meta.env.SSR) return; // 避免 SSR 访问 document
    // 监听每次路由变化后触发
    router.onAfterRouteChanged = (to: any, from: any) => {
      console.log(to,from)
      if (includeOnlyMd(to,from)) {
        document.documentElement.classList.add('custom-hidden');
      } else {
        document.documentElement.classList.remove('custom-hidden');
      }
    };
  }
}
