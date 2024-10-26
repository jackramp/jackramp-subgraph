import { log } from "@graphprotocol/graph-ts";
import {
  FillOfframp as FillOfframpEvent,
  Mint as MintEvent,
  RequestOfframp as RequestOfframpEvent,
  Transfer as TransferEvent,
  Withdraw as WithdrawEvent,
} from "../generated/Jackramp/Jackramp"
import { Mint, OffRamp, Transfer, Withdraw } from "../generated/schema";

const STATUS_PENDING = "PENDING";
const STATUS_COMPLETED = "COMPLETED";

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRequestOfframp(event: RequestOfframpEvent): void {
  let entity = new OffRamp(event.params.requestOfframpId);

  entity.id = event.params.requestOfframpId;
  entity.user = event.params.params.user;
  entity.requestedAmount = event.params.params.amount;
  entity.requestedAmountRealWorld = event.params.params.amountRealWorld;
  entity.channelAccount = event.params.params.channelAccount;
  entity.channelId = event.params.params.channelId;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.status = STATUS_PENDING;

  entity.save();
}

export function handleFillOfframp(event: FillOfframpEvent): void {
  const entity = OffRamp.load(event.params.requestOfframpId);

  if (entity === null) {
    log.error("OffRamp entity not found for requestOfframpId: {}", [
      event.params.requestOfframpId.toHexString(),
    ]);

    return;
  }

  entity.receiver = event.params.receiver;
  entity.proof = event.params.proof;
  entity.reclaimProof = event.params.reclaimProof;
  entity.fillBlockNumber = event.block.number;
  entity.fillBlockTimestamp = event.block.timestamp;
  entity.fillTransactionHash = event.transaction.hash;
  entity.status = STATUS_COMPLETED;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}