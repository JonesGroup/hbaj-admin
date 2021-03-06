/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:17:04
 * @Description:
 */
import request from "../widget/request";

const baseUrl = "/api";

export const home = (data, url) => request(`${baseUrl}/home/${url}`, data);

export const user = (data, url) => request(`${baseUrl}/user/${url}`, data);

export const news = data => request(`${baseUrl}/home/news`, data);

export const newsAdmin = data => request(`${baseUrl}/news`, data);

export const newsAdminDetail = (data, url) => request(`${baseUrl}/news/${url}`, data);

export const newsDetail = (data, url) => request(`${baseUrl}/home/news/${url}`, data);

export const message = (data, url) => request(`${baseUrl}/message`, data);

export const messageDetail = (data, url) => request(`${baseUrl}/message/${url}`, data);

export const task = data => request(`${baseUrl}/task`, data);

export const taskDetail = (data, url) => request(`${baseUrl}/task/${url}`, data);

export const comment = data => request(`${baseUrl}/comment`, data);

export const commentDetail = (data, url) => request(`${baseUrl}/comment/${url}`, data);

export const addComment = data => request(`${baseUrl}/comment`, data);

export const appConst = data => request(`${baseUrl}/appConst`, data);

export const appConstDetail = (data, url) => request(`${baseUrl}/appConst/${url}`, data);

export const block = data => request(`${baseUrl}/block`, data);

export const blockDetail = (data, url) => request(`${baseUrl}/block/${url}`, data);

export const scene = data => request(`${baseUrl}/scene`, data);

export const sceneDetail = (data, url) => request(`${baseUrl}/scene/${url}`, data);

export const project = data => request(`${baseUrl}/project`, data);

export const projectDetail = (data, url) => request(`${baseUrl}/project/${url}`, data);

export const role = data => request(`${baseUrl}/role`, data);

export const roleDetail = (data, url) => request(`${baseUrl}/role/${url}`, data);

export const department = data => request(`${baseUrl}/department`, data);

export const departmentDetail = (data, url) => request(`${baseUrl}/department/${url}`, data);

export const projectModule = data => request(`${baseUrl}/projectModule`, data);

export const projectClass = data => request(`${baseUrl}/projectClass`, data);

export const sceneType = data => request(`${baseUrl}/sceneType`, data);

export const hotspotContent = (data, url) => request(`${baseUrl}/hotspotContent/${url}`, data);
