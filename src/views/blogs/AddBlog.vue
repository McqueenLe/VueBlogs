<template>
    <el-container>
        <el-main>
            <el-form>
                <el-form-item label="添加文章头图"></el-form-item>
                <el-form-item>
                    <el-upload
                            action="http://192.168.0.3:8080/api/flow/auth/blog/uploadImg"
                            ref="upload"
                            :data="upload"
                            name="file"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-success="onSuccess"
                            style="margin-top: 20px">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

                <el-form-item>
                    <el-input clearable type="text" v-model="blog.title" placeholder="请输入标题"></el-input>
                </el-form-item>

                <el-from-item>
                    <editor v-bind:content="blog.detail" v-model="blog.detail" editor-height="300"></editor>
                </el-from-item>

                <el-form-item style="margin-top: 20px">
                    <el-input type="text" v-model="blog.author" placeholder="请输入作者"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input type="text" v-model="blog.keyWord" placeholder="请输入关键词,多个用逗号(',')隔开"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="blog.channelId" placeholder="请选择所属频道">
                        <el-option
                                v-for="item in channels"
                                :key="item.channelName"
                                :label="item.channelName"
                                :value="item.channelId">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button size="large" type="primary" :loading="false" @click="addBlog">保存</el-button>
                </el-form-item>

            </el-form>
        </el-main>

    </el-container>

</template>

<script>
    import { getToken } from '../../api/auth'
    import axios from 'axios'
    import editor from '../common/Editor'
    import NProgress from 'nprogress'
    export default {
        name: "add-blog",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                blog: {
                    title: '',
                    detail: '',
                    imageUrl: '',
                    author: '',
                    headUrl: '',
                    keyWord: '',
                    channelId: ''
                },
                upload: {
                    token: getToken()
                },
                channels: []
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
            addBlog() {
                debugger;
                NProgress.start();
                this.$store.dispatch('AddBlog', this.blog).then(res => {
                    NProgress.done();
                    this.blog.title = '';
                    this.blog.detail= '';
                    this.blog.imageUrl= '';
                    this.blog.author= '';
                    this.blog.headUrl= '';
                    this.blog.keyWord='';
                    this.$refs.upload.clearFiles();
                    this.$message('添加成功');
                }).catch(error => {
                    NProgress.done();
                    this.$message('添加失败');
                })
            },
            /** 头图上传成功之后的处理 */
            onSuccess(response, file, fileList) {
                console.log(response);
                this.blog.headUrl = response.data.imgUrl
            },
            getChannels() {
                let param = {

                };
                this.$store.dispatch('GetChannels', param).then(res => {
                    console.log(res);
                    this.channels = res.data.data.channels;
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getChannels();
        }
    }
</script>

<style scoped>

</style>