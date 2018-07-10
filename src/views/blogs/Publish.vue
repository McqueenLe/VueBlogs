<template>
    <section>
        <el-col class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="info" @click="preview">预览</el-button>
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
            <el-table-column show-overflow-tooltip=true prop="detail" label="详情"></el-table-column>
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
                let params = {
                    publishState: 0
                };
                this.listLoading = true;
                this.$store.dispatch('GetBlogList', params).then(res => {
                    this.listLoading = false
                    this.blogs = res.data.data.articles
                }).catch(error => {
                    this.listLoading = false
                    console.log(error)
                })
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            publish: function() {
                if(this.sels && this.sels.length > 0) {
                    var ids = [];
                    this.sels.forEach(function(value, index, array) {
                        ids.push(value.articleId);
                    });
                    this.$confirm('确定发布这些博客', '提示', {
                        type: 'warnint'
                    }).then(() => {
                        this.listLoading = true;
                        let params = { ids: ids.join().toString()};
                        this.$store.dispatch('PublishBlog', params).then(res => {
                            this.listLoading = false;
                            this.getBlogs();
                        }).catch(error => {
                            this.listLoading = false;
                            console.log(error)
                        })
                    })
                } else {
                    this.$message('请选择要发布的文章');
                }
            },
            preview: function() {
                if(this.sels && this.sels.length == 1) {
                    debugger;
                    const article = this.sels[0];
                    this.$router.push({name: '预览博客', params: {detail: article.detail}});
                }  else {
                    this.$message('请选择要预览的文章');
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