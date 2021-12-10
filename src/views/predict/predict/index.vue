<template>
  <d2-container>
    <template slot="header">快递员揽件预测演示平台</template>
    <el-container style="height: 650px">
      <!-- 地图 -->
      <el-aside style="width: 65%">
        <el-container
          style="width: 100%; height: 100%"
          v-loading="amapContext.map.loadding"
        >
          <l-map
            ref="predictMap"
            :zoom="amapContext.map.zoom"
            :center="amapContext.map.center"
            :bounds="amapContext.map.bounds"
          >
            <l-tile-layer
              :url="amapContext.map.url"
              :attribution="amapContext.map.attribution"
            ></l-tile-layer>
            <l-marker
              ref="markers"
              v-for="(marker, idx) in amapContext.data.markers"
              :key="idx"
              :lat-lng="marker.position"
              :icon="marker.iconShow"
            >
              <l-popup
                ref="popups"
                :option="{
                  minWidth: 60,
                }"
              >
                该位置一共存在{{ marker.innerCount }}个订单
                <div />
                经纬度:{{ marker.latlng }}
                <div />
                地址: {{ marker.address }}
              </l-popup>
            </l-marker>
            <!-- <l-marker :lat-lng="[39.996356, 116.480639]"></l-marker> -->
          </l-map>
        </el-container>
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
    <el-container style="margin-top: 20px">
      <el-card style="width: 100%">
        <div style="margin-top: 5px; margin-left: 20px">
          <div>
            <el-collapse>
              <el-collapse-item
                :title="
                  '当前揽件数据:' +
                  dataContext.dataList[amapContext.data.dealIdx].id
                "
                name="2"
              >
                <div style="margin-left: 12px; margin-top: 20px">
                  当前揽件数据id:
                  <a style="margin-left: 30px">
                    {{ dataContext.dataList[amapContext.data.dealIdx].id }}
                  </a>
                  <el-table
                    :data="modelContext.markersTable"
                    style="margin-top: 20px; width: 100%"
                    :row-class-name="tableRowClassName"
                    border
                  >
                    <el-table-column prop="timeIdx" label="下单顺序" width="100">
                    </el-table-column>
                    <el-table-column prop="location" label="经纬度">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column prop="dealTime" label="时间">
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <el-divider></el-divider>
          <div style="margin-top: 20px">
            <el-row style="margin-top: 20px">
              <el-col :span="5">
                <a> 预测模型:</a>
                <el-select
                  v-model="modelContext.modelIdx"
                  placeholder="请选择一个模型"
                  filterable
                  style="left: 10px"
                  size="small"
                >
                  <el-option
                    v-for="(model, idx) in meta.modelList"
                    :key="idx"
                    :label="model.name + model.version"
                    :value="idx"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1">
                <!-- <el-button
                  style="marigin-left: 50px"
                  type="primary"
                  icon="el-icon-search"
                  size="small"
                  >预测</el-button
                > -->
              </el-col>
            </el-row>
          </div>

          <div style="margin-top: 25px">
            <el-row>
              <el-col :span="12">
                <a>预测结果:</a>
                <el-timeline style="margin-left: 100px; margin-top: 15px">
                  <el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心
                  </el-timeline-item>
                  <el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心 </el-timeline-item
                  ><el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心 </el-timeline-item
                  ><el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心
                  </el-timeline-item>
                  <!-- <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :timestamp="activity.timestamp"
                  >
                    {{ activity.content }}
                  </el-timeline-item> -->
                </el-timeline>
              </el-col>

              <el-col :span="12">
                <a>快递员真实揽件路径 :</a>
                <el-timeline style="margin-left: 100px; margin-top: 15px">
                  <el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心
                  </el-timeline-item>
                  <el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心 </el-timeline-item
                  ><el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心 </el-timeline-item
                  ><el-timeline-item>
                    经纬度:120.180503,30.323697
                    <div />
                    地址:浙江省杭州市拱墅区东新街道东方茂商业中心T3新天地购物中心
                  </el-timeline-item>
                  <!-- <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :timestamp="activity.timestamp"
                  >
                    {{ activity.content }}
                  </el-timeline-item> -->
                </el-timeline>
              </el-col>
            </el-row>
            <el-row style="width: 900px">
              <el-descriptions
                class="margin-top"
                title="评价指标"
                :column="3"
                border
              >
                <el-descriptions-item label="前三点命中个数"
                  >kooriookami</el-descriptions-item
                >
                <el-descriptions-item label="肯德尔系数"
                  >kooriookami</el-descriptions-item
                >
                <el-descriptions-item label="LSD"
                  >kooriookami</el-descriptions-item
                >
              </el-descriptions>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-container>
  </d2-container>
</template>

