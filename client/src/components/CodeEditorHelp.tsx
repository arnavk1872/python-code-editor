
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const CodeEditorHelp: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
          Help & Tips
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <h3 className="font-bold text-lg mb-2">Coding Tips</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm">How to Start</h4>
            <p className="text-sm text-gray-600">
              Select an example from the dropdown menu to see different types of programs you can write.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm">Editor Shortcuts</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
              <li>Press <kbd className="bg-gray-100 px-1 rounded">Tab</kbd> to indent your code</li>
              <li>Press <kbd className="bg-gray-100 px-1 rounded">Shift+Tab</kbd> to unindent</li>
              <li>Select multiple lines to indent/unindent them all at once</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm">Coding Tips</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
              <li>Indentation helps make your code readable</li>
              <li>Use <code>print()</code> to show output</li>
              <li>Use <code>input()</code> to get user input</li>
              <li>Remember to use proper syntax for control structures</li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CodeEditorHelp;
