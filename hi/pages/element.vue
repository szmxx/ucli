<template>
  <div class="flex flex-col gap-y-4">
    <div>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
    <div>
      <el-form
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="Name">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="flex gap-x-2">
    <el-time-picker v-model="time.time1" placeholder="Arbitrary time" />
    <el-time-picker
      v-model="time.time2"
      arrow-control
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script setup lang="ts">
  const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
  })
  const time = reactive({
    time1: '',
    time2: '',
  })
</script>
