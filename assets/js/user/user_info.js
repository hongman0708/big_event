// 校验表单数据
$(function() {
    var form = layui.form;
    var layer = layui.layer //导入layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo();
    // 初始化表单用户信息
    function initUserInfo() {
        var form = layui.form;
        var layer = layui.layer
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                // 为表单快速赋值
                // layui中内置的方法
                // 需要给表单form设置  lay-filter=""属性
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单数据功能
    $('#btnReset').on("click", function(e) {
            // 阻止表单的默认重置行为
            e.preventDefault();
            initUserInfo();
        })
        // 起请求更新用户的信息
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败！")
                }
                layer.msg("更新用户信息成功!");
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})