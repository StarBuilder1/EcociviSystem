//add attribute key and value to a data record
export const createJsonData = (prop, val, OneJsonData) => {
  if (typeof val == "undefined") {
    delete OneJsonData[prop];
  } else {
    OneJsonData[prop] = val;
  }
};

//Add data to an array of json objects
export const AddJsonData = (SecondTarget, ThirdTarget, Dataset) => {
  var OneJsonData = { Target: "Environmental Index" };
  //avoid duplicate data input
  var existFactorLayer = Dataset.map((item) => item.FactorLayer);
  if (Dataset.length === 0 || !existFactorLayer.includes(ThirdTarget)) {
    createJsonData("Factor", SecondTarget, OneJsonData);
    createJsonData("FactorLayer", ThirdTarget, OneJsonData);
    Dataset.push(OneJsonData);
  }
};

//delete the last data record
export const DeleteJsonDate = (Dataset) => {
  Dataset.splice(Dataset.length - 1, 1);
};

//Add an attribute to data
export const createJsonDataOfDatatset = (prop, val, Dataset, index) => {
  createJsonData(prop, val, Dataset[index]);
};

//calculate the index result
export const CalculateData = (Dataset) => {
  //first loop: calculate in factor layer
  var TempIndex = 0;
  var DataSum =
    Number(Dataset[0].FactorLayerData) * Number(Dataset[0].FactorLayerWeight);
  var WeightSum = Number(Dataset[0].FactorLayerWeight);
  var Result;
  for (var i = 0; i < Dataset.length; i++) {
    if (Object.prototype.hasOwnProperty.call(Dataset[i], "FactorWeight")) {
      if (i != 0) {
        Result = DataSum / WeightSum;
        createJsonDataOfDatatset("FactorData", Result, Dataset, TempIndex);
        DataSum =
          Number(Dataset[i].FactorLayerData) *
          Number(Dataset[i].FactorLayerWeight);
        WeightSum = Number(Dataset[i].FactorLayerWeight);
      }
      TempIndex = i;
    } else {
      DataSum =
        DataSum +
        Number(Dataset[i].FactorLayerData) *
          Number(Dataset[i].FactorLayerWeight);
      WeightSum = Number(WeightSum) + Number(Dataset[i].FactorLayerWeight);
    }
  }
  Result = DataSum / WeightSum;
  createJsonDataOfDatatset("FactorData", Result, Dataset, TempIndex);
  //next loop: calculate in target layer
  TempIndex = 0;
  DataSum = 0;
  WeightSum = 0;
  for (i = 0; i < Dataset.length; i++) {
    if (Object.prototype.hasOwnProperty.call(Dataset[i], "FactorData")) {
      DataSum =
        DataSum +
        Number(Dataset[i].FactorData) * Number(Dataset[i].FactorWeight);
      WeightSum = WeightSum + Number(Dataset[i].FactorWeight);
    }
  }
  Result = DataSum / WeightSum;
  createJsonDataOfDatatset("TargetData", Result, Dataset, TempIndex);
};

//show result
// export const ShowResult = (Dataset, ListColumn1, ListColumn2) => {
//   let ResultList = JSON.stringify(Dataset, [ListColumn1, ListColumn2]);
//   ResultList = JSON.parse(ResultList);
//   return ResultList;
// };
