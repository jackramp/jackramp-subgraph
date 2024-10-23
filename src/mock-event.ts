import {
  Approval as ApprovalEvent,
  FillOfframp as FillOfframpEvent,
  Mint as MintEvent,
  RequestOfframp as RequestOfframpEvent,
  Transfer as TransferEvent,
  Withdraw as WithdrawEvent
} from "../generated/MockEvent/MockEvent"
import {
  Approval,
  FillOfframp,
  Mint,
  RequestOfframp,
  Transfer,
  Withdraw
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFillOfframp(event: FillOfframpEvent): void {
  let entity = new FillOfframp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestOfframpId = event.params.requestOfframpId
  entity.receiver = event.params.receiver
  entity.proof = event.params.proof
  entity.reclaimProof = event.params.reclaimProof

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestOfframp(event: RequestOfframpEvent): void {
  let entity = new RequestOfframp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestOfframpId = event.params.requestOfframpId
  entity.params_user = event.params.params.user
  entity.params_amount = event.params.params.amount
  entity.params_amountRealWorld = event.params.params.amountRealWorld
  entity.params_channelAccount = event.params.params.channelAccount
  entity.params_channelId = event.params.params.channelId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
