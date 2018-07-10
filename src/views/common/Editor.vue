<template>
    <div>
        <input type="file" id="fileSelect" multiple accept="image/*" @change="onChange" style="display:none" />
        <textarea :id="id" :value="content"></textarea>
    </div>
</template>

<script>
    import axios from 'axios'
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'

    const INIT = 0;
    const CHANGED = 2;
    var EDITOR = null;

    export default {
        name: "editor",
        props: ['content', 'editorHeight'],
        // watch: {
        //     value: function (val) {
        //         debugger;
        //         if (this.status == INIT || tinymce.activeEditor.getContent() != val){
        //             tinymce.activeEditor.setContent(val);
        //         }
        //         this.status = CHANGED
        //     }
        // },
        data: function () {
            return {
                status: INIT,
                id: 'editor-'+new Date().getMilliseconds(),
            }
        },
        methods: {
            // 图片上传
            onChange(files) {
                debugger;
                var file = files.target.files[0];
                let param = new FormData()  // 创建form对象
                param.append('file', file, file.name)  // 通过append向form对象添加数据

                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去

                //添加请求头
                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                };
                axios.post('http://192.168.0.3:8080/api/flow/auth/blog/uploadImg', param, config)
                    .then(response => {
                        debugger;
                        console.log(response)
                        var activeEditor = tinymce.activeEditor; // 获取当前的editor
                        // 将图片插入富文本编辑器
                        activeEditor.execCommand('mceInsertContent', false, '<img alt="Smiley face" height="42" width="42" src="' + response.data.data.imgUrl + '"/>');
                    }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted: function () {
            const _this = this;
            const setting = {
                    language_url: '/static/tinymce/langs/zh_CN.js',
                    skin_url: '/static/tinymce/skins/lightgray',
                    height: this.editorHeight,
                    marginTop: 20,
                    selector:'#'+_this.id,
                    language:"zh_CN",
                    init_instance_callback:function(editor) {
                        EDITOR = editor;
                        console.log("Editor: " + editor.id + " is now initialized.");
                        editor.on('input change undo redo', () => {
                            var content = editor.getContent()
                            _this.$emit('input', content);
                        });
                    },
                plugins: 'lists link',
                toolbar: 'undo redo | styleselect | bold italic | link image | imageupload',
                setup: function (editor) {
                    // 自定义选择图片按钮，
                    editor.addButton('imageupload', {
                        // 按钮，名
                        text: false,
                        // 是否显示图标
                        icon: 'image',
                        //onclick事件
                        onclick: function () {
                            // 这里点击后会插入一句话
                            // editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;')
                            // editor.insertImage('../../static/tinymce/img/icon.png')
                            document.getElementById("fileSelect").click();
                        }
                    })
                }
                };
            tinymce.init(setting);
        },
        beforeDestroy: function () {
            tinymce.get(this.id).destroy();
        }
    }
</script>

<style scoped>

</style>