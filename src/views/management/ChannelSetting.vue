<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="channels" v-loading="loading">
            <el-table-column prop="channelId" label="频道ID"></el-table-column>
            <el-table-column prop="channelName" label="频道名称"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="danger" size="small" @click="delChannel(scope.row, scope.index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col>
            <el-dialog title="添加频道" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="频道名称" >
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addChannel">确 定</el-button>
                </div>
            </el-dialog>
        </el-col>
    </section>
</template>

<script>
    export default {
        name: "channel",
        data() {
            return {
                form: {
                    name: ''
                },
                query: {
                    channelId: '',
                    channelName: ''
                },
                channels: [],
                loading: false,
                dialogFormVisible: false
            }
        },
        methods: {
            getChannels(){
                var _this = this;
                let params = {
                    channelName: this.channelName,
                    channelId: this.channelId
                };
                this.$store.dispatch('GetChannels', params).then(res => {
                    console.log(res);
                    _this.channels = res.data.data.channels;
                }).catch(error => {
                    console.log(error);
                });
            },
            addChannel() {
                this.loading = true;
                var _this = this;
                this.dialogFormVisible = false;
                let param = {
                    channelName: this.form.name
                };
                this.$store.dispatch('AddChannel', param).then(res => {
                    console.log(res);
                    this.$message('添加成功');
                    _this.getChannels();
                }).catch(error => {
                    console.log(error);
                    this.$message('添加失败');
                });
                this.loading = false;
            },
            delChannel(channel, index) {
                this.loading = true;
                let param = {
                  channelId: channel.channelId
                };
                this.$store.dispatch('DelChannel', param).then(res => {
                    this.$message('删除成功');
                    this.channels.splice(index, 1);
                }).catch(error => {
                    console.log(error);
                    this.$message('删除失败');
                })
                this.loading = false;
            }
        },
        mounted(){
            this.getChannels();
        }
    }
</script>

<style scoped>

</style>