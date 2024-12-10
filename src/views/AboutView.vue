<!-- 头像上传 -->

<template>
  <div>
    <div class="avatar-container">
      <div class="avatar-preview" :style="{ backgroundImage: `url(${userAvatar})` }"></div>
      <button @click="openDialog">上传头像</button>
    </div>
    <el-dialog v-model="dialogVisible" title="上传头像">
      <div>
        <img v-if="previewUrl" :src="previewUrl" class="preview-image" />
        <input type="file" @change="handleFileChange" accept="image/*" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="confirmUpload">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      previewUrl: null,
      selectedFile: null,
      userAvatar: localStorage.getItem('userAvatar') || '/path/to/default/avatar.jpg', // 默认头像路径
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.previewUrl = null;
      this.selectedFile = null;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewUrl = URL.createObjectURL(file);
      }
    },
    async confirmUpload() {
      if (!this.selectedFile) {
        alert('请选择一张图片');
        return;
      }

      // 将文件转换为 Base64 编码
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userAvatar = reader.result;
        localStorage.setItem('userAvatar', this.userAvatar); // 保存到 localStorage
        this.closeDialog();
      };
      reader.readAsDataURL(this.selectedFile);
    },
  },
};
</script>

<style scoped>
.avatar-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  background-size: cover; /* 裁剪图片以填充容器 */
  background-position: center; /* 图片居中 */
  background-repeat: no-repeat;
  border-radius: 50%;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 10px;
}
</style>