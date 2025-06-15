import React from 'react';

const References = () => {
  const references = [
    {
      title: "Wikipedia",
      url: "https://www.wikipedia.org/"
    },
    {
      title: "YouTube - Britannica",
      url: "https://www.britannica.com/topic/YouTube"
    },
    {
      title: "2008 Housing Crisis - American Progress",
      url: "https://www.americanprogress.org/article/2008-housing-crisis/"
    },
    {
      title: "iPhone History - Verizon",
      url: "https://www.verizon.com/articles/Smartphones/milestones-in-history-of-apple-iphone"
    },
    {
      title: "Lehman Brothers - Investopedia",
      url: "https://www.investopedia.com/terms/l/lehman-brothers.asp"
    },
    {
      title: "TARP Program - U.S. Treasury",
      url: "https://home.treasury.gov/data/troubled-asset-relief-program"
    },
    {
      title: "Recession Analysis - Bureau of Labor Statistics",
      url: "https://www.bls.gov/spotlight/2012/recession/pdf/recession_bls_spotlight.pdf"
    },
    {
      title: "Harlem Shake Videos - Pedestrian TV",
      url: "https://www.pedestrian.tv/music/harlem-shake-best-videos/"
    },
    {
      title: "Music Charts Archive",
      url: "https://musicchartsarchive.com/"
    },
    {
      title: "TikTok Fashion Impact - Vogue",
      url: "https://www.vogue.com/article/how-tiktok-changed-fashion-this-year"
    },
    {
      title: "US Inflation 2022 - The Guardian",
      url: "https://www.theguardian.com/business/2022/jun/10/us-inflation-rate-may-2022-four-decade-high"
    },
    {
      title: "Top 100 Songs and Lyrics Dataset (1959-2019) - Kaggle",
      url: "https://www.kaggle.com/datasets/brianblakely/top-100-songs-and-lyrics-from-1959-to-2019/data"
    },
    {
      title: "Stock Exchange Data - Kaggle",
      url: "https://www.kaggle.com/datasets/mattiuzc/stock-exchange-data"
    },
    {
      title: "Music Sales Dataset - Kaggle",
      url: "https://www.kaggle.com/datasets/andrewmvd/music-sales"
    },
    {
      title: "Voyant Tools - Text Analysis Platform",
      url: "https://voyant-tools.org"
    }
  ];

  return (
    <div className="references-page">
      <div className="references-header">
        <h1 className="neon-text">References</h1>
        <p className="neon-text-small">Sources and research materials used in this project</p>
      </div>

      <div className="references-list">
        {references.map((ref, index) => (
          <div key={index} className="reference-item">
            <a 
              href={ref.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="reference-link"
            >
              {ref.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default References; 