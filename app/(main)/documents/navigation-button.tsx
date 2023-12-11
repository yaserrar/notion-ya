"use client";

import { Button } from "@/components/ui/button";
import { NavigationContext } from "@/lib/providers/context-provider";
import { Menu } from "lucide-react";
import { useContext } from "react";

const NavigationButton = () => {
  const { toggleShowNavigation } = useContext(NavigationContext);

  return (
    <Button
      variant="secondary"
      size="icon"
      className="md:hidden"
      onClick={() => toggleShowNavigation()}
    >
      <Menu size={18} />
    </Button>
  );
};

export default NavigationButton;
