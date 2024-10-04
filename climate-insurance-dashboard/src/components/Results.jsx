import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";

function Results({ data }) {
  const [imageUrls, setImageUrls] = useState({});
  const fetchedRef = useRef(false); // Ref to track if data has been fetched

  useEffect(() => {
    if (!fetchedRef.current) {
      const imageNames = ["ep.png", "freq_ratios.png", "summary_stats.png"];
      const urls = {};
      imageNames.forEach((imageName, index) => {
        fetch(`http://127.0.0.1:5000/get-image/${imageName}`)
          .then((response) => response.blob())
          .then((blob) => {
            urls[imageName.split(".")[0]] = URL.createObjectURL(blob); // Use the file name as the key
            if (index === imageNames.length - 1) {
              // Check if last image
              setImageUrls(urls);
            }
          })
          .catch((error) => {
            console.error(`Failed to fetch image ${imageName}:`, error);
          });
      });
      fetchedRef.current = true;
    }
  }, []);

  return (
    <Container sx={{ mt: 13 }}>
      <Grid container spacing={2} justifyContent="center">
        {Object.keys(imageUrls).length > 0 && (
          <>
            <Grid item xs={12} md={6}>
              <img
                src={imageUrls.freq_ratios}
                alt="Frequency Ratios"
                height="1000"
                style={{
                  maxWidth: "100%",
                  marginTop: "-6rem",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <img
                  src={imageUrls.summary_stats}
                  alt="Average Annual Loss"
                  height="400"
                  style={{
                    marginLeft: "-12rem",
                  }}
                />
                <img
                  src={imageUrls.ep}
                  alt="Loss Exceedance Probability"
                  height="400"
                  style={{
                    marginLeft: "-12rem",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 50, marginTop: -100 }}>
              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                Adjusted YLT Table
              </Typography>
              <Box sx={{ maxWidth: "90%", mx: "auto", boxShadow: 3, mt: 4 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Event_ID</TableCell>
                        <TableCell align="right">Gate</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Loss</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow
                          key={row.event_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.event_id}</TableCell>
                          <TableCell align="right">{row.gate}</TableCell>
                          <TableCell align="right">{row.category}</TableCell>
                          <TableCell align="right">
                            {row.loss.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default Results;
