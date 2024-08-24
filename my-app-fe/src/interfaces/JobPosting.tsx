export default interface jobPosting {
  orderId: string,
  foodPostingId: string,
  donorId: string,
  donorLocation: string,
  destinationId: string,
  orderAssigned: boolean,
  numberOfMeals: number,
  pointsEarned: number,
  tripDuration: number,
  pickupInstructions: string,
  timeToExpiry: number
}



export const emptyJobPosting = () => ({
  orderId: "",
  foodPostingId: "",
  donorId: "",
  donorLocation: "",
  destinationId: "",
  orderAssigned: false,
  numberOfMeals: 0,
  pointsEarned: 0,
  tripDuration: 0,
  pickupInstructions: "",
  timeToExpiry: 0
})