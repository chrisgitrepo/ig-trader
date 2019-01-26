module.exports = {
  getMidPrice: (lowerPrice, upperPrice) => {
    const standardMidPrice = upperPrice > lowerPrice && (lowerPrice + ((upperPrice - lowerPrice) / 2))
    const scewedMidPrice = upperPrice < lowerPrice && (upperPrice + ((lowerPrice - upperPrice) / 2 ))
    return standardMidPrice || scewedMidPrice || upperPrice
  }
}