import SvgIcon from './Svgicon/index.vue'
import Pagination from './Pagination/index.vue'
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from './Category/index.vue'


const allGloablComponents:any = {SvgIcon, Pagination,Category};

//对外暴露一个插件对象
export default{
    install(app:any){
        //注册项目的全部组件
        Object.keys(allGloablComponents).forEach(key =>{
            app.component(key,allGloablComponents[key]);
        });
        //讲element-plus注册为全局组件
        for(const [key, component] of Object.entries(ElementPlusIconsVue)){
            app.component(key, component)
        }
    }
}