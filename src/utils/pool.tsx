export function calculateRange(betValue: number): number {
  if (betValue < 27501) {
    return Math.round((betValue / 500) * 10);
  }
  if (27500 < betValue && betValue < 57501) {
    return Math.round((27500 / 500) * 10 + (30000 / 500) * 7);
  }
  if (57500 < betValue && betValue < 75001) {
    return Math.round(
      (27500 / 500) * 10 + (30000 / 500) * 7 + ((betValue - 57500) / 500) * 3.75
    );
  }
  if (betValue > 75000) {
    return Math.round(
      (27500 / 500) * 10 +
        (30000 / 500) * 7 +
        (17500 / 500) * 3.75 +
        ((betValue - 75000) / 500) * 2
    );
  }
  return 500;
}

export function isActivePool(stakingPool: any): boolean {
  return !(isLocked(stakingPool) || isMatured(stakingPool));
}
export function isMatured(stakingPool: any): boolean {
  return stakingPool?.isMatured;
}

export function isLocked(stakingPool: any): boolean {
  return (
    new Date(
      (parseInt(stakingPool?.startDate) + parseInt(stakingPool?.lockTime)) *
        1000
    ) < new Date() ||
    Number(stakingPool?.sizeAllocation) <= Number(stakingPool?.totalStaked) ||
    stakingPool?.isLocked
  );
}
