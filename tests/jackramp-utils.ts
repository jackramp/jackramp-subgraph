import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  FillOfframp,
  Mint,
  RequestOfframp,
  Transfer,
  Withdraw
} from "../generated/Jackramp/Jackramp"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createFillOfframpEvent(
  requestOfframpId: Bytes,
  receiver: Address,
  proof: Bytes,
  reclaimProof: Bytes
): FillOfframp {
  let fillOfframpEvent = changetype<FillOfframp>(newMockEvent())

  fillOfframpEvent.parameters = new Array()

  fillOfframpEvent.parameters.push(
    new ethereum.EventParam(
      "requestOfframpId",
      ethereum.Value.fromFixedBytes(requestOfframpId)
    )
  )
  fillOfframpEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  fillOfframpEvent.parameters.push(
    new ethereum.EventParam("proof", ethereum.Value.fromFixedBytes(proof))
  )
  fillOfframpEvent.parameters.push(
    new ethereum.EventParam(
      "reclaimProof",
      ethereum.Value.fromFixedBytes(reclaimProof)
    )
  )

  return fillOfframpEvent
}

export function createMintEvent(user: Address, amount: BigInt): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return mintEvent
}

export function createRequestOfframpEvent(
  requestOfframpId: Bytes,
  params: ethereum.Tuple
): RequestOfframp {
  let requestOfframpEvent = changetype<RequestOfframp>(newMockEvent())

  requestOfframpEvent.parameters = new Array()

  requestOfframpEvent.parameters.push(
    new ethereum.EventParam(
      "requestOfframpId",
      ethereum.Value.fromFixedBytes(requestOfframpId)
    )
  )
  requestOfframpEvent.parameters.push(
    new ethereum.EventParam("params", ethereum.Value.fromTuple(params))
  )

  return requestOfframpEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createWithdrawEvent(user: Address, amount: BigInt): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
