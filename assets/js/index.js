$(function() {
    // 页面加载完，就调用 getUserInfo 获取用户基本信息
    var layer = layui.layer
    getUserInfo();
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers 是请求头配置对象
        // headers: {
        //     // localStorage.getItem
        //     Authorization: localStorage.getItem('token') || ''
        // },
        // 在baseAPI中封装请求头接口，用到直接调用
        success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    // console.log("用户信息获取失败");
                    return layui.layer.msg("获取用户信息失败")
                }
                // 如果登录成功，调用renderAvatar()渲染头像
                // console.log(res)
                renderAvatar(res.data)
            }
            // ajax中，不论success，还是error,最终都会执行complete函数
    })
}
// 渲染用户头像

function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp" + name);
    // 3.渲染用户头像
    if (user.user_pic !== null) {
        // 有图片
        // 渲染图片头像并且显示图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        // 隐藏文本头像
        $(".text-avatar").hide();
    } else {
        // 没有头像
        // 渲染文本头像
        $('.layui-nav-img').hide();
        // 影藏图片
        // 显示文本头像 首字母 并且首字母大写
        var firstCharacter = name[0].toUpperCase();
        // 显示文本头像
        $('.text-avatar')
            .html(firstCharacter)
            .show()
    }
}
// 实现点击退出
$("#btnLogout").on("click", function() {
    layer.confirm("确定退出登录？", { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token');
        // 2. 跳转到登录页面
        location.href = '/login.html';
        // index---layui中内置的索引(每个弹出框相当于有个编号)
        layer.close(index);
    });
})