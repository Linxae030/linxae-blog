import { UploadFile, UploadFiles, UploadProgressEvent } from "element-plus"
import { ref, onMounted } from 'vue';
export default function () {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const fileList = ref([])
    const fileHeader = { Authorization: localStorage.getItem('token') }
    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url!
        dialogVisible.value = true
    }
    const handleRemove = (file: UploadFile) => {
        fileList.value.splice(0, 1)
    }
    onMounted(() => {
        
    })
    return { dialogImageUrl, dialogVisible, disabled, fileList, fileHeader, handlePictureCardPreview, handleRemove }
}