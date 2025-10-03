import { DeliveryMap } from "../DeliveryMap";

export default function DeliveryMapExample() {
  return (
    <div className="p-4">
      <DeliveryMap
        deliveryCount={5}
        onSetStartLocation={() => console.log("Setting start location")}
      />
    </div>
  );
}
