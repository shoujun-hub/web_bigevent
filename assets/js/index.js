$(function () {
    getUserInfo();
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        var layer = layui.layer;
        // 提示用户是否确认退出 
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地储存中的 token
            localStorage.removeItem('token');
            // 2.重新跳转到登录页面
            location.href = 'login.html';
            // 关闭confirm 询问框
            layer.close(index);
        });
    });
});
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 1) {
                // 渲染用户头像
                renderAvatar(res.data);
            }
        },
        // // 无论成功还是失败，最终都会调用complete回调函数
        // complete: function (res) { 
        //     // console.log('调用了complete函数');
        //     // console.log(res);
        //     // 在complete 回调函数中，可以使用 res.responseJSON 拿到服务器
        //     // 响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空 token
        //         localStorage.removeItem('token');
        //         // 2.强制跳转到登录页面
        //         location.href = 'login.html'; 
        //      }
        // }
    });
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户名名称
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}