import AustriaData from "../../../../public/JsonAnalyze/AustriaData.json";
import CountryData from "../../../../public/JsonAnalyze/CountryData";
import Global from "../views/Globel/Global";
import { createJsonData } from "./optionData";

//judge what data set is selected in AustriaData and CountryData
//add the attribute value of the ecological civilization table
export const JudgeSelectJson = (JsonName, AttributeJson) => {
  let AustriaJson = AustriaData.austria.features;
  for (let i = 0; i < AustriaJson.length; i++) {
    let status = true;
    if (JsonName == AustriaJson[i].properties.name) {
      createJsonData("Table", AttributeJson, AustriaJson[i].properties);
      //delete the duplicate column
      if (Global.VisualJson.length == 0) {
        Global.VisualJson.push(AustriaJson[i]);
      } else {
        for (let j = 0; j < Global.VisualJson.length; j++) {
          if (JsonName == Global.VisualJson[j].properties.name) {
            status = false;
            break;
          }
        }
        if (status) {
          Global.VisualJson.push(AustriaJson[i]);
        }
      }
    }
  }
  let CountryJson = CountryData.world.features;
  for (let i = 0; i < CountryJson.length; i++) {
    if (JsonName == CountryJson[i].properties.name) {
      //if it exists in global
      let status = true;
      createJsonData("Table", AttributeJson, CountryJson[i].properties);
      Global.VisualJson.push(CountryJson[i]);
      if (Global.VisualJson.length == 0) {
        Global.VisualJson.push(CountryData[i]);
      } else {
        for (let j = 0; j < Global.VisualJson.length; j++) {
          if (JsonName == Global.VisualJson[j].properties.name) {
            status = false;
            break;
          }
        }
        if (status) {
          Global.VisualJson.push(CountryData[i]);
        }
      }
    }
  }
};

//get Result  data
export const GetResultJson = () => {
  let List1 = JSON.stringify(Global.ResultJson, ["Target", "TargetData"]);
  List1 = List1.replace(new RegExp("Target", "g"), "Name");
  List1 = List1.replace(new RegExp("TargetData", "g"), "Data");
  List1 = JSON.parse(List1);
  let List2 = JSON.stringify(Global.ResultJson, ["Factor", "FactorData"]);
  List2 = List2.replace(new RegExp("Factor", "g"), "Name");
  List2 = List2.replace(new RegExp("FactorData", "g"), "Data");
  List2 = JSON.parse(List2);
  let List12 = List1.concat(List2);
  let List3 = JSON.stringify(Global.ResultJson, [
    "FactorLayer",
    "FactorLayerData",
  ]);
  List3 = List3.replace(new RegExp("FactorLayer", "g"), "Name");
  List3 = List3.replace(new RegExp("FactorLayerData", "g"), "Data");
  List3 = JSON.parse(List3);
  let List13 = List12.concat(List3);
  //delete the duplicate column
  var temp = {}; //store id
  var result = [];
  List13.map((item) => {
    if (!temp[item["Name"]]) {
      result.push(item);
      temp[item["Name"]] = true;
    }
  });
  return result;
};
