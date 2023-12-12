import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Card,
  CardContent,
  Grid,
  CardActionArea,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList,
  Treemap,
  AreaChart,
  Area,
} from "recharts";

import {
  FilterByYear,
  UniqueIntensity,
  UniqueLikelihood,
  UniqueRelevance,
  CountryData,
  TopicsData,
  CityData,
  RegionData,
} from "./apicalls";

let dataCard = [];

// search bar functionality with card data and filter function

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [showData, setShowData] = useState(dataCard);
  const [year, setYear] = React.useState("2019");

  const handleYearChange = async (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      try {
        let res = await FilterByYear(year);
        setShowData([...res.data.data]);
        dataCard = res.data.data;
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [year]);

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    filteredData(e);
  };
  const filteredData = (e) => {
    let newData = dataCard.filter((el) => {
      //if no input the return the original
      if (e.target.value === "") {
        return el;
      }
      //return the item which contains the user input
      else {
        return (
          el["topic"].includes(e.target.value) ||
          el["title"].includes(e.target.value)
        );
      }
    });
    setShowData([...newData]);
  };

  // no information card

  const NoInfo = () => {
    return (
      <>
        <Card
          bg="light"
          border="dark"
          style={{ width: "100%", margin: "1.2rem", height: "275px" }}
        >
          <Box textAlign="center">
            <Typography>
              No information found for the given search term.
            </Typography>
          </Box>
        </Card>
      </>
    );
  };

  // template card for data for each year

  const CardData = ({ item }) => {
    return (
      <Grid item className="cardDiv">
        <Card
          bg="light"
          border="dark"
          style={{
            width: "20rem",
            margin: "1.2rem",
            height: "275px",
            background: "#e1eef3",
          }}
        >
          <CardContent>
            <Typography variant="h5" color="#165a72">
              Project Details
            </Typography>
            <Typography
              variant="h6"
              color="#165a72"
              className="mb-2 text-muted"
            >
              {item.sector ? item.sector : "Sector"}
            </Typography>

            <CardActionArea>
              <Typography variant="subtitle1">
                Topic : {item.topic ? item.topic : "No Info"}
                <br />
              </Typography>
              <Typography variant="body">
                Title : {item.title ? item.title : "No Info"} <br />
              </Typography>
              <Typography variant="body">
                Insight : {item.insight ? item.insight : "No Info"} <br />
              </Typography>
              <Typography variant="body">
                Region : {item.region ? item.region : "No Info"} <br />
              </Typography>
              <Typography variant="body">
                Country : {item.country ? item.country : "No Info"} <br />
              </Typography>

              <Typography variant="body">
                Added : {item.added ? item.added : "No Info"} <br />
              </Typography>
              <Typography variant="body">
                Published : {item.published ? item.published : "No Info"} <br />
              </Typography>
              <Typography variant="body">
                Intensity : {item.intensity ? item.intensity : "No Info"} <br />
              </Typography>
              <Typography variant="body">
                Likelihood : {item.likelihood ? item.likelihood : "No Info"}
                <br />
              </Typography>
            </CardActionArea>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        style={{ marginTop: "15px" }}
        justifyContent="space-around"
      >
        <Grid item>
          <TextField
            style={{ width: "300px" }}
            placeholder="Enter the Topic , Title"
            value={inputText}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={inputHandler}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Year"
              onChange={handleYearChange}
            >
              <MenuItem value="2014">2014</MenuItem>
              <MenuItem value="2015">2015</MenuItem>
              <MenuItem value="2016">2016</MenuItem>
              <MenuItem value="2017">2017</MenuItem>
              <MenuItem value="2018">2018</MenuItem>
              <MenuItem value="2019">2019</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container wrap="no-wrap" direction="row" className="search">
        {showData.length > 0 ? (
          showData.map((val, ind) => {
            return <CardData item={val} />;
          })
        ) : (
          <NoInfo />
        )}
      </Grid>
    </>
  );
};

