/**
 * @Author: yangyuan
 * @Date: 2020-09-23 01:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-09-23 01:46:49
 * @Description:用于扩展vue-router一些方法push-proxy等
 */

/**
 * @description 对组件异步加载并生成chunkName
 * @param {string} path 组件路径
 * @return 异步组件
 */
export const asyncComponent = path => import(`@/views${path}`);

// class Router extends Proxy {
//     super()

// }
