<template>
  <el-container style="width: 100%; height: 100%; background-color: #ffffff">
    <el-row style="text-align: center">
      <h1 class="heading-2" style="font-weight: 800;height:10px">
        Evaluation System of the Environmental Index
      </h1>
    </el-row>
    <el-row style="width: 100%; height: 90%">
      <!-- PART1+PART2-->
      <el-col :offset="1" class="SystemPageCol">
        <el-card
          shadow="hover"
          style="height: 100%; width: 90%; text-align: center"
        >
          <!-- PART1 Add Your Indicators -->
          <h4 style="text-align: center; padding-top: 10px">
            Add Your Indicators
          </h4>
          <div class="subheading" style="text-align: center">
            Selected Regions:
            <span v-if="this.MapZone.length === 0">
              <div style="font-weight: 500">
                No selection applied! Please back to map view to select
                regions😊
              </div>
            </span>
            <span v-else>
              {{ this.MapZone.map((item) => item.name) }}
            </span>
          </div>
          <!-- FactorLayer drop-down box -->
          <el-row style="text-align: center; padding: 10px">
            <span>FactorLayer: </span>
            <el-select
              v-model="selectedOption"
              placeholder="Please select"
              @change="handleChange"
            >
              <el-option
                v-for="(option, index) in options"
                :key="index"
                :label="option.Two"
                :value="option.Two"
              >
              </el-option>
            </el-select>
          </el-row>
          <!-- Factor drop-down box -->
          <el-row style="text-align: center">
            <span>Factor: </span>
            <el-select v-model="selectedSubOption" placeholder="Please select">
              <el-option
                v-for="(optionSelect, index) in optionSelects"
                :key="index"
                :label="optionSelect"
                :value="optionSelect"
              >
              </el-option>
            </el-select>
          </el-row>
          <!-- button group(1) -->
          <el-row style="text-align: center; padding: 10px">
            <el-button
              @click="AddButtonClick"
              type="primary"
              style="color: #ffffff"
              >Add</el-button
            >
            <el-button
              @click="DeleteButtonClick"
              type="danger"
              style="color: #ffffff"
              >Delete</el-button
            >
          </el-row>
          <br />
          <br />
          <!-- PART2 Structure of Indicator System -->
          <el-row>
            <h4 style="text-align: center">Structure of Indicator System</h4>
            <el-table
              class="tableStyle data-show-table"
              :data="CustomDataTables"
              :span-method="arraySpanMethod2"
              :row-class-name="TableCell"
              border
              :max-height="tableHeight"
              @cell-click="cellClick"
              empty-text="No relevant data"
            >
              <el-table-column prop="Target" label="TargetLayer" width="180">
                <template slot-scope="scope">
                  <span
                    v-if="
                      scope.row.index === tabClickIndex &&
                      tabClickLabel === 'TargetLayer'
                    "
                  >
                    <el-input
                      v-model="scope.row.Target"
                      maxlength="300"
                      placeholder="Please enter the target layer"
                      size="mini"
                      @blur="inputBlur"
                    />
                  </span>
                  <span v-else>{{ scope.row.Target }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="Factor" label="FactorLayer">
                <template slot-scope="scope">
                  <span
                    v-if="
                      scope.row.index === tabClickIndex &&
                      tabClickLabel === 'FactorLayer'
                    "
                  >
                    <el-input
                      v-model="scope.row.Factor"
                      maxlength="300"
                      placeholder="Please enter a factor layer"
                      size="mini"
                      @blur="inputBlur"
                    />
                  </span>
                  <span v-else>{{ scope.row.Factor }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="FactorLayer" label="Factor">
                <template slot-scope="scope">
                  <span
                    v-if="
                      scope.row.index === tabClickIndex &&
                      tabClickLabel === 'Factor'
                    "
                  >
                    <el-input
                      v-model="scope.row.FactorLayer"
                      maxlength="300"
                      placeholder="Please enter a specific factor"
                      size="mini"
                      @blur="inputBlur"
                    />
                  </span>
                  <span v-else>{{ scope.row.FactorLayer }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <!-- button group(2)  -->
          <el-row style="text-align: center; padding: 10px">
            <el-button
              @click="ConfirmButtonClick"
              type="primary"
              style="color: #ffffff"
              >Confirm</el-button
            >
            <el-button
              @click="CancelButtonClick"
              type="danger"
              style="color: #ffffff"
              >Delete</el-button
            >
          </el-row>
        </el-card>
      </el-col>

      <!-- PART3 Analysis and Calculation -->
      <el-col class="SystemPageCol">
        <el-card
          shadow="hover"
          style="height: 100%; width: 100%; text-align: center"
        >
          <h4 style="text-align: center">Analysis and Calculation</h4>
          <div style="width: 100%; height: 100%" v-if="CalculationState === 1">
            <el-table
              class="tableStyle data-show-table"
              :data="ResultDataTable"
              :span-method="arraySpanMethod"
              :max-height="tableHeight2"
              border
            >
              <el-table-column prop="Target" label="TargetLayer">
                <template slot-scope="scope">
                  <div>{{ scope.row.Target }}</div>
                  <div style="font-weight: 600">
                    Score: {{ scope.row.TargetData }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Factor" label="FactorLayer">
                <template slot-scope="scope">
                  <div>{{ scope.row.Factor }}</div>
                  <div style="font-weight: 600">
                    Score: {{ scope.row.FactorData }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="FactorLayer" label="Factor">
                <template slot-scope="scope">
                  <div>{{ scope.row.FactorLayer }}</div>
                  <div style="font-weight: 600">
                    Score: {{ scope.row.FactorLayerData }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="width: 100%; height: 100%" v-else>
            <el-table
              class="tableStyle data-show-table"
              :data="WeightDataTable"
              :span-method="arraySpanMethod"
              :max-height="tableHeight2"
              @cell-click="WeightCellClick"
              border
            >
              <el-table-column prop="Target" label="TargetLayer">
                <template slot-scope="scope">
                  <div>{{ scope.row.Target }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="Factor" label="FactorLayer">
                <template slot-scope="scope">
                  <el-popover
                    trigger="click"
                    placement="top"
                    :ref="`popover-${scope.$index}`"
                  >
                    <p>
                      Input weight: {{ scope.row.FactorWeight }}<br />
                      <el-input
                        v-model="WeightInput"
                        placeholder="Please input the weight"
                      ></el-input>
                    </p>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="WeightDataClick2(scope)"
                      >Confirm</el-button
                    >
                    <div slot="reference">
                      <div>{{ scope.row.Factor }}</div>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="FactorLayer" label="Factor">
                <template slot-scope="scope">
                  <el-popover
                    trigger="click"
                    placement="top"
                    :ref="`popover-${scope.$index}`"
                    @show="handlePopoverShow(scope.row)"
                  >
                    <p>
                      Input weight: {{ scope.row.FactorLayerWeight }}<br />
                      <el-input
                        v-model="WeightInput"
                        placeholder="Please input the weight"
                      ></el-input>
                    </p>
                    <p>
                      Input data: {{ scope.row.FactorLayerData }}
                      <p style="font-size:small">*If only 1 region is selected, a default value will be applied.</p>
                      <el-input
                        v-model="DataInput"
                        placeholder="Please input the data"
                      ></el-input>
                    </p>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="WeightDataClick3(scope)"
                      >Confirm</el-button
                    >
                    <div slot="reference">
                      <div>{{ scope.row.FactorLayer }}</div>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- button group(3) -->
          <el-row style="text-align: center; padding-top: 10px">
            <el-button
              @click="CalculateClick()"
              type="primary"
              round
              style="color: #ffffff"
              >Calculate</el-button
            >
            <el-button
              @click="ReCalculateClick()"
              type="danger"
              round
              style="color: #ffffff"
              >Reset</el-button
            >
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import Global from "../Globel/Global";
import {
  AddJsonData,
  DeleteJsonDate,
  createJsonDataOfDatatset,
  CalculateData,
} from "../../js/optionData";
export default {
  name: "SystemTable",
  data() {
    return {
      //data for PART1
      needMergeArr: ["Target", "Factor"],
      rowMergeArrs: {},
      rowCustomMergeArrs: {},
      tabClickIndex: null, // current click index
      tabClickLabel: "", // current click label

      //table position controller
      tableHeight: "",
      tableHeight2: "",

      MapZone: Global.MapClickData,

      //select options
      options: [
        {
          Two: "Urbanization",
          Three: ["Sealed area", "Non vegetated unsealed surfaces"],
        },
        {
          Two: "GreenSpaces",
          Three: ["Woody", "Permanent Herb", "Periodically Herb", "Reeds"],
        },
        {
          Two: "BlueSpaces",
          Three: ["Water area", "River density", "Snow and ice"],
        },
      ],
      selectedOption: "",
      selectedSubOption: "",
      //Customised system in Json
      CustomDataTables: [],

      //default index system
      EcoIndex: [
        {
          index: 0,
          Target: "Environmental Index",
          Factor: "Urbanization",
          FactorLayer: "Sealed area",
        },
        {
          index: 1,
          Target: "Environmental Index",
          Factor: "Urbanization",
          FactorLayer: "Non-vegetated unsealed surfaces",
        },
        {
          index: 2,
          Target: "Environmental Index",
          Factor: "GreenSpaces",
          FactorLayer: "Woody",
        },
        {
          index: 3,
          Target: "Environmental Index",
          Factor: "GreenSpaces",
          FactorLayer: "Permanent Herb",
        },
        {
          index: 4,
          Target: "Environmental Index",
          Factor: "GreenSpaces",
          FactorLayer: "Periodically Herb",
        },
        {
          index: 5,
          Target: "Environmental Index",
          Factor: "GreenSpaces",
          FactorLayer: "Reeds",
        },
        {
          index: 6,
          Target: "Environmental Index",
          Factor: "BlueSpaces",
          FactorLayer: "Water area",
        },
        {
          index: 7,
          Target: "Environmental Index",
          Factor: "BlueSpaces",
          FactorLayer: "River density",
        },
        {
          index: 8,
          Target: "Environmental Index",
          Factor: "BlueSpaces",
          FactorLayer: "Snow and ice",
        },
      ],

      //data for PART3
      WeightDataIndex: "",
      WeightInput: "",
      DataInput: "",
      WeightDataTable: "",
      //visibility of the popover
      visible: false,
      //judge the calculation state
      CalculationState: 0,
      ResultDataTable: "",
    };
  },
  methods: {
    // Weights page merge cell method
    arraySpanMethod({ column, rowIndex }) {
      // add column names need to be looped
      if (column.property === "Target")
        return this.mergeAction("Target", rowIndex);
      if (column.property === "Factor")
        return this.mergeAction("Factor", rowIndex);
    },

    mergeAction(val, rowIndex) {
      let _row = this.rowMergeArrs[val].rowArr[rowIndex];
      let _col = _row > 0 ? 1 : 0;
      return [_row, _col];
    },

    //Customised form merge
    arraySpanMethod2({ column, rowIndex }) {
      if (column.property === "Target")
        return this.mergeAction2("Target", rowIndex);
      if (column.property === "Factor")
        return this.mergeAction2("Factor", rowIndex);
    },

    mergeAction2(val, rowIndex) {
      let _row = this.rowCustomMergeArrs[val].rowArr[rowIndex];
      let _col = _row > 0 ? 1 : 0;
      return [_row, _col];
    },

    rowMergeHandle(arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false;
      if (!Array.isArray(data) && !data.length) return false;
      let needMerge = {};
      arr.forEach((i) => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0,
        };
        data.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1);
            needMerge[i].rowMergeNum = 0;
          } else {
            if (item[i] === data[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1;
              needMerge[i].rowArr.push(0);
            } else {
              needMerge[i].rowArr.push(1);
              needMerge[i].rowMergeNum = index;
            }
          }
        });
      });
      return needMerge;
    },
    //click event in PART2
    TableCell({ row, rowIndex }) {
      row.index = rowIndex;
    },
    cellClick(row, column) {
      switch (column.label) {
        case "TargetLayer":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "FactorLayer":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "Factor":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        default:
          return;
      }
    },
    //initialize when lose focus
    inputBlur() {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },

    //Buttons on the system page
    AddButtonClick() {
      AddJsonData(
        this.selectedOption,
        this.selectedSubOption,
        this.CustomDataTables
      );
      //Mount custom system form merge
      this.rowCustomMergeArrs = this.rowMergeHandle(
        this.needMergeArr,
        this.CustomDataTables
      );
    },
    DeleteButtonClick() {
      DeleteJsonDate(this.CustomDataTables);
    },
    ConfirmButtonClick() {
      this.WeightDataTable = JSON.parse(JSON.stringify(this.CustomDataTables));
      this.rowMergeArrs = this.rowMergeHandle(
        this.needMergeArr,
        this.WeightDataTable
      );
      console.log(this.WeightDataTable);
    },
    CancelButtonClick() {
      this.WeightDataTable = JSON.parse(JSON.stringify(this.EcoIndex));
      this.rowMergeArrs = this.rowMergeHandle(
        this.needMergeArr,
        this.WeightDataTable
      );
      console.log(this.WeightDataTable);
    },

    //weight setting
    WeightCellClick(row) {
      //get the index of the clicked row
      this.WeightDataIndex = row.index;
    },
    
    //confirm for weight and data setting
    WeightDataClick2(scope) {
      createJsonDataOfDatatset(
        "FactorWeight",
        this.WeightInput,
        this.WeightDataTable,
        this.WeightDataIndex
      );
      scope._self.$refs[`popover-${scope.$index}`].doClose();
    },
    handlePopoverShow(rowData) {
      if (this.MapZone.length === 1) {
        let currRegion = this.MapZone[0].name;
        let currFactor = rowData.FactorLayer;
        //transform to match attribute name in Json
        currFactor = currFactor.replace(/\s/g, "_");
        //find the data with name=currRegion use filter
        let currData = Global.MapClickData.filter(
          (item) => item.name === currRegion
        );
        currData = currData[0][currFactor];
        this.DataInput = currData;
        console.log(this.DataInput);
      }
    },
    WeightDataClick3(scope) {
      createJsonDataOfDatatset(
        "FactorLayerWeight",
        this.WeightInput,
        this.WeightDataTable,
        this.WeightDataIndex
      );
      createJsonDataOfDatatset(
        "FactorLayerData",
        Number(this.DataInput),
        this.WeightDataTable,
        this.WeightDataIndex
      );
      scope._self.$refs[`popover-${scope.$index}`].doClose();
    },
    //calculation event in PART3
    CalculateClick() {
      CalculateData(this.WeightDataTable);
      this.ResultDataTable = this.WeightDataTable;
      Global.ResultJson = this.ResultDataTable;
      this.CalculationState = 1;
      this.rowMergeArrs = this.rowMergeHandle(
        this.needMergeArr,
        this.WeightDataTable
      );
      console.log(this.ResultDataTable);
    },
    //reset event in PART3
    ReCalculateClick() {
      this.CalculationState = 0;
      this.rowMergeArrs = this.rowMergeHandle(
        this.needMergeArr,
        this.WeightDataTable
      );
    },

    handleChange() {
      this.selectedSubOption = "";
    },
  },
  computed: {
    //for controls in PART1
    optionSelects() {
      let opt = this.options.find((i) => i.Two === this.selectedOption);
      let opt_res = opt ? opt.Three : [];
      return opt_res;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // Responsive Design
      this.tableHeight = window.innerHeight - 690;
      this.tableHeight2 = window.innerHeight - 380;
      window.onresize = () => {
        this.tableHeight = window.innerHeight - 690;
        this.tableHeight2 = window.innerHeight - 380;
      };
    });
    this.WeightDataTable = JSON.parse(JSON.stringify(this.EcoIndex));
    this.rowMergeArrs = this.rowMergeHandle(
      this.needMergeArr,
      this.WeightDataTable
    );
  },
};
</script>

<style
  scoped
  src="../../../../assets/css/designwiz.webflow.82884a821.css"
></style>
<style scoped>
* {
  font-family: "Century Schoolbook";
  font-size: 17 px;
}
.SystemPageCol {
  width: 45%;
  height: 100%;
  padding-top: 30px;
  padding-left: 95px;
}
.subheading {
  display: block;
  font-size: 0.95em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
.data-show-table {
  height: 95%;
  width: 130%;
  margin-top: 1%;
  margin-left: 1%;
  margin-bottom: 1%;
}
</style>
