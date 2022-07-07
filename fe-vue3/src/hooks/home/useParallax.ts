import Parallax from "parallax-js";
import { onMounted } from "vue";
export default function () {

    onMounted(() => {
        var scene = document.getElementById("scene");
        var parallaxInstance = new Parallax(scene, {
            relativeInput: true, //默认值：false 使鼠标相对于场景元素的位置输入。
            clipRelativeInput: false, //默认值：false 将鼠标输入剪切到场景的边界。这意味着一旦光标到达场景元素的边缘，移动就会停止。
            hoverOnly: false, //默认值：false 视差仅在光标位于场景元素上方时才有效，否则所有图层将移回到其初始位置。
        });
    });
}