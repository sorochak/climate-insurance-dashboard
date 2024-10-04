import React, { useState } from "react";
import { Container, Box, Button, CircularProgress } from "@mui/material";
import Form from "./Form";
import Results from "./Results";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  const fetchData = async () => {
    setFetchingData(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/adjust", {
        method: "POST",
        body: JSON.stringify({ key: "value" }),
      });

      console.log("response: ", response);
      const yltAdjusted = await response.json();
      setData(yltAdjusted);
      console.log("yltAdjusted: ", yltAdjusted);
    } catch (err) {
      console.error("Post YLT Error: ", err);
    } finally {
      setFetchingData(false);
    }
  };

  return (
    <>
      <Box sx={{ mt: 8, mb: 5, backgroundColor: "#E0E0E0" }}>
        <Container maxWidth="md">
          <Form fetchData={fetchData} fetchingData={fetchingData} />
        </Container>
      </Box>
      <Container maxWidth="md">
        {/* <Box sx={{ mt: 15, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={fetchData}
            disabled={fetchingData}
          >
            {fetchingData ? "Fetching..." : "Fetch Data"}
          </Button>
        </Box> */}
        {fetchingData && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Box>{data.length > 0 && <Results data={data} />}</Box>
      </Container>
    </>
  );
};

export default Dashboard;
