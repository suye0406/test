<template>
    <div data-v-55c5fbb5="" id="Login" style="        height: 100vh;">
        <el-form :model = "adminForm" :rules = "rules" ref="adminForm" class="container">
            <h5 style="line-height: 30px;text-align: left;">账号密码登录</h5>
            <el-form-item prop="adminName" style="margin-bottom: 20px;">
                <el-input v-model="adminForm.adminName" placeholder="请输入管理员账号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="passWord" style="margin-bottom: 20px;" v-show="isPassword">
                <el-input v-model="adminForm.passWord" type="password" placeholder="请输入管理员密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="adminName" v-show="isEmail" style="margin-bottom: 20px;">
                <el-input v-model="adminForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="adminPhone" v-show="isPhone" style="margin-bottom: 20px;">
                <el-input v-model="adminForm.adminPhone" placeholder="请输入手机号" autocomplete="off" style="width: 70%;float: left;"></el-input>
                <el-button size="small" round>获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="adminCode1" style="margin-bottom: 20px;" v-show="isPhone">
                <el-input v-model="adminForm.adminCode1" type="text" placeholder="请输入验证码" autocomplete="off"></el-input>
            </el-form-item>
            <div style="height: 20px;">
                <span style="font-size: 12px;text-align: right;float: right;margin-bottom: 10px;cursor: default;" class="phone" @click="isPhone = true;isPassword = false;isEmail = false; isReg = true;" v-show="isPassword">验证码登陆</span>
                <span style="font-size: 12px;text-align: right;float: right;margin-bottom: 10px;cursor: default;margin-right: 5px;" class="phone" @click="isPhone = false;isPassword = true;isEmail = false; isReg = true;" v-show="isPhone">密码登陆</span>
                <span style="font-size: 12px;text-align: right;float: right;margin-bottom: 10px;cursor: default;margin-right:5px;" class="phone" @click="isPhone = true;isPassword = true;isEmail = true; isReg = false;" v-show="isReg">点击注册</span>
            </div>
            <el-form-item style="">
                <el-button style="width:100%;" :loading = "isLoading" type="primary" @click="Login" v-show="isLogin">登陆</el-button>
                <el-button style="width:100%;margin-left: 0;" :loading = "isLoading" type="primary" @click="SignOut" v-show="isSignOut">退出</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Login",
        data(){
            return {
                isLoading:false,
                isPhone:false,
                isPassword:true,
                isEmail:false,
                isReg:false,
                isSignOut:false,
                isLogin:true,
                isMin:60,

                adminForm:{
                    adminName:"",
                    passWord:"",
                    adminCode1:'',
                    email:'',
                    adminPhone:'',
                },
                rules:{
                    adminName: [
                        { required: true, message: '请输入管理员账号', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: '请输入管理员密码', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    adminPhone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在 11 到 11 个字符', trigger: 'blur' }
                    ],
                    adminCode1: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                    ]

                }
            }
        },
        methods:{
            Login(){
                //登陆
                this.isSignOut = true;
                this.isLogin = false;
                // http://39.96.76.3:8082/login?userName=%E8%93%9D%E7%8B%90&password=123456&time=1560436623323
                axios.get('http://39.96.76.3:8082/login', {
                    params: {
                        userName:this.adminForm.adminName,
                        password:this.adminForm.passWord,
                        time:new Date().getTime()
                    },
                }).then(response =>{
                    if (typeof response.data.data == 'object'){
                        this.$message(response.data.msg);
                        this.$store.commit('INFO',response.data);
                    } else {
                        this.$message(response.data.msg);
                    }
                }).catch(function (error) {
                    alert(error);
                });

            },
            SignOut(){
                //退出登陆
                this.isSignOut = false;
                this.isLogin = true;
            },
            code(){
                //获取验证码
            }
        }
    }
</script>

<style scoped lang="scss">
    #Login{
        overflow: hidden;
        height: 100vh;
        width: 100%;
        .container{
            width:350px;
            margin:100px auto;
            padding:10px 30px;
            border:1px solid #eaeaea;
            box-shadow:0 0 20px #eee;
            h3{
                text-align:center;
            }
        }
        .phone:hover{
            color: cornflowerblue;
        }
    }
</style>
