/**
 * Vypočíta čistý zisk pri predaji na Cardmarket
 * @param {number} sellPrice - predajná cena (EUR)
 * @param {number} cmFeePercent - poplatok Cardmarket (%)
 * @param {number} shippingOut - cena poštovného (EUR)
 * @returns {number} čistý výnos
 */
export function cmNetRevenue(sellPrice, cmFeePercent, shippingOut) {
  return sellPrice * (1 - cmFeePercent / 100) - shippingOut
}

/**
 * Vypočíta čistý zisk pri predaji na eBay
 */
export function ebayNetRevenue(sellPrice, ebayFeePercent, shippingOut) {
  return sellPrice * (1 - ebayFeePercent / 100) - shippingOut
}

/**
 * Vypočíta profit pre jednu položku
 */
export function calcProfit(buyPrice, netRevenue) {
  return netRevenue - buyPrice
}

/**
 * Vypočíta maržu v %
 */
export function calcMargin(profit, buyPrice) {
  if (buyPrice === 0) return 0
  return (profit / buyPrice) * 100
}

/**
 * Vráti farbu/label odporúčania podľa marže
 */
export function getRecommendation(margin, targetMargin) {
  if (margin >= targetMargin) return { label: 'KÚP', color: 'green', emoji: '✅' }
  if (margin >= 0) return { label: 'ZVAŽUJ', color: 'yellow', emoji: '⚠️' }
  return { label: 'SKIP', color: 'red', emoji: '❌' }
}

/**
 * Celkové zhrnutie celej ponuky
 */
export function calcOfferSummary(items, settings) {
  let totalBuy = 0
  let totalProfitCm = 0
  let totalProfitEbay = 0

  for (const item of items) {
    const qty = item.qty || 1
    const buy = (item.buyPrice || 0) * qty

    const cmNet = cmNetRevenue(item.cmPrice || 0, settings.cmFee, settings.shippingOut) * qty
    const ebayNet = ebayNetRevenue(item.ebayPrice || 0, settings.ebayFee, settings.shippingOut) * qty

    totalBuy += buy
    totalProfitCm += cmNet - buy
    totalProfitEbay += ebayNet - buy
  }

  return {
    totalBuy,
    totalProfitCm,
    totalProfitEbay,
    marginCm: calcMargin(totalProfitCm, totalBuy),
    marginEbay: calcMargin(totalProfitEbay, totalBuy),
  }
}
