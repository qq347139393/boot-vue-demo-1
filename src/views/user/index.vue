<template>
  <div id="users">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="用户名">
        <el-input v-model="formInline.name" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="formInline.gender" placeholder="性别">
          <el-option v-for="item in genderList" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button type="warning" icon="el-icon-circle-plus-outline" @click="showEditDialog()">新增</el-button>
        <el-button type="success" icon="el-icon-upload2" @click="handleImport()">导入</el-button>
        <el-button type="info" icon="el-icon-download" @click="handleExport()">导出</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData" style="width: 100%" v-loading="loading2" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="用户名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="140"></el-table-column>
      <el-table-column prop="gender" :formatter="genderFormat" label="性别" width="140"></el-table-column>
      <el-table-column prop="describ" label="描述信息" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template scope="scope">
<!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <el-button type="success" size="small" icon="el-icon-edit"  @click="showEditDialog(scope.$index)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete"  @click="removeData(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <div class="r_btn">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="batchRemove">批量删除</el-button>
      </div>
      <div class="r_page">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5,10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- Form -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="form.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.gender" :label="0">男</el-radio>
          <el-radio v-model="form.gender" :label="1">女</el-radio>
          <el-radio v-model="form.gender" :label="-1">保密</el-radio>
        </el-form-item>
        <el-form-item label="描述信息" :label-width="formLabelWidth">
          <el-input v-model="form.describ" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
          ref="upload"
          :limit="1"
          accept=".xlsx"
          :headers="upload.headers"
          :action="upload.url"
          :name="upload.excelFile"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
<!--          <div class="el-upload__tip" slot="tip">-->
<!--            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据-->
<!--          </div>-->
          <span>仅允许导入xlsx格式文件。</span>
<!--          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>-->
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 导入错误的提示信息的组件 -->
    <el-dialog title="导入校验错误原因"
               :visible.sync="dialogTableVisible"
               width="100%">
      <el-table
          :data="excelErrorTableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
            prop="errorRow"
            label="错误记录:错误字段"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="errorMsgs"
            label="错误信息"
            sortable>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>
<style type="text/css" scoped>
.block {
  margin-top: 20px;
  width: 100%;
}
.block .r_btn {
  float: left;
  width: 90px;
}
.block .r_page {
  float: right;
}
</style>
<script type="text/javascript">
import {selectsByPage, updatesByIds,inserts,deletesByIds,selectsByIds,excelExport} from '@/api/user/index'
import { getToken } from '@/utils/token'
import {nanoid} from 'nanoid'

