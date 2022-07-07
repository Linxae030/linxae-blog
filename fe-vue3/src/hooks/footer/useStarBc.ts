import { onMounted } from 'vue';
export default function () {
    let starCount: number = 80;
    function resetStar(starCount: number) {
        const stars = document.querySelectorAll(".star") as NodeListOf<HTMLElement>;
        for (let i = 0; i < starCount; i++) {
            let left = Math.floor(Math.random() * window.innerWidth);
            let top = Math.floor(Math.random() * 300 / 1.5);
            let animationDelay = Math.floor(Math.random() * i)
            stars[i].style.left = left + 'px';
            stars[i].style.top = top + 'px';
            stars[i].style.animationDelay = animationDelay + 's';
        }
    }
    onMounted(() => {
        resetStar(starCount)
    })

    return starCount
}