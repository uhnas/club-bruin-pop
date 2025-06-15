import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import EconomicMusicChart from './EconomicMusicChart';
import MusicSalesChart from './MusicSalesChart';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DataViz = () => {
  return (
    <div className="data-viz-container">
      <h2 className="data-viz-title">Music Data Visualizations</h2>
      
      <div className="viz-grid">
        {/* Economic vs Music Correlation Chart */}
        <EconomicMusicChart />

        <div className="viz-card word-cloud-card">
          <h3>Pop Music Lyrics Word Cloud</h3>
          <div className="word-cloud-container">
            <img 
              src="/wordcloud.svg" 
              alt="Music Keywords Word Cloud" 
              className="word-cloud-image"
              onError={(e) => {
                console.log('SVG failed to load from /wordcloud.svg');
                e.currentTarget.style.display = 'none';
                const container = e.currentTarget.parentElement;
                if (container) {
                  container.innerHTML = '<p style="color: #ff2d95; text-align: center;">Word cloud not found. Please check if wordcloud.svg is in the public folder.</p>';
                }
              }}
              onLoad={() => console.log('SVG loaded successfully on DataViz page!')}
            />
          </div>
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: 'rgba(0, 229, 255, 0.1)', 
            borderRadius: '8px',
            border: '1px solid #00e5ff'
          }}>
            <p style={{ 
              color: '#fff', 
              fontSize: '0.9rem', 
              textAlign: 'center',
              fontFamily: 'Comic Sans MS'
            }}>
              This word cloud shows us the most frequent terms in early 2000s music lyrics, 
              highlighting several key themes and cultural elements, such as dance, money, night life, and love.
            </p>
          </div>
        </div>

        {/* Music Sales Evolution Chart */}
        <MusicSalesChart />
      </div>
    </div>
  );
};

export default DataViz; 