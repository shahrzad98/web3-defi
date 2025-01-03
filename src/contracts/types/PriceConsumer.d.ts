/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface PriceConsumerInterface extends ethers.utils.Interface {
  functions: {
    "getDecimals()": FunctionFragment;
    "getLatestPrice()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getDecimals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestPrice",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLatestPrice",
    data: BytesLike
  ): Result;

  events: {};
}

export class PriceConsumer extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: PriceConsumerInterface;

  functions: {
    getDecimals(overrides?: CallOverrides): Promise<[number]>;

    "getDecimals()"(overrides?: CallOverrides): Promise<[number]>;

    getLatestPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    "getLatestPrice()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  getDecimals(overrides?: CallOverrides): Promise<number>;

  "getDecimals()"(overrides?: CallOverrides): Promise<number>;

  getLatestPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "getLatestPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    getDecimals(overrides?: CallOverrides): Promise<number>;

    "getDecimals()"(overrides?: CallOverrides): Promise<number>;

    getLatestPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "getLatestPrice()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getDecimals(overrides?: CallOverrides): Promise<BigNumber>;

    "getDecimals()"(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "getLatestPrice()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getDecimals()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLatestPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getLatestPrice()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
