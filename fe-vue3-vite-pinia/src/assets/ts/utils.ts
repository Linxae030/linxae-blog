export function handleImgPath(path: string) {
    let temp: string[] = path.split('/');
    temp.splice(3, 2)
    return temp.join('/')
}