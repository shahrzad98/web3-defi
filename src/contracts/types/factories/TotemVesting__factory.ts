/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { TotemVesting } from "../TotemVesting";

export class TotemVesting__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _totemToken: string,
    _totalAmount: BigNumberish,
    _withdrawInterval: BigNumberish,
    _releasePeriods: BigNumberish,
    _lockPeriods: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TotemVesting> {
    return super.deploy(
      _totemToken,
      _totalAmount,
      _withdrawInterval,
      _releasePeriods,
      _lockPeriods,
      overrides || {}
    ) as Promise<TotemVesting>;
  }
  getDeployTransaction(
    _totemToken: string,
    _totalAmount: BigNumberish,
    _withdrawInterval: BigNumberish,
    _releasePeriods: BigNumberish,
    _lockPeriods: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _totemToken,
      _totalAmount,
      _withdrawInterval,
      _releasePeriods,
      _lockPeriods,
      overrides || {}
    );
  }
  attach(address: string): TotemVesting {
    return super.attach(address) as TotemVesting;
  }
  connect(signer: Signer): TotemVesting__factory {
    return super.connect(signer) as TotemVesting__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TotemVesting {
    return new Contract(address, _abi, signerOrProvider) as TotemVesting;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract TotemToken",
        name: "_totemToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_withdrawInterval",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_releasePeriods",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lockPeriods",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    name: "StartTimeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "registeredAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
    ],
    name: "VestingScheduleRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "registeredAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountWithdrawn",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newRecipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalAmount",
        type: "uint256",
      },
    ],
    name: "addRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isStartTimeSet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockPeriods",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "recipients",
    outputs: [
      {
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountWithdrawn",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "releasePeriods",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newStartTime",
        type: "uint256",
      },
    ],
    name: "setStartTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totemToken",
    outputs: [
      {
        internalType: "contract TotemToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unallocatedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "vested",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountVested",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawInterval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "withdrawable",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610d67380380610d67833981810160405260a081101561003357600080fd5b50805160208201516040830151606084015160809094015192939192909190600061005c610111565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600084116100b357600080fd5b600083116100c057600080fd5b600082116100cd57600080fd5b600980546001600160a01b0319166001600160a01b03969096169590951790945560078390556008929092556004556005556006556003805460ff19169055610115565b3390565b610c43806101246000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c806378e97925116100a2578063eb82031211610071578063eb820312146101f1578063f2fde38b14610230578063f361c59b14610256578063f57c8cdf14610272578063f79822431461027a5761010b565b806378e97925146101975780638da5cb5b1461019f578063ce513b6f146101c3578063e8153c93146101e95761010b565b80633e0a322d116100de5780633e0a322d146101445780634afe5bf3146101615780637102b72814610169578063715018a61461018f5761010b565b8063162075d8146101105780631a39d8ef1461012a5780632509e086146101325780633ccfd60b1461013a575b600080fd5b6101186102a6565b60408051918252519081900360200190f35b6101186102ac565b6101186102b2565b6101426102b8565b005b6101426004803603602081101561015a57600080fd5b5035610409565b6101186104db565b6101186004803603602081101561017f57600080fd5b50356001600160a01b03166104e1565b610142610675565b610118610721565b6101a7610727565b604080516001600160a01b039092168252519081900360200190f35b610118600480360360208110156101d957600080fd5b50356001600160a01b0316610736565b6101a761076b565b6102176004803603602081101561020757600080fd5b50356001600160a01b031661077a565b6040805192835260208301919091528051918290030190f35b6101426004803603602081101561024657600080fd5b50356001600160a01b0316610793565b61025e610895565b604080519115158252519081900360200190f35b61011861089e565b6101426004803603604081101561029057600080fd5b506001600160a01b0381351690602001356108a4565b60045481565b60075481565b60065481565b6000600160006102c6610a24565b6001600160a01b03168152602081019190915260400160002080549091506102ee5750610407565b60006103006102fb610a24565b6104e1565b9050600061031461030f610a24565b610736565b6001840183905590508015610403576009546001600160a01b031663a9059cbb61033c610a24565b836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561038357600080fd5b505af1158015610397573d6000803e3d6000fd5b505050506040513d60208110156103ad57600080fd5b50516103b857600080fd5b7f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243646103e1610a24565b604080516001600160a01b039092168252602082018490528051918290030190a15b5050505b565b610411610a24565b6001600160a01b0316610422610727565b6001600160a01b03161461046b576040805162461bcd60e51b81526020600482018190526024820152600080516020610bee833981519152604482015290519081900360640190fd5b60035460ff16158061047e575042600254115b61048757600080fd5b42811161049357600080fd5b60028190556003805460ff191660011790556040805182815290517faad53c4362ef2fe5a5390cc046e71fd8423a0a8dceebc156ac9bbcd15997eec29181900360200190a150565b60085481565b6001600160a01b0381166000908152600160208181526040808420815180830190925280548252909201549082015260035460ff16158061052157508051155b8061053757506006541580156105375750600554155b80610543575060025442105b15610552576000915050610670565b600061056b600654600454610a2890919063ffffffff16565b60025490915061057b9082610a88565b42101561058d57600092505050610670565b60006105b26105a9600554600654610a8890919063ffffffff16565b60045490610a28565b6002549091506105c29082610a88565b42106105d2575050519050610670565b60006105f56004546105ef60025442610ae290919063ffffffff16565b90610b3f565b60010190506006548111610610576000945050505050610670565b60055460065461061f91610a88565b8110610632575050905191506106709050565b60055484516000916106449190610b3f565b905060006106678261066160065486610ae290919063ffffffff16565b90610a28565b96505050505050505b919050565b61067d610a24565b6001600160a01b031661068e610727565b6001600160a01b0316146106d7576040805162461bcd60e51b81526020600482018190526024820152600080516020610bee833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60025481565b6000546001600160a01b031690565b6001600160a01b0381166000908152600160208190526040822001546107659061075f846104e1565b90610ae2565b92915050565b6009546001600160a01b031681565b6001602081905260009182526040909120805491015482565b61079b610a24565b6001600160a01b03166107ac610727565b6001600160a01b0316146107f5576040805162461bcd60e51b81526020600482018190526024820152600080516020610bee833981519152604482015290519081900360640190fd5b6001600160a01b03811661083a5760405162461bcd60e51b8152600401808060200182810382526026815260200180610ba76026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60035460ff1681565b60055481565b6108ac610a24565b6001600160a01b03166108bd610727565b6001600160a01b031614610906576040805162461bcd60e51b81526020600482018190526024820152600080516020610bee833981519152604482015290519081900360640190fd5b60035460ff161580610919575042600254115b61092257600080fd5b6001600160a01b03821661093557600080fd5b6001600160a01b0382166000908152600160205260409020541561097c576001600160a01b03821660009081526001602052604090205460085461097891610a88565b6008555b60008111801561098e57506008548111155b61099757600080fd5b604080518082018252828152600060208083018281526001600160a01b0387168352600191829052939091209151825591519101556008546109d99082610ae2565b600855604080516001600160a01b03841681526020810183905281517f16e42921daee38136dc17f8420c371163ec8299e5299fb480d7aeff85cfac3eb929181900390910190a15050565b3390565b600082610a3757506000610765565b82820282848281610a4457fe5b0414610a815760405162461bcd60e51b8152600401808060200182810382526021815260200180610bcd6021913960400191505060405180910390fd5b9392505050565b600082820183811015610a81576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600082821115610b39576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6000808211610b95576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381610b9e57fe5b04939250505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220a9edc3c4e9a782005234ef0bc992a09ef90e46089d518f4ad13f7656e107ea7864736f6c63430007060033";
