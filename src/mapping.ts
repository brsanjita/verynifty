import { BigInt } from "@graphprotocol/graph-ts"
import {
  VeryNifty,
  Approval,
  ApprovalForAll,
  BurnPercentageChanged,
  CareTakerAdded,
  CareTakerRemoved,
  ClaimedMiningRewards,
  ItemCreated,
  LifeGiven,
  OwnershipTransferred,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  Unpaused,
  Unwrapped,
  VnftConsumed,
  VnftFatalized,
  VnftMinted
} from "../generated/VeryNifty/VeryNifty"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.MINTER_ROLE(...)
  // - contract.OPERATOR_ROLE(...)
  // - contract.PAUSER_ROLE(...)
  // - contract.balanceOf(...)
  // - contract.baseURI(...)
  // - contract.burnPercentage(...)
  // - contract.careTaker(...)
  // - contract.contractURI(...)
  // - contract.createItem(...)
  // - contract.devAllocation(...)
  // - contract.gameStopped(...)
  // - contract.getApproved(...)
  // - contract.getFatalityReward(...)
  // - contract.getItemInfo(...)
  // - contract.getRewards(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.getVnftInfo(...)
  // - contract.getVnftScore(...)
  // - contract.giveLifePrice(...)
  // - contract.hasRole(...)
  // - contract.isApprovedForAll(...)
  // - contract.isVnftAlive(...)
  // - contract.itemExists(...)
  // - contract.itemName(...)
  // - contract.itemPoints(...)
  // - contract.itemPrice(...)
  // - contract.itemTimeExtension(...)
  // - contract.lastTimeMined(...)
  // - contract.level(...)
  // - contract.maxDevAllocation(...)
  // - contract.muse(...)
  // - contract.name(...)
  // - contract.onERC1155BatchReceived(...)
  // - contract.onERC1155Received(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.paused(...)
  // - contract.supportedNftLength(...)
  // - contract.supportedNfts(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.timeUntilStarving(...)
  // - contract.timeVnftBorn(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)
  // - contract.vnftDetails(...)
  // - contract.vnftScore(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBurnPercentageChanged(
  event: BurnPercentageChanged
): void {}

export function handleCareTakerAdded(event: CareTakerAdded): void {}

export function handleCareTakerRemoved(event: CareTakerRemoved): void {}

export function handleClaimedMiningRewards(event: ClaimedMiningRewards): void {}

export function handleItemCreated(event: ItemCreated): void {}

export function handleLifeGiven(event: LifeGiven): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleUnwrapped(event: Unwrapped): void {}

export function handleVnftConsumed(event: VnftConsumed): void {}

export function handleVnftFatalized(event: VnftFatalized): void {}

export function handleVnftMinted(event: VnftMinted): void {}
