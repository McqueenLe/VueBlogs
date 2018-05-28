<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="姓名"/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getBlogs">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="blogs" highlight-current-row style="width: 100%">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="detail" label="详情"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="danger" size="small">删除</el-button>
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
    import { getBlogList } from '../../api/api';
    export default {
        name: "blogs-manage",
        data() {
            return {
                filters: {
                    name:''
                },
                page: 1,
                blogs:[],
                listLoading:false,
                total: null
            }
        },
        methods: {
            getBlogs() {
                debugger;
                let para = {
                    page: this.page,
                    name: this.filters.name,
                };
                this.listLoading = true;
                getBlogList(para).then((res) => {
                    this.total = res.data.total;
                    this.blogs = res.data.blogs;
                    this.listLoading = false;
                });
            }
        },
        mounted() {
            this.getBlogs();
        }
    }
</script>

<style scoped>

</style>