$(function () {
    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    });

    // 监听表单提交事件
    $('.layui-form').on('subimit', function (e) {
        // 清除默认提交事件
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败');
                }
                layui.layer.msg('更新密码成功');
                // reset()方法可以清空表单元素 但是只有原生dom
                // 有这个方法,必须把jquery元素转换称原生dom
                $('.layui-form')[0].reset();
            }
        });
    })
});