export default {
  data() {
    return {
      tableData: [],
      excelErrorTableData:[{
        id: null,
        errorRow: '',
        errorMsgs: '',
        children: []
      }],
      formInline: {
        name: null,
        gender: null,
        // id:''
      },
      currentPage:1,
      total:0,
      pageSize:5,
      genderList:[
        {key:"男",value:0},
        {key:"女",value:1},
        {key:"保密",value:-1},
        {key:"",value: null}
      ],
      dialogFormVisible: false,
      dialogTableVisible:false,
      formLabelWidth: '120px',
      form: {
        id:null,
        name: '',
        password:null,
        age: null,
        gender:null,
        describ:''
      },
      loading2: false,
      multipleSelection: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        // updateSupport: 0,
        excelFile:'excelFile',
        // // 设置上传的请求头部
        headers: { jwtToken:getToken()},
        // 上传的地址
        url: "/user/excelImport"
      },
    }
  },
  computed: {
  },
  mounted() {
    this.$store.dispatch('showHeader');
    this.loadData();
  },
  methods: {
    //加载数据
    loadData() {
      this.loading2 = true;
      const data = {
        current: this.currentPage,
        size: this.pageSize,
        name: this.formInline.name==""?null:this.formInline.name,
        gender: this.formInline.gender
      };
      selectsByPage(data).then(function(res){
        console.log("@user.result",res.data)
        let result=res.data;
        this.tableData = result.data.records;
        this.total = result.data.total;
        this.loading2 = false;
      }.bind(this)).catch(function (res) {
        this.loading2 = false;
        console.log(res.data);
      }.bind(this));
    },
    //查询
    onSubmit() {
      this.loadData();
    },
    genderFormat(row) {
      if (row.gender === 0) {
        return '男'
      } else if(row.gender === 1) {
        return '女'
      }else {
        return '保密'
      }
    },
    //改变分页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadData();
    },
    //跳转页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
    },
    //打开编辑窗口
    async showEditDialog(row) {
      if (row == undefined) {//新增
        this.form.id = null;
        this.form.name = '';
        this.form.age = null;
        this.form.gender = null;
        this.form.describ = '';
        this.dialogFormVisible = true;
      } else {//修改
        var data = this.tableData[row];
        this.form.id = data.id;
        //其他的要及时去后端查询出最新的字段值
        await selectsByIds({ids: data.id}).then(res => {
          let data=res.data;
          console.log('请求成功了')
          console.log(data)
          if (data.code === '000000') {//请求成功
            // this.$message({
            //   message: data.msg,
            //   type: 'success'
            // });
            this.form.name = data.data[0].name;
            this.form.age = data.data[0].age;
            this.form.gender = data.data[0].gender;
            this.form.describ = data.data[0].describ;
            this.dialogFormVisible = true;
          } else {
            alert("当前要修改的记录已经不存在")
            //清空修改框中的数据
            this.form.id = null;
            this.form.name = '';
            this.form.password=null;
            this.form.age = null;
            this.form.gender = null;
            this.form.describ = '';
            this.dialogFormVisible = false;
            //刷新列表
            this.loadData();
            return;
          }
        }, res => {
          let error=res.data
          //请求后更新List的数据
          alert(error.message)
          //清空修改框中的数据
          this.form.id = null;
          this.form.name = '';
          this.form.password=null;
          this.form.age = null;
          this.form.gender = null;
          this.form.describ = '';
          this.dialogFormVisible = false;
          //刷新列表
          this.loadData();
        });
      }
    },
    async insertOrUpdate() {
      if (this.form.name === "" || this.form.name === null) {
        this.$message.error('用户名不能为空');
        return;
      }
      // [
      //   {
      //     "id":3,
      //     "age": 23,
      //     "describ": "测试33",
      //     "gender": 0,
      //     "name": "测试33",
      //     "password": "123"
      //   },{
      //   "id":4,
      //   "age": 13,
      //   "describ": "测试44",
      //   "gender": 1,
      //   "name": "测试44",
      //   "password": "123"
      // }
      // ]
      //加工要转入后端的参数
      let userArr = new Array();
      userArr.push(this.form)
      if(this.form.id==null){//新增
        //调用新增接口来新增当前记录
        await inserts(userArr).then(res => {
          let data=res.data;
          console.log('请求成功了')
          console.log(data)
          if (data.code === '000000') {//请求成功
            this.$message({
              message: data.msg,
              type: 'success'
            });
            //清空修改框中的数据
            this.form.id = null;
            this.form.name = '';
            this.form.password=null;
            this.form.age = null;
            this.form.gender = null;
            this.form.describ = '';
            this.dialogFormVisible = false;
            //刷新列表
            this.loadData();
          } else {
            alert(data.msg)
          }
        }, res => {
          //请求后更新List的数据
          alert(res.data.message)
        });
      }else{//修改
        //调用修改接口来修改当前记录的字段值
        await updatesByIds(userArr).then(res => {
          let data=res.data;
          console.log('请求成功了')
          console.log(data)
          if (data.code === '000000') {//请求成功
            this.$message({
              message: data.msg,
              type: 'success'
            });
            //清空修改框中的数据
            this.form.id = null;
            this.form.name = '';
            this.form.password=null;
            this.form.age = null;
            this.form.gender = null;
            this.form.describ = '';
            this.dialogFormVisible = false;
            //刷新列表
            this.loadData();
          } else {
            alert(data.msg)
          }
        }, res => {
          //请求后更新List的数据
          alert(res.data.message)
        });
      }
    },
    removeData(row) {
      var data = this.tableData[row];
      this.$confirm('确定要删除"'+data.name+'"?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //调用修改接口来修改当前记录的字段值
        //加工要转入后端的参数

        await deletesByIds({ids:data.id}).then(res => {
          let data=res.data;
          console.log('请求成功了')
          console.log(data)
          if (data.code === '000000') {//请求成功
            this.$message({
              message: data.msg,
              type: 'success'
            });
            //刷新列表
            this.loadData();
          } else {
            alert(data.msg)
          }
        }, res => {
          //请求后更新List的数据
          alert(res.data.message)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    batchRemove() {
      this.$confirm('确定要批量删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let ids='';
        this.multipleSelection.forEach(row => {
          // console.log(row.id);
          ids+=row.id+','
        });
        ids=ids.substr(0,ids.length-1);
        await deletesByIds({ids:ids}).then(res => {
          let data=res.data;
          console.log('请求成功了')
          console.log(data)
          if (data.code === '000000') {//请求成功
            this.$message({
              message: data.msg,
              type: 'success'
            });
            //刷新列表
            this.loadData();
          } else {
            alert(data.msg)
          }
        }, res => {
          //请求后更新List的数据
          alert(res.data.message)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    handleFileSuccess(res, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      let data=res.data;
      console.log(data);
      if(data.code=='000000'){//导入成功
        this.$message({
          message: data.msg,
          type: 'success'
        });
        //刷新列表
        this.loadData();
      }else{//导入失败
        console.log(data);
        var arr = [];
        console.log(data.unqualifiedRows);
        for(var j = 0;j<data.unqualifiedRows.length; j++){
          let item=data.unqualifiedRows[j];
          let record=new Object();
          record.id=nanoid();
          record.errorRow='记录'+item.rowOrder;
          record.errorMsgs='';
          let children=[];

          console.log(item);

          for(var i=0;i<item.rowMsgs.length;i++){
            var item2=item.rowMsgs[i];
            let child=new Object();
            child.id=nanoid();
            child.errorRow=item2.msgName;
            child.errorMsgs='';
            for (var i1=0;i1<item2.unqualifiedMsg.length;i1++){
              child.errorMsgs+='['+item2.unqualifiedMsg[i1]+']';
            }
            children.push(child);
          }
          record.children=children;
          arr.push(record);
        }
        this.excelErrorTableData=arr;
        this.dialogTableVisible=true;
      }
      // this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + res.data.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      // this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    /** 导出按钮操作 */
    handleExport() {
      const data = {
        // current: this.currentPage,
        // size: this.pageSize,
        name: this.formInline.name==""?null:this.formInline.name,
        gender: this.formInline.gender
      };
      excelExport(data).then(res => {//这两个data不是同一个对象,只是名字一样
        let data=res.data;
        let blob = new Blob([data],{type: 'application/octet-stream'});
        let fileName = 'filename.xls';
        // 如果后端返回文件名
        let contentDisposition = res.headers['content-disposition'];
        fileName = decodeURI(contentDisposition.split('=')[1]);
        fileName=fileName.substring(7);//UTF-8''...
        if ('download' in document.createElement('a')) {  // 非IE下载
          let link = document.createElement('a');
          link.download = fileName;
          link.style.display = 'none';
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href) ; // 释放URL 对象
          document.body.removeChild(link);
        } else {  // IE10+下载
          navigator.msSaveBlob(blob,fileName);
        }
      }, error => {
        //请求后更新List的数据
        alert(error.message)
      });
    },

  }
}
</script>
