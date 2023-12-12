import axios from "axios";

// getting data for specific year

const FilterByYear = (year) => {
  try {
    let res = axios.get(`http://localhost:8001/getData/${year}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const UniqueIntensity = () => {
  try {
    let res = axios.get(`http://localhost:8001/getintensity`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const UniqueLikelihood = () => {
  try {
    let res = axios.get(`http://localhost:8001/getrelevance`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const UniqueRelevance = () => {
  try {
    let res = axios.get(`http://localhost:8001/getlikelihood`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const CountryData = () => {
  let res = axios.get(`http://localhost:8001/getcountrydata`);
  return res;
};
const TopicsData = () => {
  let res = axios.get(`http://localhost:8001/gettopicsdata`);
  return res;
};

const CityData = () => {
  let res = axios.get(`http://localhost:8001/getcitydata`);
  return res;
};

const RegionData = () => {
  let res = axios.get(`http://localhost:8001/getregiondata`);
  return res;
};
export {
  FilterByYear,
  UniqueIntensity,
  UniqueRelevance,
  UniqueLikelihood,
  CountryData,
  TopicsData,
  CityData,
  RegionData,
};
