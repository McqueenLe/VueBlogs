<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="作者" v-model="filters.author"/>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="filters.publishState" clearable placeholder="发布状态">
                        <el-option label="待发布" key="0" value="0"></el-option>
                        <el-option label="已发布" key="1" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getBlogs">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="blogs" v-loading="listLoading" highlight-current-row style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="文章详情">
                            <span>{{ props.row.detail }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="publishState" label="发布状态">
                <template scope="scope">
                    <span v-if="scope.row.publishState === 1" style="color: red">已发布</span>
                    <span v-else>待发布</span>
                </template>
            </el-table-column>
            <el-table-column prop="insertTime" label="创建时间"></el-table-column>

            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="danger" size="small" @click="deleteBlog(scope.$index, scope.row)">删除</el-button>
                    <el-button type="info" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-button type="danger" :disabled="true">批量删除</el-button>
            <el-pagination layotu="prev,pager,next" :page-size="20" :total="100" style="float:right;"></el-pagination>
        </el-col>
    </section>
</template>

<script>
    export default {
        name: "blogs-manage",
        data() {
            return {
                filters: {
                    author:'',
                    publishState: null,
                    page: 1,
                },
                blogs:[],
                listLoading:false,
                total: null
            }
        },
        methods: {
            getBlogs() {
                let params = {
                    page: this.filters.page,
                    author: this.filters.author,
                    publishState: this.filters.publishState
                };
                this.listLoading = true;
                this.$store.dispatch('GetBlogList', params).then(res => {
                    this.listLoading = false;
                    this.blogs = res.data.data.articles;
                }).catch(error => {
                    debugger;
                    this.listLoading = false
                })


                // getBlogList(para).then((res) => {
                //     debugger;
                //     this.total = res.data.total;
                //     this.blogs = [];
                //     for(var i=0; i<res.data.blogs.length; i++) {
                //         this.blogs.push(res.data.blogs[i]);
                //     }
                //     // this.blogs = res.data.blogs;
                //     this.listLoading = false;
                // });
            },
            deleteBlog(index, row) {
                this.listLoading = true;
                this.$store.dispatch('DelBlogById', row).then(res => {
                    this.listLoading = false;
                    this.blogs.splice(index, 1);
                }).catch(error => {
                    this.listLoading = false
                })
            },
            updateBlog(index, row) {
                this.listLoading = true;
                this.$store.dispatch('', row).then(res => {

                })
            }
        },
        mounted() {
            this.getBlogs();
        }
    }
</script>

<style scoped>
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>