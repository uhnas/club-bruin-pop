# CSV Data Files for Economic vs Music Analysis

Please add your CSV files to this folder:

## Required Files:

### 1. NYSE Data: `nyse_data.csv`
Expected columns:
- `Date` (YYYY-MM-DD format)
- `Close` or `Price` (stock market close price)
- `Volume` (optional)

Example:
```
Date,Close,Volume
2007-01-01,14164.53,3500000
2007-02-01,14099.99,3400000
...
```

### 2. Genre Popularity Data: `genre_popularity.csv`
Expected columns:
- `Date` (YYYY-MM-DD format)
- `Genre` (e.g., "Pop", "Rock", "Hip Hop")
- `Popularity` or `Songs` (popularity score or number of songs)

Example:
```
Date,Genre,Popularity
2007-01-01,Pop,45
2007-01-01,Rock,30
2007-01-01,Hip Hop,25
...
```

## Analysis Goal:
We'll overlay these datasets to show how pop music popularity increased during the 2008 recession as NYSE values declined, demonstrating the "escapism through music" trend.

The visualization will show:
- NYSE decline during 2007-2009
- Pop music popularity increase during the same period
- Correlation between economic stress and escapist music trends 