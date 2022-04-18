$(function () {
    // 给去注册账号链接绑定点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 给去登录链接绑定点击事件
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中获取layer对象
    var layer = layui.layer;

    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 检验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码中的内容，
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwdVal = $('.reg-box [name=password]').val();
            if (value !== pwdVal) {
                return '两次密码输入不一致！'
            }
        }
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
         // 注册表单提交时获取的数据
        var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() };

        // 阻止默认的提交行为
        e.preventDefault();
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#link_login').click();
        });
    });

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认的提交行为
        e.preventDefault();
        // 快速获取表单的内容
        var data = $(this).serialize();
        $.ajax({
            method: 'post',
            url:'/api/login',
            data: data,
            success: function (res) { 
                if (res.status !== 0) {
                    return layer.msg(res.status);
                }
                layer.msg('登录成功');
                // 将登录成功的得到的 token字符串，保存到localStorage中
                localStorage.setItem('token',res.token);
                // 跳转到后台主页
                location.href = 'index.html';
                console.log(res);
                
            }
        });
     });
});