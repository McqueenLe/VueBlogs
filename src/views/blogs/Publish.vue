<template>
    <section>
        <el-col class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="info">预览</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="publish">发布</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="blogs" v-loading="listLoading" @selection-change="selsChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="detail" label="详情"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="publishState" label="发布状态">
                <template scope="scope">
                    <span v-if="scope.row.publishState === 1" style="color:red">已发布</span>
                    <span v-else>待发布</span>
                </template>
            </el-table-column>
            <el-table-column prop="insertTime" label="创建时间"></el-table-column>
        </el-table>

        <el-col class="toolbar">
            <el-pagination layotu="prev,pager,next" :page-size="20" :total="100" style="float: right"></el-pagination>
        </el-col>
    </section>
</template>

<script>
    import { getBlogList,batchPublish } from '../../api/api'
    export default {
        name: "publish",
        data() {
            return {
                listLoading: false,
                blogs: [],
                sels: []
            }
        },
        methods: {
            getBlogs: function() {
                let params = { publishState:'0' };
                this.listLoading = true;
                getBlogList(params).then((res) => {
                    this.blogs = res.data.blogs;
                    this.listLoading = false;
                });
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            publish: function() {
                if(this.sels && this.sels.length > 0) {
                    var ids = this.sels.map(item => item.id).toString();
                    this.$confirm('确定发布这些博客', '提示', {
                        type: 'warnint'
                    }).then(() => {
                        this.listLoading = true;
                        let params = { ids: ids};
                        batchPublish(params).then((res) => {
                            this.listLoading = false;
                            this.blogs = res.data.blogs;
                            this.$message(res.data.msg);
                        })
                    })
                }
            }
        },
        mounted() {
            this.getBlogs();
        }
    }
</script>

<style scoped>

</style>