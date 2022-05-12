---
title: Mock
lang: zh-CN
---
 Mock
  mockjs官网 ：http://mockjs.com/，
  
  基本使用
  npm install mockjs --save
  

  

import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/login`, 'post', ({body}) => {
    .............
})

这个是在标准webpack nodejs项目中使用mockjs，完整的mockjs怎么使用参考官网文档，我们说一下在ant design vue admin中的使用情况。

1、src/mock是所有的mock模拟数据接口，当前项目所有的接口都能找到，通过作者Mock.mock(fullPath,...args)
    你需要明白作者是为了想做的生产环境统一的写法，而不至于发布时该代码。

2、在main.js中：
    import '@/mock'
    引入了所有的mockjs接口，这样开发中就可以使用了，这样开发是
    src/services/user.js
    export async function login(username, password) {
        return request(LOGIN, METHOD.POST, {
            username: username,
            password: password
        });
    }
    src/service/apis login是：
    LOGIN: `${BASE_URL}/login`,

    这样发布时使用.env中的 VUE_APP_API_BASE_URL=你的生产环境地址，从而实现模拟数据以及开发、生产解耦。

3、在部分情况下我们不希望使用mock数据，但是为了系统的正常运行我们不能全部修改，
    master版本作者完全是演示，因此完整加载了mock，实际开发需要转到basic分支，
    下面给一段就在master中强行带mock又有本地开发真实服务端的写法，供参考，关键代码：
    
    import {request,METHOD} from "./../../utils/request.js";

    const baseURL="http://192.168.13.4:8092/"

    add(){
        request(baseURL +"todo/add",METHOD.POST,{
            title:"喝酒",
            isFinished:false
        }).then((response)=>{
            console.log(response);
        });
    },
    query(){
        //console.log("query");
        request(baseURL +"todo/getAllTodos").then((response)=>{
            console.log(response);
        });
    }


  
  
