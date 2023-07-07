let currency = new Decimal('1e100');
let baseCost = new Decimal('10');
let cost;
let level = new Decimal('0');
let costIncrease = new Decimal('12');

setInterval(() => {
  document.getElementById('currency').textContent = currency;
  document.getElementById('level').textContent = level;
  document.getElementById('cost').textContent = 'cost: ' + baseCost.mul(Decimal.pow(costIncrease, level));
}, 10);

const buy = () => {
  let cost = baseCost.mul(Decimal.pow(costIncrease, level));
  if (currency.gte(cost)) {
    level = level.add('1');
    currency = currency.sub(cost);
  }
};

document.getElementById('buy-1').onclick = () => buy();

document.getElementById('buy-max').onclick = () => {
  const maxBuyable = Decimal.log10(
    Decimal.pow(costIncrease, level)
      .sub(currency.mul(new Decimal(1).sub(costIncrease)))
      .div(baseCost)
  )
    .div(Decimal.log10(costIncrease))
    .sub(level);

  const maxFloored = Decimal.floor(maxBuyable);
  if (maxFloored.lte(0)) return;

  level = level.add(maxFloored);

  for (i = 1; i < 31; i++) {
    if (maxFloored.gte(i)) currency = currency.sub(baseCost.mul(Decimal.pow(costIncrease, level.sub(i))));
    else break;
  }

  // for when maxFloored doesnt work
  for (i = 0; i < 10; i++) buy();
};
