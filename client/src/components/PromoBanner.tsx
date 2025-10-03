import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
  title: string;
  description: string;
  image: string;
  ctaText: string;
}

export function PromoBanner({ title, description, image, ctaText }: PromoBannerProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer" data-testid="card-promo-banner">
      <div className="relative h-40 md:h-48 bg-gradient-to-r from-primary to-chart-1">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2" data-testid="text-banner-title">
            {title}
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-4 max-w-md" data-testid="text-banner-description">
            {description}
          </p>
          <Button
            variant="outline"
            className="w-fit bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-banner-cta"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
