$(function() {
    // 点击“去注册”的链接
    $("#link_reg").on("click", function() {
            $(".login-box").hide()
            $(".reg-box").show()
        })
        // 点击“去登录”的链接
    $("#link_login").on("click", function() {
            $(".login-box").show()
            $(".reg-box").hide()
        })
        // 从layui中获取form元素
    var form = layui.form
        // 从layui中导入layer内置模块
    var layer = layui.layer
        // 通过form.verify（）自定义校验规则
    form.verify({
            // 密码输入规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                //通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息
                var pwd = $(".reg-box [name=password]").val()
                if (pwd !== value) {
                    return "两次输入的密码不一致"
                }
            }
        })
        //监听  注册表单提交事件
    $("#form_reg").on("submit", function(e) {
            // 阻止表单默认提交
            e.preventDefault();
            // 发起Ajax请求，收集注册数据
            var data = {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            };
            $.post("/api/reguser", data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 用js模拟实现人为点击   去注册跳转功能
                //   $("#link_login")[0].click()
                $("#link_login").click()
            })
        })
        // 监听  登录表单的提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单中的若干数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败");
                }
                layer.msg("登录成功")
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                // 登录成功，跳转到后台主页
                location.href = "/index.html";
            }
        })
    })
})