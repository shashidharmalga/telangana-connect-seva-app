
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "hi", name: "Hindi", native: "हिंदी" }
  ];

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    // In a real app, this would trigger language change logic
    console.log(`Language changed to: ${language}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          {currentLanguage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.name)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <span className="font-medium">{lang.native}</span>
            <span className="text-gray-500 ml-2">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
