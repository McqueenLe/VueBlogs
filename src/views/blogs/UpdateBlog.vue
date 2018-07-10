<template>
    <el-container>
        <el-main>
            <el-row>
                <el-upload
                        action="http://192.168.0.3:8089/api/flow/auth/blog/uploadImg"
                        ref="upload"
                        :data="upload"
                        name="file"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="onSuccess"
                        style="margin-top: 20px">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-row>

            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <el-input clearable type="text" v-model="blog.title" placeholder="请输入标题"></el-input>

            <editor v-model="blog.detail" v-bind:content="blog.detail" editor-height="300"></editor>

            <el-input type="text" v-model="blog.author" placeholder="请输入作者"></el-input>

            <el-button size="large" type="primary" :loading="false" @click="updateBlog">保存</el-button>
        </el-main>

    </el-container>

</template>

<script>
    import { getToken } from '../../api/auth'
    import axios from 'axios'
    import editor from '../common/Editor'
    import NProgress from 'nprogress'
    export default {
        name: "updateBlog",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                blog: {
                    articleId: this.$route.params.articleId,
                    title: this.$route.params.title,
                    detail: this.$route.params.detail,
                    imageUrl: this.$route.params.imageUrl,
                    author: this.$route.params.author,
                    headUrl: this.$route.params.headUrl
                },
                upload: {
                    token: getToken()
                }
            }
        },
        components: {
            'editor': editor
        },
        methods: {
            /** 图片上传校验*/
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPng = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPng) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            updateBlog() {
                NProgress.start();
                this.$store.dispatch('UpdateBlogById', this.blog).then(res => {
                    NProgress.done();
                    this.$router.push('/blogs')
                }).catch(error => {
                    NProgress.done();
                })
            },
            /** 头图上传成功之后的处理 */
            onSuccess(response, file, fileList) {
                console.log(response);
                this.blog.headUrl = response.data.imgUrl
            }
        }
    }
</script>

<style scoped>
    .el-input {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .el-button {
        margin-top: 20px;
    }
</style>