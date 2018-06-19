<template>
    <textarea :id="id" :value="value"></textarea>
</template>

<script>
    import tinymce from 'tinymce'
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
        props: {
            value: {
                type: String,
                required: true
            },
            setting: {}
        },
        watch: {
            value: function (val) {
                console.log('init ' + val)
                if (this.status == INIT || tinymce.activeEditor.getContent() != val){
                    tinymce.activeEditor.setContent(val);
                }
                this.status = CHANGED
            }
        },
        data: function () {
            return {
                status: INIT,
                id: 'editor-'+new Date().getMilliseconds(),
            }
        },
        methods: {

        },
        mounted: function () {
            const _this = this;
            const setting = {
                    language_url: '/static/tinymce/langs/zh_CN.js',
                    skin_url: '/static/tinymce/skins/lightgray',
                    height: 300,
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
                plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                toolbar:'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                };
            Object.assign(setting, _this.setting);

            tinymce.init(setting);
        },
        beforeDestroy: function () {
            tinymce.get(this.id).destroy();
        }
    }
</script>

<style scoped>

</style>