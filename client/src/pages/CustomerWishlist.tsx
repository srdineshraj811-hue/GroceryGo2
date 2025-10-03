import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { useState } from "react";

const mockWishlistItems = [
  { id: "1", name: "Butter Indian [Salted] Amul – 200 gms", price: 4.99, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop", unit: "200 gms", stock: 15 },
  { id: "2", name: "Cheese Spread Spicy Garlic", price: 5.49, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop", unit: "250 gms", stock: 8 },
  { id: "3", name: "Desi Besan Laxmi 4 lbs", price: 8.99, image: "https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400&h=400&fit=crop", unit: "4 lbs", stock: 20 },
];

export default function CustomerWishlist() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: string, quantity: number) => {
    console.log("Add to cart:", id, quantity);
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b p-4">
        <h1 className="font-display font-bold text-2xl" data-testid="text-wishlist-title">
          Wishlist
        </h1>
        {wishlistItems.length > 0 && (
          <p className="text-sm text-muted-foreground">{wishlistItems.length} items</p>
        )}
      </div>

      {wishlistItems.length > 0 ? (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {wishlistItems.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleRemoveFromWishlist}
                isInWishlist={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4" data-testid="text-empty-wishlist">
            Your wishlist is empty
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Add items to your wishlist by tapping the heart icon on products
          </p>
        </div>
      )}
    </div>
  );
}
