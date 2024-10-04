import React, { useState } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Box,
  Typography,
  InputLabel,
} from "@mui/material";
import TransitionModal from "./TransitionModal";
import YearPicker from "./YearPicker";

const Form = ({ fetchData, fetchingData }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    targetKind: "FCT",
    baselineYearFrom: null,
    baselineYearTo: null,
    targetYearFrom: null,
    targetYearTo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleYearChange = (newYear, fieldName) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: newYear,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData["file"] = file;
    fetchData(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6">File Upload</Typography>
      <TransitionModal id="ylt-file" file={file} setFile={setFile} />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 2 }}>
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="target-kind-label">Target Kind</InputLabel>{" "}
          {/* Label for the select */}
          <Select
            labelId="target-kind-label" // This id links the label to the select
            id="target-kind"
            value={formData.targetKind}
            onChange={handleChange}
            label="Target Kind" // This is necessary for proper spacing and floating label behavior
          >
            <MenuItem value="FCT">FCT</MenuItem>
            <MenuItem value="CLIMATO">CLIMATO</MenuItem>
          </Select>
        </FormControl>
        <YearPicker
          label="Baseline Year From"
          value={formData.baselineYearFrom}
          onChange={(newYear) => handleYearChange(newYear, "baselineYearFrom")}
        />
        <YearPicker
          label="Baseline Year To"
          value={formData.baselineYearTo}
          onChange={(newYear) => handleYearChange(newYear, "baselineYearTo")}
        />
        <YearPicker
          label="Target Year From"
          value={formData.targetYearFrom}
          onChange={(newYear) => handleYearChange(newYear, "targetYearFrom")}
        />
        <YearPicker
          label="Target Year To"
          value={formData.targetYearTo}
          onChange={(newYear) => handleYearChange(newYear, "targetYearTo")}
        />
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={fetchingData}
        sx={{ mt: 2, width: "140px" }}
      >
        {fetchingData ? "Processing" : "Submit"}
      </Button>
    </Box>
  );
};

export default Form;
