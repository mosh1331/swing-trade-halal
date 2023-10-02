import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

function StockList() {
  const [sheetData, setSheetData] = useState([]);
  const [copiedData, setCopiedData] = useState(null);

  const url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqAH14qDI3Gez6DV3hzn0HHd9wNK9b6STa53_xZ_3AhGwmszntkcZgXcD0MOzdNeC34IbA3MigP_uM/pub?gid=0&single=true&output=csv';

  const fetchGoogleSheetData = () => {
    Papa.parse(url, {
      download: true,
      header: true,
      newline: '', // auto-detect
      quoteChar: '"',
      header: false,
      dynamicTyping: false,
      preview: 0,
      encoding: '',
      worker: false,
      comments: false,
      step: undefined,
      error: undefined,
      skipEmptyLines: false,
      chunk: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined,
      complete: (results) => {
        console.log(results, 'results');
        setSheetData(results.data);
      },
    });
  };

  useEffect(() => {
    fetchGoogleSheetData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const copyToClipboard = (rowData) => {
    const textToCopy = rowData[0];
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedData(textToCopy);
      setTimeout(() => {
        setCopiedData(null);
      }, 2000); // Clear copiedData after 2 seconds
    });
  };

  return (
    <div style={{ margin: '20px' }}>
      {/* <h1 style={{ textAlign: 'center' }}>Google Sheet Data</h1> */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                padding: '10px',
                backgroundColor: '#007bff',
                color: '#fff',
              }}
            >
              Halal Stock List
            </th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {sheetData.map((row, index) => (
            <tr key={index}>
              <td
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                  background: copiedData === row[0] ? '#28a745' : 'transparent',
                  fontWeight: copiedData === row[0] ? 'bold' : 'normal',
                  fontSize: copiedData === row[0] ? '18px' : '16px',
                  position: 'relative',
                }}
                onClick={() => {
                  copyToClipboard(row);
                }}
              >
                {row[0]}
                {copiedData === row[0] && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    Copied!
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
