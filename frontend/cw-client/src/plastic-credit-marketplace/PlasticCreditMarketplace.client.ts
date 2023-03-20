/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.25.2.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, Uint64, Uint128, Coin, QueryMsg, Addr, ListingsResponse, Listing } from "./PlasticCreditMarketplace.types";
export interface PlasticCreditMarketplaceReadOnlyInterface {
  contractAddress: string;
  listings: ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: number;
  }) => Promise<ListingsResponse>;
}
export class PlasticCreditMarketplaceQueryClient implements PlasticCreditMarketplaceReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.listings = this.listings.bind(this);
  }

  listings = async ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: number;
  }): Promise<ListingsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      listings: {
        limit,
        start_after: startAfter
      }
    });
  };
}
export interface PlasticCreditMarketplaceInterface extends PlasticCreditMarketplaceReadOnlyInterface {
  contractAddress: string;
  sender: string;
  createListing: ({
    denom,
    numberOfCredits,
    pricePerCredit
  }: {
    denom: string;
    numberOfCredits: Uint64;
    pricePerCredit: Coin;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  buyCredits: ({
    listingId,
    numberOfCreditsToBuy
  }: {
    listingId: number;
    numberOfCreditsToBuy: number;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class PlasticCreditMarketplaceClient extends PlasticCreditMarketplaceQueryClient implements PlasticCreditMarketplaceInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.createListing = this.createListing.bind(this);
    this.buyCredits = this.buyCredits.bind(this);
  }

  createListing = async ({
    denom,
    numberOfCredits,
    pricePerCredit
  }: {
    denom: string;
    numberOfCredits: Uint64;
    pricePerCredit: Coin;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_listing: {
        denom,
        number_of_credits: numberOfCredits,
        price_per_credit: pricePerCredit
      }
    }, fee, memo, funds);
  };
  buyCredits = async ({
    listingId,
    numberOfCreditsToBuy
  }: {
    listingId: number;
    numberOfCreditsToBuy: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      buy_credits: {
        listing_id: listingId,
        number_of_credits_to_buy: numberOfCreditsToBuy
      }
    }, fee, memo, funds);
  };
}