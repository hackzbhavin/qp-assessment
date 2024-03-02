export function generateOrderId() {
  const randomNumber = Math.floor(Math.random() * 1000); 
  return "ORDER_"  + randomNumber.toString()
}
