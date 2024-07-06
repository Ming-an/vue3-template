import { createApp } from 'vue'
import App from './App.vue'
//svg需要的配置代码
import 'virtual:svg-icons-register'
//引入element插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import SvgIcon from '@/components/Svgicon/index.vue'
//引入自定义插件对象
import globalComponents  from '@/components';
import '@/styles/index.scss'
import router from './router'
//引入仓库
import pinia from './store';

//引入路由鉴权
import './permission'

const app = createApp(App)

app.use(globalComponents);
//注册路哟
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn
})

app.mount('#app')