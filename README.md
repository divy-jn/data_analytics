# Cricket Data Analytics Project (T20 World Cup)

This project analyzes T20 World Cup cricket data to identify the best 11 players. It involves a full data pipeline: Web Scraping -> Data Preprocessing -> Power BI Visualization.

## 🚀 Quick Start (View Dashboard)

1.  **Install Power BI Desktop**: If not already installed, download it from the Microsoft Store or official website.
2.  **Open Dashboard**: Open `T20-World-Cup-Analysis.pbix` (or `Stage-2.pbix` / `Stage-3.pbix`) in Power BI.
3.  **Explore**: The detailed dashboard is pre-loaded with the processed data.

---

## 📂 Project Structure

- **`web_scrapping_codes/`**: JavaScript scripts for scraping data from ESPN Cricinfo. (Note: These appear to be designed for a collector environment like BrightData).
- **`t20_json_files/`**: Raw scraped data in JSON format.
- **`t20_data_preprocessing/`**: Jupyter Notebook (`.ipynb`) for cleaning and transforming JSON data into CSVs.
- **`t20_csv_files/`**: Processed CSV files ready for Power BI.
- **`*.pbix`**: Power BI dashboard files.

## 🔄 Re-running the Pipeline (Optional)

Since the data files (`json` and `csv`) are already included, you do not need to run these steps unless you want to update the data or modify the logic.

### 1. Data Scraping (Advanced)
The scripts in `web_scrapping_codes/` use `navigate()`, `parse()`, and `collect()` functions, which suggests they are intended for a **Cloud Scraper** or **BrightData** environment. They cannot be run directly with standard Node.js without a compatible runner.

### 2. Data Preprocessing (Python)
If you want to regenerate the CSV files from the JSON data:

1.  Ensure you have **Python 3.x** and **Jupyter** installed.
2.  Install `pandas`:
    ```bash
    pip install pandas
    ```
3.  Open the notebook:
    ```bash
    jupyter notebook t20_data_preprocessing/t20_data_preprocessing.ipynb
    ```
4.  Run all cells. This will read from `t20_json_files/` and save new CSVs to `t20_csv_files/`.

### 3. Dashboarding (Power BI)
1.  Open Power BI.
2.  The data source is currently linked to the CSV files.
3.  If you change the location of the CSV files, go to **Home > Transform Data > Data Source Settings** and update the file paths to point to your local `t20_csv_files/` directory.
