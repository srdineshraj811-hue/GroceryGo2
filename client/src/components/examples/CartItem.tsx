import { CartItem } from "../CartItem";

export default function CartItemExample() {
  return (
    <div className="p-4 max-w-md">
      <CartItem
        id="1"
        name="Fresh Strawberries"
        price={4.99}
        quantity={2}
        image="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop"
        unit="lb"
        onIncrease={() => console.log("Increase")}
        onDecrease={() => console.log("Decrease")}
        onRemove={() => console.log("Remove")}
      />
    </div>
  );
}
