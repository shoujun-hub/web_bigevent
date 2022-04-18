// 注意：每次调用$.get()和$.post()或$.ajax()的时候，
// 都会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 统一为有权限的接口，设置headers 请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        // 统一挂载complete回调函数
        // 无论成功还是失败，最终都会调用complete回调函数
        options.complete = function (res) { 
            // console.log('调用了complete函数');
            // console.log(res);
            // 在complete 回调函数中，可以使用 res.responseJSON 拿到服务器
            // 响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.强制清空 token
                localStorage.removeItem('token');
                // 2.强制跳转到登录页面
                location.href = 'login.html'; 
             }
        }
    }
})