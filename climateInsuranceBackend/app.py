import matplotlib
matplotlib.use('Agg')  # Use a non-GUI backend

from flask import Flask, request, jsonify
import numpy as np
from pathlib import Path
from pylt import adjust_ylt
import logging
import pandas as pd  # Import pandas for DataFrame operations

logging.getLogger('matplotlib').setLevel(logging.WARNING)

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Climate Insurance Backend API. Use the /adjust endpoint to adjust YLT data."

@app.route('/adjust', methods=['POST'])
def adjust():
    try:
        app.logger.debug("Received request: %s", request.data)
        
        # Define the paths using the local project directory
        data_dir = Path("/Users/austensorochak/Documents/coding/insuranceDashboard/climateInsuranceBackend/demo-data")
        INPUT_YLT_PATH = data_dir / "sample-ylt.csv"
        COUNTS_PATH = data_dir / "counts.parquet"
        METRICS_PATH = data_dir / "climate_metrics.parquet"
        GATES_PATH = data_dir / "gates.parquet"

        # Check if paths exist and are readable
        if not INPUT_YLT_PATH.exists() or not INPUT_YLT_PATH.is_file():
            raise FileNotFoundError(f"Input YLT path not found: {INPUT_YLT_PATH}")
        if not COUNTS_PATH.exists() or not COUNTS_PATH.is_file():
            raise FileNotFoundError(f"Counts path not found: {COUNTS_PATH}")
        if not METRICS_PATH.exists() or not METRICS_PATH.is_file():
            raise FileNotFoundError(f"Metrics path not found: {METRICS_PATH}")
        if not GATES_PATH.exists() or not GATES_PATH.is_file():
            raise FileNotFoundError(f"Gates path not found: {GATES_PATH}")

        app.logger.debug("Input YLT path: %s", INPUT_YLT_PATH)
        app.logger.debug("Counts path: %s", COUNTS_PATH)
        app.logger.debug("Metrics path: %s", METRICS_PATH)
        app.logger.debug("Gates path: %s", GATES_PATH)

        # Call the adjust_ylt function and capture the DataFrame
        df_adjusted = adjust_ylt(
            INPUT_YLT_PATH,
            "FCT",
            baseline_yrs=np.arange(1990, 2021),
            target_yrs=2022,
            fct_timing="may",
            ylt_sample_range=[1, 10000],
            baseline_filter_kwargs={
                "mdr_sst_range": [0, np.inf],
                "mdr_sst_climato_yrs": [1990, 2020],
            },
            target_filter_kwargs={"mdr_sst_range": "top", "mdr_sst_n": 10},
            ylt_lat_col="latitude",
            ylt_lon_col="longitude",
            ylt_event_id_col="event_id",
            ylt_intensity_col="intensity",
            ylt_intensity_style="m/s",
            ylt_total_loss_col="loss",
            ylt_sample_col="year",
            target_ensemble_adjustment_var="empirical",
            gates_path=GATES_PATH,
            metrics_path=METRICS_PATH,
            counts_path=COUNTS_PATH
        )

        app.logger.debug("DataFrame shape: %s", df_adjusted.shape)

        # Slice the DataFrame to return only the first 5 records
        limited_df = df_adjusted.head(5)

        # Convert the sliced DataFrame to JSON
        json_result = limited_df.to_json(orient='records')

        # Return the JSON result
        return app.response_class(response=json_result, status=200, mimetype='application/json')

    except Exception as e:
        app.logger.error("Error during adjustment process: %s", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
