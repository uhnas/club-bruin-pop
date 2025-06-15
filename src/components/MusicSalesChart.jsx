import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';

const MusicSalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/musicdatasales.csv');
        if (response.ok) {
          const text = await response.text();
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              console.log('Music Sales Data loaded:', results.data);
              setSalesData(results.data);
            }
          });
        } else {
          console.log('Music sales CSV file not found.');
          setError('Music sales data file not found');
        }
      } catch (err) {
        console.error('Error loading music sales data:', err);
        setError('Failed to load music sales data');
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
  }, []);

  const processChartData = () => {
    if (!salesData.length) {
      return null;
    }

    // Filter for relevant formats and years 2000-2019
    const years = Array.from({length: 20}, (_, i) => (2000 + i).toString());
    
    // Get physical formats (CD albums + vinyl)
    const physicalData = years.map(year => {
      const cdRow = salesData.find(row => 
        row.format === 'CD' && 
        row.metric === 'Units' && 
        row.year === year
      );
      const vinylRow = salesData.find(row => 
        row.format === 'LP/EP' && 
        row.metric === 'Units' && 
        row.year === year
      );
      
      const cdValue = cdRow ? parseFloat(cdRow.value_actual || 0) : 0;
      const vinylValue = vinylRow ? parseFloat(vinylRow.value_actual || 0) : 0;
      
      return cdValue + vinylValue;
    });

    // Get download data (digital albums + singles)
    const downloadData = years.map(year => {
      const albumRow = salesData.find(row => 
        row.format === 'Download Album' && 
        row.metric === 'Units' && 
        row.year === year
      );
      const singleRow = salesData.find(row => 
        row.format === 'Download Single' && 
        row.metric === 'Units' && 
        row.year === year
      );
      
      const albumValue = albumRow ? parseFloat(albumRow.value_actual || 0) : 0;
      const singleValue = singleRow ? parseFloat(singleRow.value_actual || 0) : 0;
      
      return albumValue + (singleValue / 10); // Scale singles down for comparison
    });

    // Get streaming data (converted to revenue for comparison)
    const streamingData = years.map(year => {
      const streamRow = salesData.find(row => 
        row.format === 'On-Demand Streaming (Ad-Supported)' && 
        row.metric === 'Value' && 
        row.year === year
      );
      
      return streamRow ? parseFloat(streamRow.value_actual || 0) : 0;
    });

    return {
      labels: years,
      datasets: [
        {
          label: 'Physical Sales (millions of units)',
          data: physicalData,
          borderColor: '#ff2d95',
          backgroundColor: 'rgba(255, 45, 149, 0.1)',
          tension: 0.4,
          yAxisID: 'y',
        },
        {
          label: 'Digital Downloads (millions of units)',
          data: downloadData,
          borderColor: '#00e5ff',
          backgroundColor: 'rgba(0, 229, 255, 0.1)',
          tension: 0.4,
          yAxisID: 'y',
        },
        {
          label: 'Streaming Revenue (millions $)',
          data: streamingData,
          borderColor: '#00ff00',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          tension: 0.4,
          yAxisID: 'y1',
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Music Sales Evolution: Physical vs Digital vs Streaming (2000-2019)',
        color: '#fff',
        font: {
          size: 18,
          family: 'Comic Sans MS'
        }
      },
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: {
            family: 'Comic Sans MS'
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Year',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Units (millions)',
          color: '#ff2d95'
        },
        ticks: {
          color: '#ff2d95'
        },
        grid: {
          color: 'rgba(255, 45, 149, 0.1)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Streaming Revenue (millions $)',
          color: '#00ff00'
        },
        ticks: {
          color: '#00ff00'
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(0, 255, 0, 0.1)'
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="viz-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Loading Music Sales Data...</h3>
        <p style={{ color: '#00e5ff' }}>Reading sales data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="viz-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: '#ff2d95' }}>Data Loading Error</h3>
        <p style={{ color: '#fff' }}>{error}</p>
      </div>
    );
  }

  const chartData = processChartData();

  if (!chartData) {
    return (
      <div className="viz-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: '#ff2d95' }}>No Data Available</h3>
        <p style={{ color: '#fff' }}>Please check your music sales CSV file.</p>
      </div>
    );
  }

  return (
    <div className="viz-card">
      <h3>Music Sales Evolution</h3>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'rgba(0, 255, 0, 0.1)', 
        borderRadius: '8px',
        border: '1px solid #00ff00'
      }}>
        <p style={{ 
          color: '#fff', 
          fontSize: '0.9rem', 
          textAlign: 'center',
          fontFamily: 'Comic Sans MS'
        }}>
          This chart visualizaes the  transformation of music consumption from physical copies (CDs, cassettes, vinyls) 
          to digital downloads and streaming. This graph is showing how technology revolutionized the music industry and streaming revenue dominates the music industry.
        </p>
      </div>
    </div>
  );
};

export default MusicSalesChart; 