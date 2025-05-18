
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ConsoleToolbarProps {
  onClear: () => void;
  output: string;
}

const ConsoleToolbar: React.FC<ConsoleToolbarProps> = ({ onClear, output }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 border-t border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      <div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {output ? `${output.split('\n').length} lines` : '0 lines'}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        disabled={!output}
        className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Trash className="h-4 w-4 mr-1" />
        <span>Clear</span>
      </Button>
    </div>
  );
};

export default ConsoleToolbar;
