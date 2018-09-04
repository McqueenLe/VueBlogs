<template>
    <section>
        <el-col>
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="info" @click="getGroupManagers">刷新</el-button>
                    <el-button type="success" >添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="managers" v-loading="loading">
            <el-table-column label="名称" prop="groupName"></el-table-column>
            <el-table-column label="注释" prop="groupInfo"></el-table-column>
            <el-table-column label="创建者" prop="adminName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="info" @click="showDialog(scope.$index, scope.row)">权限管理</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col>
            <el-dialog title="权限管理" :visible.sync="dialogFormVisible">
                <el-tree
                        :data="actions"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        highlight-current
                        check-on-click-node
                        :default-checked-keys="[5]"
                        :props="defaultProps">

                    <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
                        <!--<span>{{ node.label }}</span>-->
                        <!--<span>-->
                          <!--<el-button-->
                                  <!--type="text"-->
                                  <!--size="mini">-->
                            <!--Append-->
                          <!--</el-button>-->
                          <!--<el-button-->
                                  <!--type="text"-->
                                  <!--size="mini">-->
                            <!--Delete-->
                          <!--</el-button>-->
                        <!--</span>-->
                      <!--</span>-->
                </el-tree>

                <el-button class="button-save" type="info">保存</el-button>
            </el-dialog>
        </el-col>

    </section>
</template>

<script>
    export default {
        name: "group-manager",
        data() {
            return {
                managers: [],
                loading: false,
                dialogFormVisible: false,
                actions: [],
                defaultProps: {
                    children: 'children',
                    label: 'actionName'
                }
            }
        },
        methods: {
            addGroup() {
                this.loading = true;
                let param = {

                };
                this.$store.dispatch('AddGroup', param).then(res => {

                }).catch(error => {

                });
            },
            getGroupManagers() {
                this.loading = true;
                let param = {

                };
                this.$store.dispatch('GetGroups', param).then(res => {
                    this.loading = false;
                    this.managers = res.data.data.managers;
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                })
            },
            showDialog(index, row) {
                let param = {
                    groupId: row.groupId
                };
                this.$store.dispatch('GetPermissionsByGroupId', param).then(res => {
                    debugger;
                    this.actions = res.data.data.groups;
                    this.dialogFormVisible = true;
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getGroupManagers();
        }
    }
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .button-save {
        margin-top: 10px;
        margin-bottom: 10px;
        float: right
    }
</style>