const stockData = [
    {
      name: "Apple Inc. (AAPL)",
      price: 145.09,
      open: 143.0,
      high: 146.0,
      low: 142.0,
      previousClose: 144.5,
      prices: [145, 143, 146, 142, 144],
    },
    {
      name: "Microsoft Corp. (MSFT)",
      price: 299.35,
      open: 297.0,
      high: 300.0,
      low: 295.0,
      previousClose: 298.0,
      prices: [299, 297, 300, 295, 298],
    },
    {
      name: "Tesla Inc. (TSLA)",
      price: 759.49,
      open: 755.0,
      high: 765.0,
      low: 750.0,
      previousClose: 757.0,
      prices: [759, 755, 765, 750, 757],
    },
    {
      name: "Amazon.com Inc. (AMZN)",
      price: 3392.49,
      open: 3380.0,
      high: 3400.0,
      low: 3370.0,
      previousClose: 3385.0,
      prices: [3392, 3380, 3400, 3370, 3385],
    },
    {
      name: "Google LLC (GOOGL)",
      price: 2850.58,
      open: 2840.0,
      high: 2860.0,
      low: 2830.0,
      previousClose: 2845.0,
      prices: [2850, 2840, 2860, 2830, 2845],
    },
  ];
  
  const carouselTrack = document.querySelector(".carousel-track");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  
  function createStockCards() {
    stockData.forEach((stock) => {
      const card = document.createElement("div");
      card.classList.add("carousel-card");
  
      const trendIndicator = stock.price > stock.previousClose ? "↑" : "↓";
      const trendClass =
        stock.price > stock.previousClose ? "trend-up" : "trend-down";
  
      card.innerHTML = `
              <h2>${stock.name}</h2>
              <div><strong>Current Price:</strong> <span>${stock.price.toFixed(
                2
              )}</span> <span class="${trendClass}">${trendIndicator}</span></div>
              <div><strong>Open:</strong> <span>${stock.open.toFixed(
                2
              )}</span></div>
              <div><strong>High:</strong> <span>${stock.high.toFixed(
                2
              )}</span></div>
              <div><strong>Low:</strong> <span>${stock.low.toFixed(
                2
              )}</span></div>
              <div><strong>Previous Close:</strong> <span>${stock.previousClose.toFixed(
                2
              )}</span></div>
              <canvas id="chart-${stock.name.replace(
                /\s+/g,
                ""
              )}" width="400" height="200"></canvas>
          `;
      carouselTrack.appendChild(card);
      createChart(stock, `chart-${stock.name.replace(/\s+/g, "")}`);
    });
  }
  
  function createChart(stock, chartId) {
    const ctx = document.getElementById(chartId).getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Open", "High", "Low", "Current"],
        datasets: [
          {
            label: "Stock Prices",
            data: [stock.open, stock.high, stock.low, stock.price],
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  function updateCarousel() {
    const totalCards = stockData.length;
    const movePercentage = -currentIndex * 100;
  
    carouselTrack.style.transform = `translateX(${movePercentage}%)`;
  
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalCards - 1;
  }
  
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextBtn.addEventListener("click", () => {
    if (currentIndex < stockData.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  // Initialize the stock cards and carousel
  createStockCards();
  updateCarousel();