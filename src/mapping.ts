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
import { Player, Vnft, Summary } from "../generated/schema"

export function handleApproval(event: Approval): void { }

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBurnPercentageChanged(
  event: BurnPercentageChanged
): void {}

export function handleCareTakerAdded(event: CareTakerAdded): void {}

export function handleCareTakerRemoved(event: CareTakerRemoved): void {}

export function handleClaimedMiningRewards(event: ClaimedMiningRewards): void {

  //VNFT
  let vnft = Vnft.load(event.params.who.toHex())
  if (vnft == null) {
    vnft = new Vnft(event.params.who.toHex())
    vnft.museMinted = BigInt.fromI32(0)
  }
  vnft.museMinted = vnft.museMinted + event.params.amount
  // log.info("Updated museMinted for VNFT", [event.params.who.toHex()])
  vnft.save()

  //Summary
  let summary = Summary.load("1")
  if (summary == null) {
    summary = new Summary("1")
    summary.gasSpentMinting = BigInt.fromI32(0)
    summary.gasSpentMining = BigInt.fromI32(0)
    summary.gasSpentFeeding = BigInt.fromI32(0)
    summary.gasSpentKilling = BigInt.fromI32(0)
  }
  summary.gasSpentMining = summary.gasSpentMining + event.transaction.gasUsed
  summary.save()
}

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

export function handleVnftConsumed(event: VnftConsumed): void {

    //Summary
    let summary = Summary.load("1")
    if (summary == null) {
      summary = new Summary("1")
      summary.gasSpentMinting = BigInt.fromI32(0)
      summary.gasSpentMining = BigInt.fromI32(0)
      summary.gasSpentFeeding = BigInt.fromI32(0)
      summary.gasSpentKilling = BigInt.fromI32(0)
    }
    summary.gasSpentFeeding = summary.gasSpentFeeding + event.transaction.gasUsed
    summary.save()
}

export function handleVnftFatalized(event: VnftFatalized): void {

  //Player
  let player = Player.load(event.params.killer.toHex())
  if (player == null) {
    player = new Player(event.params.killer.toHex())
    player.vnftMinted = BigInt.fromI32(0)
    player.vnftKilled = BigInt.fromI32(0)
  }
  player.vnftKilled = player.vnftKilled + BigInt.fromI32(1)
  player.save()

  //Summary
  let summary = Summary.load("1")
  if (summary == null) {
    summary = new Summary("1")
    summary.gasSpentMinting = BigInt.fromI32(0)
    summary.gasSpentMining = BigInt.fromI32(0)
    summary.gasSpentFeeding = BigInt.fromI32(0)
    summary.gasSpentKilling = BigInt.fromI32(0)
  }
  summary.gasSpentKilling = summary.gasSpentKilling + event.transaction.gasUsed
  summary.save()
}

export function handleVnftMinted(event: VnftMinted): void {
  
  //Player
  let player = Player.load(event.transaction.from.toHex())
  if (player == null) {
    player = new Player(event.transaction.from.toHex())
    player.vnftMinted = BigInt.fromI32(0)
    player.vnftKilled = BigInt.fromI32(0)
  }
  player.vnftMinted = player.vnftMinted + BigInt.fromI32(1)
  player.save()

  //Summary
  let summary = Summary.load("1")
  if (summary == null) {
    summary = new Summary("1")
    summary.gasSpentMinting = BigInt.fromI32(0)
    summary.gasSpentMining = BigInt.fromI32(0)
    summary.gasSpentFeeding = BigInt.fromI32(0)
    summary.gasSpentKilling = BigInt.fromI32(0)
  }
  summary.gasSpentMinting = summary.gasSpentMinting + event.transaction.gasUsed
  summary.save()
}