<script>
import MathUtil from "@/libs/util.math.js";
import L from "leaflet";
import { latLngBounds } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import log from "@/libs/util.log";
let vm;
export default vm = {
  name: "predict",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
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
        modelList: [
          {
            name: "greedy_distance",
            version: "1.1.0",
          },
        ],
      },
      amapContext: {
        // 地图参数
        map: {
          bounds: null,
          center: [39.990661, 116.473778],
          position: [39.990661, 116.473778],
          zoom: 14,
          pitch: 0,
          rotation: 15,
          polyLine: [],
          loadding: false,
          markerIcon: L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconSize: [30, 50], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [15, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [15, 64], // the same for the shadow
            popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
          }),
          attribution:
            '&copy; <a target="_blank" >INSIS spring</a> contributors',
          url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
        },
        // 地图数据参数
        data: {
          markers: [
            {
              position: [39.995839, 116.477646],
              proto: {
                position: [39.995839, 116.477646],
                id: "1",
              },
              iconShow: L.icon({
                iconUrl: icon,
                shadowUrl: iconShadow,

                iconSize: [30, 50], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [15, 50], // point of the icon which will correspond to marker's location
                shadowAnchor: [15, 64], // the same for the shadow
                popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
              }),
            },
          ],
          dealIdx: 1, // 当前业务是哪个deal
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
      modelContext: {
        markersTable: [],
        modelIdx: 0,
        predict: [], // mock give grouth
      },
    };
  },
  watch: {
    "dataContext.dataSource"(dataSource, older) {
      // 这里切换应该更换数据项，而不是数据
    },
    "dataContext.dataId"(dataId, older) {
      this.getData();
      this.amapContext.data.dealIdx = 0;
    },
    async "amapContext.data.dealIdx"(curIdx, nextIdx) {
      // convert Current Info To Map markers
      this.$data.amapContext.map.loadding = true;
      let currentDeal = this.$data.dataContext.dataList[curIdx];
      this.convertOrderByTimeAsc(currentDeal);
      // deal with markers
      let markers = [];
      let markersTable = [];
      let bounds = {
        lngMax: currentDeal.points[0][2],
        lngMin: currentDeal.points[0][2],
        latMax: currentDeal.points[0][1],
        latMin: currentDeal.points[0][1],
      };
      let locationMap = new Map();

      const locations = currentDeal.points.map((point) => {
        let lng = point[2];
        let lat = point[1];
        return [lat, lng];
      });
      // 此方法是异步回调
      const addresses = await this.$api.GET_GEO_ENCODINGS(locations);
      // 反向注册到原来的数据上
      currentDeal.addresses = addresses;

      // 需要过滤一下重复点
      currentDeal.points.forEach((point, idx) => {
        let lng = point[2];
        let lat = point[1];
        let address = addresses[idx].regeocode.formatted_address;
        let dealTime = point[0];
        bounds.lngMax = Math.max(bounds.lngMax, lng);
        bounds.lngMin = Math.min(bounds.lngMin, lng);
        bounds.latMax = Math.max(bounds.latMax, lat);
        bounds.latMin = Math.min(bounds.latMin, lat);
        let ptrKey = lng.toString() + ":" + lat.toString();
        let ptr = locationMap.get(ptrKey);
        if (ptr == null) {
          ptr = {
            position: [lng, lat],
            latlng: lat.toString() + "," + lng,
            address: address,
            // proto: point,
            iconShow: this.$data.amapContext.map.markerIcon,
            innerContent: [{ timeOrder: idx, dealTime: dealTime }],
            innerCount: 1,
          };
          markers.push(ptr);
          locationMap.set(ptrKey, ptr);
        } else {
          ptr.innerContent.push({ timeOrder: idx, dealTime: dealTime });
          ptr.innerCount += 1;
        }
        markersTable.push({
          location: lat.toString() + "," + lng,
          address: address,
          timeIdx: idx,
          dealTime: dealTime,
        });
        idx++;
      });

      this.$data.amapContext.map.bounds = latLngBounds([
        [bounds.lngMax, bounds.latMax],
        [bounds.lngMin, bounds.latMin],
      ]);
      this.$data.amapContext.data.markers = markers;
      // deal with
      this.modelContext.markersTable = markersTable;
      this.$data.amapContext.map.loadding = false;
    },
  },
  mounted: function () {
    this.getData();

    this.$nextTick(() => {
      console.log(this.$refs.popups);
      this.$refs.popups[0].mapObject.openPopup();
    });
    this.amapContext.data.dealIdx = 0;
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
      let idx = 0;
      deals.forEach((element) => {
        element.region = "杭州"; // 静态数据来自于杭州
        element.idx = idx;
        idx++;
      });
      this.$data.dataContext.dataList = deals;
    },
    // 把信息保存到地图数据中,wath地图数据就会自动绘画
    // 点击绘制按钮会触发
    setDataToMap(deal) {
      this.$data.amapContext.data.dealIdx = deal.idx;
    },
    convertOrderByTimeAsc(currentDeal) {
      // convert to current Index
      let index = MathUtil.argSort(currentDeal.points, (a, b) => {
        return a[0] - b[0];
      }); //
      let points = [];
      let groundTruth = [];
      let start = -1;
      let oldToNew = new Map();
      index.forEach((oldIdx, newIdx) => {
        if (oldIdx == currentDeal.start) {
          start = newIdx;
        }
        points.push(currentDeal.points[oldIdx]);
        oldToNew.set(oldIdx, newIdx);
      });
      currentDeal.groundTruth.forEach((ptr) => {
        groundTruth.push(oldToNew.get(ptr));
      });
      currentDeal.points = points;
      currentDeal.start = start;
      currentDeal.groundTruth = groundTruth;
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
<style lang="scss">
@import "~leaflet/dist/leaflet.css";
</style>