import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import {
  Address,
  BigInt,
  Bytes,
  ethereum,
  json,
  JSONValue,
  log,
} from "@graphprotocol/graph-ts";
import { Approval as ApprovalEvent } from "../generated/MockEvent/MockEvent";
import {
  createApprovalEvent,
  createFillOfframpEvent,
  createRequestOfframpEvent,
} from "./mock-event-utils";
import { OffRamp } from "../generated/schema";
import { handleFillOfframp, handleRequestOfframp } from "../src/mock-event";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let spender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let value = BigInt.fromI32(234);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Request OffRamp event", () => {
    let owner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let spender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );

    let value = BigInt.fromI32(234);
    const randomId = Bytes.fromHexString(
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    ) as Bytes;

    const paramsValue = changetype<ethereum.Tuple>([
      ethereum.Value.fromAddress(owner),
      ethereum.Value.fromUnsignedBigInt(value),
      ethereum.Value.fromUnsignedBigInt(value.div(BigInt.fromI32(2))),
      ethereum.Value.fromFixedBytes(
        Bytes.fromHexString(
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        ) as Bytes
      ),
      ethereum.Value.fromFixedBytes(
        Bytes.fromHexString(
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        ) as Bytes
      ),
    ]);

    let requestOfframpEvent = createRequestOfframpEvent(randomId, paramsValue);

    handleRequestOfframp(requestOfframpEvent);
    let entity = OffRamp.load(randomId);

    assert.assertNotNull(entity);

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "id",
      randomId.toHexString()
    );

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "user",
      spender.toHexString()
    );
  });

  test("Fill OffRamp event", () => {
    let owner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let spender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );

    let value = BigInt.fromI32(234);
    const randomId = Bytes.fromHexString(
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    ) as Bytes;

    const paramsValue = changetype<ethereum.Tuple>([
      ethereum.Value.fromAddress(owner),
      ethereum.Value.fromUnsignedBigInt(value),
      ethereum.Value.fromUnsignedBigInt(value.div(BigInt.fromI32(2))),
      ethereum.Value.fromFixedBytes(
        Bytes.fromHexString(
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        ) as Bytes
      ),
      ethereum.Value.fromFixedBytes(
        Bytes.fromHexString(
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        ) as Bytes
      ),
    ]);

    let requestOfframpEvent = createRequestOfframpEvent(randomId, paramsValue);

    handleRequestOfframp(requestOfframpEvent);

    let entity = OffRamp.load(randomId);

    assert.assertNotNull(entity);

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "id",
      randomId.toHexString()
    );

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "status",
      "PENDING"
    );

    const receiverAddress = Address.fromString(
      "0x0000000000000000000000000000000000000003"
    );

    let fillOffRamp = createFillOfframpEvent(
      randomId,
      receiverAddress,
      Bytes.fromHexString(
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
      ) as Bytes,
      Bytes.fromHexString(
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
      ) as Bytes
    );

    handleFillOfframp(fillOffRamp);

    let entityFill = OffRamp.load(randomId);

    assert.assertNotNull(entityFill);

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "id",
      randomId.toHexString()
    );

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "receiver",
      receiverAddress.toHexString()
    );

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "status",
      "COMPLETED"
    );

    assert.fieldEquals(
      "OffRamp",
      randomId.toHexString(),
      "proof",
      fillOffRamp.params.proof.toHexString()
    );
  });
});
