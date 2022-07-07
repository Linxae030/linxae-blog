export default function () {
    let typeMessageList: string[] = ["快楽の価値を忘れて揺蕩う少女は何処へ行った", "おざなりな亡霊が掘り出した心の箱"]
    //随机数字随机返回字符串
    let rNum = Math.floor(Math.random() * typeMessageList.length)
    let index = rNum === typeMessageList.length ? rNum - 1 : rNum
    return typeMessageList[index]
}