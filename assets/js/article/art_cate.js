$(function () { 
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();
    // 获取文章分类的列表
    function initArtCateList() { 
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status === 0) {
                    var htmlStr = template('tpl_table',res);
                    $('tbody').html(htmlStr);
                 }
             }
        });
    }
    var indexAdd = null;
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type:1,
            title: '添加文章分类',
            area:['500px','250px'],
            content: $('#dialog-add').html()
          });     
     });

    // 通过代理的方式I，为form-Add表单绑定submit提交事件（因为表单是通过点击动态生成的，所以需要使用事件委托）
    $('body').on('submit', '#formAdd', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败');
                 }
                //  获取文章分类列表
                initArtCateList();
                // 根据索引关闭对应的弹出层
                layer.close(indexAdd);
                layer.msg('新增文章分类成功');
             }
        });
     });

    var indexEdit = null;
    // 通过代理的形式，为btn-edit 按钮绑定点击事件
    $('tbody').on('click', '#btn-edit', function () { 
        indexEdit = layer.open({
            type:1,
            title: '修改文章分类',
            area:['500px','250px'],
            content: $('#dialog-edit').html()
        });   
        var id = $(this).attr('data-id');
        // 发起ajax请求，获取对应id的数据
        $.ajax({
            method: 'get',
            url: '/my/article/cates/'+ id,
            success: function (res) { 
                // 将获取到的数据快速填充到表单 (1.在需要填充的表单设置layfilter属性 2.在js文件获取form 3.使用form.val()方法)
                form.val('formEdit',res.data);
            }
        });
    });

    // 通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#formEdit', function (e) { 
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求，提交数据到服务器
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败');
                }
                layer.msg('更新分类信息成功');
                layer.close(indexEdit);
                initArtCateList();
             }

        });
    });

    // 通过代理的形式，为删除按钮绑定点击事件
    $('body').on('click', '#btn-delete', function () { 
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/'+id,
                success: function (res) {
                    if(res.status !== 0){ 
                        return layer.msg('删除文章分类失败');
                    }
                    initArtCateList();
                    layer.close(index);
                    layer.msg('删除文章分类成功');
                 }
            });            
          });
    });
});