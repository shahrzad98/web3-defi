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

interface ILockerUserInterface extends ethers.utils.Interface {
  functions: {
    "locker()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "locker", values?: undefined): string;

  decodeFunctionResult(functionFragment: "locker", data: BytesLike): Result;

  events: {
    "SetLocker(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetLocker"): EventFragment;
}

export class ILockerUser extends Contract {
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

  interface: ILockerUserInterface;

  functions: {
    locker(overrides?: CallOverrides): Promise<[string]>;

    "locker()"(overrides?: CallOverrides): Promise<[string]>;
  };

  locker(overrides?: CallOverrides): Promise<string>;

  "locker()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    locker(overrides?: CallOverrides): Promise<string>;

    "locker()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    SetLocker(
      locker: string | null
    ): TypedEventFilter<[string], { locker: string }>;
  };

  estimateGas: {
    locker(overrides?: CallOverrides): Promise<BigNumber>;

    "locker()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    locker(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "locker()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
