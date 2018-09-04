<template>
    <section>
        <el-col :span="24" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="danger" @click="getAdmins">刷新</el-button>
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="admins" v-loading="loading">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="adminName" label="用户名"></el-table-column>
            <el-table-column prop="describe" label="描述"></el-table-column>
            <el-table-column prop="insertTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="primary" @click="updateAdmin(scope.row, scope.index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col>
            <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
                <el-form :model="admin">
                    <el-form-item label="登录名称" >
                        <el-input v-model="admin.adminName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码">
                        <el-input v-model="admin.password"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="admin.describe"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addAdmin">确 定</el-button>
                </div>
            </el-dialog>
        </el-col>
    </section>
</template>

<script>
    export default {
        name: "admin",
        data() {
            return {
                admins: [],
                admin: {
                    adminName: '',
                    password: '',
                    describe: ''
                },
                loading: false,
                dialogFormVisible: false
            }
        },
        methods: {
            getAdmins() {
                this.loading = true;
                let param = {
                    state: 1
                };
                this.$store.dispatch('GetAdmins', param).then(res => {
                    this.loading = false;
                    console.log(res);
                    this.admins = res.data.data.admins;
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                })
            },
            addAdmin() {
                if(!this.admin.adminName) {
                    this.$message('请输入用户名');
                    return;
                }
                if(!this.admin.password) {
                    this.$message('请输入密码');
                    return;
                }
                this.$store.dispatch('AddAdmin', this.admin).then(res => {
                    this.dialogFormVisible = false;
                    if(res.data.data.admin) {
                        this.admins.push(res.data.data.admin);
                        this.$message('添加成功');
                    } else {
                        this.$message('添加失败');
                    }
                }).catch(error => {
                    this.dialogFormVisible = false;
                    console.log(error)
                });
            },
            updateAdmin(row, index) {
                this.$confirm('确定要做此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    this.$store.dispatch('UpdateAdmin', row).then(res => {
                        this.$message('操作成功');
                        this.loading = false;
                        this.admins.splice(index, 1);
                    }).catch(error => {
                        this.$message('操作失败');
                        this.loading = false;
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        mounted() {
            this.getAdmins();
        }
    }
</script>

<style scoped>
    .toolbar {
        background: #f2f2f2;
        padding: 10px;
    //border:1px solid #dfe6ec;
        margin: 10px 0px;
    .el-form-item {
        margin-bottom: 10px;
    }
    }
</style>