import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface RateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderNumber: string;
  onSubmit: (rating: number, review: string) => void;
}

export function RateOrderDialog({
  open,
  onOpenChange,
  orderNumber,
  onSubmit,
}: RateOrderDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review);
      setRating(0);
      setReview("");
      onOpenChange(false);
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setReview(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-rate-order">
        <DialogHeader>
          <DialogTitle>Rate Order #{orderNumber}</DialogTitle>
          <DialogDescription>
            Share your experience with this order
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="hover-elevate active-elevate-2 rounded-md p-1 transition-colors"
                  data-testid={`button-star-${star}`}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground" data-testid="text-rating-value">
                {rating} {rating === 1 ? "star" : "stars"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="review" className="text-sm font-medium">
              Review (optional)
            </label>
            <Textarea
              id="review"
              placeholder="Tell us about your experience..."
              value={review}
              onChange={handleReviewChange}
              className="resize-none"
              rows={4}
              data-testid="textarea-review"
            />
            <p className="text-xs text-muted-foreground text-right" data-testid="text-char-count">
              {review.length}/100
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-rating"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            data-testid="button-submit-rating"
          >
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
