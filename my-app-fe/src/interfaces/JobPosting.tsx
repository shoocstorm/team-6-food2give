export default interface jobPosting {
  orderId: string,
  foodPostingId: string,
  donorId: string,
  donorLocation: string,
  destinationId: string,
  orderAssigned: boolean,
  numberOfMeals: number,
  pointsEarned: number,
  tripDuration: number
  pickupInstructions: string
  timeToExpiry: number
}