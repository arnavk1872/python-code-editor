
import React from 'react';
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <div className="bg-codepurple text-white py-3 px-4 md:px-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="h-7 w-7" />
          <h1 className="text-xl font-bold">CodeKids</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm hidden md:inline-block">Python Coding Editor for Young Programmers</span>
          <a href="https://www.python.org/doc/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20">
              Python Docs
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
