<template>
  <d2-container>
    <template slot="header">快递员揽件预测演示平台</template>
    <el-container style="height: 650px">
      <!-- 地图 -->
      <el-aside style="width: 65%">
        <div style="width: 100%; height: 100%; ">
          <!-- 地图区域 -->
          <!-- <el-amap vid="amap" style="width: 300px; height: 300px"></el-amap> -->
          <el-amap
            vid="amapDemo"
            view-mode="3D"
            :show-indoor-map="false"
          
            :zoom="amapContext.map.zoom"
            :center="amapContext.map.center"
            :pitch="amapContext.map.pitch"
            :rotation="amapContext.map.rotation"
          >
            <!-- <el-amap-marker
              v-for="marker in amapContext.data.markers"
              :position="marker.position" 
              :key="marker.id"
              :content="marker.content"
              :events="marker.events"
              :clickable="true"
            ></el-amap-marker>
            <el-amap-info-window
              v-if="amapContext.data.window"
              :position="amapContext.data.window.position"
              :visible="amapContext.data.window.visible"
              :content="amapContext.data.window.content"
              :offset="amapContext.data.window.offset"
            ></el-amap-info-window> -->
          </el-amap>
        </div>
      </el-aside>
      <el-main style="margin-left: 20px; padding: 0px; width: 35%">
        <el-card style="height: 100%">
          <div style="height: 45px; width: 100%">
            <div style="padding-top: 10px; padding-left: 10px">
              数据源：
              <el-select
                v-model="dataContext.dataSource"
                size="mini"
                style="width: 20%"
                placeholder="静态"
              >
                <el-option
                  v-for="item in meta.dataSourceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  size="mini"
                >
                </el-option>
              </el-select>
              <a style="padding-left: 20px">数据项： </a>
              <el-select
                v-model="dataContext.dataId"
                size="mini"
                style="width: 40%"
              >
                <el-option
                  v-for="item in meta.dataIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  size="mini"
                >
                </el-option>
              </el-select>
            </div>
            <el-divider></el-divider>
            <div>
              <el-table :data="dataContext.dataList" stripe style="width: 100%">
                <el-table-column prop="id" label="ID"> </el-table-column>
                <el-table-column prop="region" label="地区"> </el-table-column>
                <el-table-column prop="length" label="长度" style="width: 50px">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  style="width: 120px"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click="setDataToMap(scope.row)"
                      type="text"
                      size="small"
                      >绘制</el-button
                    >

                    <el-button type="text" size="small">详细信息</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
    <!-- 底部 -->
    <el-container>
      <div style="background-color: pink; width: 100%; height: 200px"></div>
    </el-container>
  </d2-container>
</template>

<script>
export default {
  name: "predict",
  data: function () {
    // for sidebar left
    return {
      meta: {
        dataSourceList: [
          {
            value: "static",
            label: "静态",
          },
        ],
        dataIdList: [
          {
            value: "static",
            label: "静态无须指定",
          },
        ],
      },
      amapContext: {
        // 地图参数
        map: {
          center: [116.473778, 39.990661],
          position: [116.473778, 39.990661],
          zoom: 14,
          pitch: 0,
          rotation: 15,
          polyLine: [],
        },
        // 地图数据参数 116.480639,39.996356
        data: {
          markers: [
            {
              position: [116.480639, 39.996356],
              id: "1",
              events: {
                click() {
                  // console.log('s')
                  // console.log(position)
                },
              },
            },
          ],
          window: {
            position: [116.480639, 39.996356],
            visible: true,
            content: "" + "<div>show</div>",
            offset: [5, -15],
          },
          // 待揽件点信息
          deal: {},
          // 轨迹信息
          trajectory: [],
        },
      },
      // for right main
      dataContext: {
        // 数据源
        dataSource: "static",
        dataId: "static",
        pageNum: 1,
        pageSize: 10,
        // 数据
        dataList: [
          {
            id: "demo_static_0",
            start: "0",
            groundTruth: [3, 5, 7, 2, 1, 4, 6],
            points: [
              [
                563.3, 120.180031, 30.322666, 2, 1.1979919373241044, 70,
                119.98333333333335, 115.41666666666663,
              ],
              [
                474.15, 120.180031, 30.322666, 2, 1.1979919373241044, 70,
                185.85000000000002, 92.13333333333333,
              ],
              [
                527.6, 120.180031, 30.322666, 2, 1.1979919373241044, 70,
                252.39999999999998, 212.13333333333333,
              ],
              [
                496.4, 120.178986, 30.32284000000001, 2, 2.875180649577851, 168,
                163.60000000000002, 92.13333333333333,
              ],
              [
                488.66666666666674, 120.179331, 30.324025, 2, 3.90203088156994,
                228, 171.33333333333326, 92.13333333333333,
              ],
              [
                499.75, 120.180503, 30.323697, 2, 2.6526964326462315, 155,
                160.25, 92.13333333333333,
              ],
              [
                477.63333333333327, 120.180503, 30.323697, 2,
                2.6526964326462315, 155, 182.36666666666673, 92.13333333333333,
              ],
            ],
            length: 7,
          },
        ],
      },
      // for bottom
      modelContext: {},
    };
  },
  watch: {
    "dataContext.dataSource"(dataSource, older) {
      this.getData();
    },
    "amapContext.data.deal"(deal, older) {
      if (deal != null) {
        // 画出deal相关的点
        // 画出GroundTruth 如果存在
        // 设置地图缩放 中心
      }
    },
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.GET_DEALS(
        this.$data.dataContext.dataSource,
        this.$data.dataContext.dataId,
        this.$data.dataContext.pageNum,
        this.$data.dataContext.pageSize
      );
      const deals = res.deals;
      deals.forEach((element) => {
        element.region = "杭州"; // 静态数据来自于杭州
      });
      this.$data.dataContext.dataList = deals;
    },
    // 把信息保存到地图数据中,wath地图数据就会自动绘画
    async setDataToMap(deal) {
      this.$data.amapContext.data.points = deal;
    },
  },
};
</script>
<style >
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.left-box-card {
  width: 72%;
  background-color: aqua;
}
.left_region {
  width: 72%;
}

.right-region {
  width: 28%;
}
.right-box-card {
  width: 22%;
  background-color: rebeccapurple;
}
</style>
