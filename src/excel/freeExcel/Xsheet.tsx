import React, { useRef, useState } from "react";
import Spreadsheet from "x-data-spreadsheet";
import { Button } from "@pratikkaloji/storybookproject";

const ExcelSheet: React.FC = () => {
  const [currentSheetName, setCurrentSheetName] = useState<string>("");
  const spreadsheetRef = useRef<any>(null); // Adjust type according to Spreadsheet ref type

  const handleGetEmptyNewSheet = () => {
    if (spreadsheetRef.current) {
      // Clear the existing spreadsheet if it exists
      spreadsheetRef.current.destroy();
    }

    // Create a new spreadsheet instance
    const newSpreadsheet = new Spreadsheet("#spreadsheet", {
      mode: "edit", // Set mode to "edit" for editing
      showToolbar: true, // Show toolbar
      showGrid: true, // Show grid lines
      data: [], // Pass an empty array to create a new empty sheet
    });

    // Store the spreadsheet instance in the ref
    spreadsheetRef.current = newSpreadsheet;
  };

  const handleLoadData = (name: string) => {
    const savedData = localStorage.getItem(name);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (spreadsheetRef.current) {
        spreadsheetRef.current.loadData(parsedData);
        setCurrentSheetName(name);
      }
    }
  };

  const handleSaveData = () => {
    if (spreadsheetRef.current && currentSheetName) {
      const data = spreadsheetRef.current.getData();
      localStorage.setItem(currentSheetName, JSON.stringify(data));
      alert("Data saved successfully!");
    } else {
      alert("No sheet loaded or no sheet name provided!");
    }
  };

  return (
    <div>
      <button onClick={handleGetEmptyNewSheet}>Get Empty New Sheet</button>
      <br />
      <br />
      <label htmlFor="sheetName">Sheet Name:</label>
      <input
        type="text"
        id="sheetName"
        value={currentSheetName}
        onChange={(e) => setCurrentSheetName(e.target.value)}
      />
      <Button onClick={() => handleLoadData(currentSheetName)} label="Load Data" primary />
      <button onClick={handleSaveData}>Save Data</button>
      <div id="spreadsheet" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};
export default ExcelSheet;
