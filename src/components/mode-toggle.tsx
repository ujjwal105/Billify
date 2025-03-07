import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Theme, useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === Theme.DARK;

  const toggleTheme = () => {
    setTheme(isDarkTheme ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      {isDarkTheme ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
