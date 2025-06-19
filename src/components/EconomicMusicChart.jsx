import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';

const EconomicMusicChart = () => {
  const [nyseData, setNyseData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        setLoading(true);
        
        // Load NYSE data (once converted to CSV)
        const nyseResponse = await fetch('./indexData_2005_onward_cleaned.csv');
        if (nyseResponse.ok) {
          const nyseText = await nyseResponse.text();
          Papa.parse(nyseText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              console.log('NYSE Data loaded:', results.data);
              setNyseData(results.data);
            }
          });
        } else {
          console.log('NYSE CSV file not found. Please check if indexData_2005_onward_cleaned.csv is in the public folder.');
        }

        // Load genre popularity data
        const genreResponse = await fetch('./song_counts_by_year_genre_2005_2008_added.csv');
        if (genreResponse.ok) {
          const genreText = await genreResponse.text();
          Papa.parse(genreText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              console.log('Genre Data loaded:', results.data);
              setGenreData(results.data);
            }
          });
        }
      } catch (err) {
        console.error('Error loading CSV data:', err);
        setError('Failed to load CSV data. Please check that your files are in src/data/csv/');
      } finally {
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  const processChartData = () => {
    if (!genreData.length) {
      return null;
    }

    // Filter for pop music data and group by year
    const popData = genreData.filter(row => 
      row.genre && row.genre.toLowerCase() === 'pop'
    );

    // Get unique years and sort them, filter up to 2025
    const years = [...new Set(popData.map(row => row.year))]
      .filter(year => parseInt(year) <= 2021)
      .sort();

    // Process Pop music data (counts by year)
    const popDataPoints = years.map(year => {
      const popRow = popData.find(row => row.year === year);
      return popRow ? parseInt(popRow.count || 0) : 0;
    });

    // Process NYSE data if available
    let nyseDataPoints = [];
    if (nyseData.length) {
      nyseDataPoints = years.map(year => {
        // Filter NYSE data for the specific year and get average close price
        const yearData = nyseData.filter(row => {
          if (row.Date) {
            const rowYear = new Date(row.Date).getFullYear();
            return rowYear.toString() === year;
          }
          return false;
        });
        
        if (yearData.length > 0) {
          // Calculate average close price for the year
          const avgClose = yearData.reduce((sum, row) => {
            return sum + parseFloat(row.Close || 0);
          }, 0) / yearData.length;
          return Math.round(avgClose);
        }
        return null;
      });
    }

    const datasets = [
      {
        label: 'Pop Music Song Count',
        data: popDataPoints,
        borderColor: '#00e5ff',
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      }
    ];

    // Add NYSE data if available
    if (nyseData.length && nyseDataPoints.some(point => point !== null)) {
      datasets.unshift({
        label: 'NYSE Composite Index (Avg)',
        data: nyseDataPoints,
        borderColor: '#ff2d95',
        backgroundColor: 'rgba(255, 45, 149, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      });
    }

    return {
      labels: years,
      datasets: datasets
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
        text: 'Economic Trends vs Pop Music Popularity (2005-2025)',
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
        display: nyseData.length > 0,
        position: 'left',
        title: {
          display: true,
          text: 'NYSE Composite Index',
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
        position: nyseData.length > 0 ? 'right' : 'left',
        title: {
          display: true,
          text: 'Pop Songs Count',
          color: '#00e5ff'
        },
        ticks: {
          color: '#00e5ff'
        },
        grid: {
          drawOnChartArea: nyseData.length === 0,
          color: 'rgba(0, 229, 255, 0.1)'
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="viz-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Loading Economic vs Music Data...</h3>
        <p style={{ color: '#00e5ff' }}>Reading CSV files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="viz-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: '#ff2d95' }}>Data Loading Error</h3>
        <p style={{ color: '#fff' }}>{error}</p>
        <p style={{ color: '#00e5ff', marginTop: '1rem' }}>
          Please check your CSV files:
          <br />- public/indexData_2005_onward_cleaned.csv ✓
          <br />- public/song_counts_by_year_genre_2005_2008_added.csv ✓
        </p>
      </div>
    );
  }

  const chartData = processChartData();

  if (!chartData) {
    return (
      <div className="viz-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: '#ff2d95' }}>No Data Available</h3>
        <p style={{ color: '#fff' }}>Please check your CSV files and data format.</p>
      </div>
    );
  }

  return (
    <div className="viz-card">
      <h3>Economic Trends vs Pop Music Popularity</h3>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'rgba(255, 45, 149, 0.1)', 
        borderRadius: '8px',
        border: '1px solid #ff2d95'
      }}>
        <p style={{ 
          color: '#fff', 
          fontSize: '0.9rem', 
          textAlign: 'center',
          fontFamily: 'Comic Sans MS'
        }}>
           {nyseData.length > 0 
            ? 'This chart shows how pop music seemed to gain popularity during economic downturns, such as the 2008 recession and recovery period.'
            : 'Currently showing pop music trends. Add NYSE data (convert .numbers to .csv) to see economic correlation.'
          }
        </p>
      </div>
    </div>
  );
};

export default EconomicMusicChart; 