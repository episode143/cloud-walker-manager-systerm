<template>
    <div>
      <el-select v-model="selectedType" placeholder="请选择类型" @change="fetchData">
        <el-option label="全部" value=""></el-option>
        <el-option label="大" value="大"></el-option>
        <el-option label="中" value="中"></el-option>
        <el-option label="小" value="小"></el-option>
      </el-select>
  
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="age" label="Age"></el-table-column>
        <el-table-column prop="type" label="Type"></el-table-column>
      </el-table>
  
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </template>
  <script>
  import { ref, onMounted } from 'vue';
  
  // 模拟数据生成函数
  const generateMockData = () => {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      const type = ['大', '中', '小'][Math.floor(Math.random() * 3)];
      data.push({
        id: i,
        name: `User ${i}`,
        age: Math.floor(Math.random() * 50 + 18),
        type: type
      });
    }
    return data;
  };
  
  export default {
    setup() {
      const tableData = ref([]);
      const currentPage = ref(1);
      const pageSize = ref(10);
      const total = ref(100);
      const selectedType = ref('');
      const handleSizeChange = (newSize) => {
        pageSize.value = newSize;
        fetchData();
      };
  
      const handleCurrentChange = (newPage) => {
        currentPage.value = newPage;
        fetchData();
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        tableData,
        currentPage,
        pageSize,
        total,
        selectedType,
        fetchData,
        handleSizeChange,
        handleCurrentChange
      };
    }
  };
  </script>