import DefaultTheme from 'vitepress/theme'
import './styles.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app,router }) {
    // 监听每次路由变化后触发
    // router.onAfterRouteChanged = (to:any) => {
    //   console.log(to)
    //   const hash = decodeURIComponent(to.hash)
    //   if (hash) {
    //     const targetElement = document.querySelector(hash)
    //     if (targetElement) {
    //       targetElement.scrollIntoView({ behavior: 'smooth' })
    //     }
    //   }
    // }
  }
}
