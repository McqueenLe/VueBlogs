<template>
    <el-container>
        <el-main>
            <el-row>
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        style="margin-top: 20px">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-row>

            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <el-input clearable type="text" v-model="blog.title" placeholder="请输入标题"></el-input>

            <!--<el-input type="textarea" style="margin-top: 20px" v-model="blog.detail" placeholder="请输入正文" :rows="10"></el-input>-->
            <editor :value="富文本编辑器" ></editor>

            <el-input type="text" v-model="blog.author" placeholder="请输入作者"></el-input>

            <el-button size="large" type="primary" :loading="false" @click="addBlog">保存</el-button>
        </el-main>

    </el-container>

</template>

<script>
    import editor from '../common/Editor'
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
                    author: ''
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
            addBlog() {
                this.$router.push({ name:'博客列表', path: '/blogs', params: { blog: this.blog }})
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