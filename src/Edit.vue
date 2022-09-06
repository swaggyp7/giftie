<template>
  <div>
    <Button type="primary" @click="add">添加</Button>
    <Table stripe style="width: 100%" :data="data">
      <TableColumn label="名称" prop="name" min-width="100" align="center">
      </TableColumn>
      <TableColumn label="别名" prop="alias" min-width="100" align="center">
      </TableColumn>
      <TableColumn label="图片" prop="image" min-width="100" align="center">
        <template slot-scope="scope">
          <img style="width:100px;height:100px;" :src="scope.row.image" />
        </template>
      </TableColumn>
      <TableColumn
        label="描述"
        prop="description"
        min-width="100"
        align="center"
      >
      </TableColumn>
      <TableColumn label="价格" prop="price" min-width="100" align="center">
      </TableColumn>
      <TableColumn label="状态" prop="status" min-width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="updateStatus(scope.row)"
          ></el-switch>
        </template>
      </TableColumn>
      <TableColumn label="操作" prop="price" min-width="100" align="center">
        <template slot-scope="scope">
          <Button type="primary" size="mini" @click="edit(scope.row)"
            >编辑</Button
          >
        </template>
      </TableColumn>
    </Table>
    <Dialog title="编辑" :visible.sync="dialogVisible" width="80%">
      <div>
        名称：<ElInput place="请输入名称" v-model="currentEdit.name"></ElInput>
        别名：<ElInput place="请输入别名" v-model="currentEdit.alias"></ElInput>
        描述：<ElInput
          type="textarea"
          place="请输入描述"
          v-model="currentEdit.description"
        ></ElInput>
        价格：
        <input-number v-model="currentEdit.price" place="价格"></input-number>
        启用：<el-switch
          v-model="currentEdit.status"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
        图片：
        <el-upload
          class="avatar-uploader"
          action="https://api.freesty1e.cn/file/upload/"
          :show-file-list="false"
          :on-success="imgSuccess"
          :before-upload="beforeUpload"
        >
          <img
            v-if="currentEdit.image"
            :src="currentEdit.image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <Button type="primary" @click="submit">保存</Button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  Table,
  TableColumn,
  Button,
  Dialog,
  InputNumber,
  Input,
  Upload,
  Message,
  Loading,
  Switch,
} from "element-ui";
import { homeConfig } from "./gift.setting";
export default {
  name: "Home",
  components: {
    Table,
    TableColumn,
    Button,
    Dialog,
    ElInput: Input,
    InputNumber,
    ElUpload: Upload,
    ElSwitch: Switch,
  },
  data() {
    return {
      data: [],
      dialogVisible: false,
      currentEdit: {
        name: "",
        alias: "",
        image: "",
        description: "",
        status: 0,
        price: 0,
      },
      loadingInstance: {},
    };
  },

  methods: {
    async getData() {
      let resourceData = await axios.post(`${homeConfig.apiUrl}/gifts/list`, {
        selectAll: 1,
      });
      this.data = resourceData.data.data;
    },
    edit(row) {
      this.currentEdit = row;
      this.dialogVisible = true;
    },
    add() {
      this.currentEdit = { status: 0 };
      this.dialogVisible = true;
    },
    updateStatus(row) {
      this.currentEdit = row;
      this.submit();
    },
    imgSuccess(res) {
      if (res.success) {
        this.$set(this.currentEdit, "image", res.data.url);
        Message({
          message: "上传成功！",
          type: "success",
        });
      } else {
        Message({
          message: "上传失败！",
          type: "warning",
        });
      }
      this.loadingInstance.close();
    },
    async submit() {
      this.loadingInstance = Loading.service({ fullscreen: true });
      let res = await axios.post(
        `${homeConfig.apiUrl}/gifts/edit`,
        this.currentEdit
      );
      if (res.data.success) {
        this.dialogVisible = false;
        Message({
          message: "保存成功！",
          type: "success",
        });
      } else {
        Message({
          message: res.data.msg,
          type: "warning",
        });
      }
      this.loadingInstance.close();
      this.getData();
    },
    beforeUpload() {
      this.loadingInstance = Loading.service({ fullscreen: true });
    },
  },

  created() {
    this.getData();
  },

  mounted() {},
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