const LineChartComponent = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="intensity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" name={dataKey} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const BarChartComponent = ({ data, dataKey, color, name }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis dataKey="count" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={color} name={name} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const PieChartComponent = ({ data, dataKey, name }) => {
  // Define colors for each relevance level
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#8a2be2",
    "#20b2aa",
    "#ff6347",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey="relevance"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

// region chart

const Region = () => {
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await RegionData();
        setRegionData([...res.data.data]);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);
  const AreaChartComponent = ({ data }) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };
  return (
    <>
      <AreaChartComponent data={regionData} />
    </>
  );
};

const DashboardMain = () => {
  const [intensityData, setIntensityData] = useState([]);
  const [likelihoodData, setLikelihoodData] = useState([]);
  const [relevanceData, setRelevanceData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let resIntensity = await UniqueIntensity();
        let resLikelihood = await UniqueLikelihood();
        let resRelevance = await UniqueRelevance();
        setIntensityData([...resIntensity.data.data]);
        setLikelihoodData([...resLikelihood.data.data]);
        setRelevanceData([...resRelevance.data.data]);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Box>
        <AppBar sx={{ background: "#165a72" }} position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DashBoard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: "85%",
          overflowY: "auto",
          marginTop: "20px",
        }}
      >
        <Container disableGutters maxWidth={false}>
          <SearchBar />
        </Container>

        <Grid container flexDirection="row" spacing={2}>
          <Grid item xs={6} mt={2}>
            <Typography variant="h5" ml="20px">
              {" "}
              Intensity Count
            </Typography>
            <LineChartComponent dataKey="Intensity" data={intensityData} />
          </Grid>
          <Grid item xs={6} mt={2}>
            <Typography variant="h5" ml="20px">
              {" "}
              Likelihood Count
            </Typography>
            <BarChartComponent
              data={likelihoodData}
              dataKey="likelihood"
              color="#82ca9d"
              name="Likelihood"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" ml="20px">
              {" "}
              Relevance Count
            </Typography>
            <PieChartComponent
              data={relevanceData}
              dataKey="count"
              name="Relevance"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" ml="20px">
              {" "}
              Region Count
            </Typography>
            <Region />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// country chart

const Country = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await CountryData();
        setCountryData([...res.data.data]);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  const RadarChartComponent = ({ data }) => {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <RadarChart outerRadius={200} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="country" />
          <Radar
            name="Count"
            dataKey="count"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ background: "#165a72" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Country
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ height: "85%", overflowY: "auto", marginTop: "20px" }}
      >
        <Typography variant="h4">
          Number of Project Details in Each Country
        </Typography>

        <Grid>
          <RadarChartComponent data={countryData} />
        </Grid>
      </Container>
    </>
  );
};

// topics chart

const Topics = () => {
  const [topicsData, setTopicsData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await TopicsData();
        setTopicsData([...res.data.data]);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  const FunnelChartComponent = ({ data }) => {
    return (
      <ResponsiveContainer width="80%" height={2000}>
        <FunnelChart>
          <Tooltip />
          <Funnel
            dataKey="count"
            data={data}
            isAnimationActive
            label={{ fill: "#fff", position: "inside", fontSize: 12 }}
          >
            <LabelList
              dataKey="topic"
              position="right"
              fill="#000"
              stroke="none"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ background: "#165a72" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Topics
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: "85%",
          overflowY: "auto",
          margin: "20px",
        }}
      >
        <Typography variant="h4">
          Number of Project Details in Topics
        </Typography>
        <FunnelChartComponent data={topicsData} />
      </Container>
    </>
  );
};

// it is sector chart
const City = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await CityData();
        setCityData([...res.data.data]);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);
  const TreeMapComponent = ({ data }) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={data}
          dataKey="count"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip dataKey="name" />
        </Treemap>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ background: "#165a72" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              City
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ height: "85%", overflowY: "auto", marginTop: "20px" }}
      >
        <Typography variant="h4">
          Number of Project Details in Each Sector
        </Typography>
        <TreeMapComponent data={cityData} />
      </Container>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardMain />} />
        <Route path="/dashboard" element={<DashboardMain />} />
        <Route path="country" element={<Country />} />
        <Route path="topics" element={<Topics />} />
        <Route path="city" element={<City />} />
      </Routes>
    </>
  );
};

export default Dashboard;
