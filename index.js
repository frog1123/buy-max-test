let currency = new Decimal('1e100');
let baseCost = new Decimal('10');
let cost;
let level = new Decimal('0');
let costIncrease = new Decimal('27');

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
    console.log(currency, cost);
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

  currency = currency.sub(baseCost.mul(Decimal.pow(costIncrease, level.sub(1))));
  if (maxFloored.gte(2)) currency = currency.sub(baseCost.mul(Decimal.pow(costIncrease, level.sub(2))));
  if (maxFloored.gte(3)) currency = currency.sub(baseCost.mul(Decimal.pow(costIncrease, level.sub(3))));
  if (maxFloored.gte(4)) currency = currency.sub(baseCost.mul(Decimal.pow(costIncrease, level.sub(4))));
  if (maxFloored.gte(5)) currency = currency.sub(baseCost.mul(Decimal.pow(costIncrease, level.sub(5))));
  if (maxFloored.gte(6)) currency = currency.sub(baseCost.mul(Decimal.pow(costIncrease, level.sub(6))));

  for (i = 0; i <= 10; i++) {
    console.log(i);
    buy();
  }
};
