import { BigNumber, BigNumberish } from "ethers"

export function convertBusdToUsd(busd: BigNumberish): string {
    const exp = BigNumber.from("10").pow(18);
    return BigNumber.from(busd).div(exp).toString()
}