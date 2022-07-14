import { ref, toRaw } from 'vue';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
export default function () {
    //文章标题
    let inputTitle = ref("")
    //markdown内容
    let markdown = ref("")
    function handlePost() {
        const html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(markdown.value));
        console.log('html', html)
    }
    return { inputTitle, markdown, handlePost }
}