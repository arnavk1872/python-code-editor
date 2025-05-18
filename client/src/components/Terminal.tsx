
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  output: string;
  isVisible: boolean;
  isWaiting: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ output, isVisible, isWaiting }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-300 bg-gray-100 dark:bg-gray-900 dark:border-gray-700">
      <div className="px-4 py-2 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <span className="font-medium text-sm">Terminal Output</span>
        {isWaiting && (
          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
            <span className="h-2 w-2 bg-codeyellow rounded-full mr-2 animate-pulse"></span>
            Running...
          </span>
        )}
      </div>
      <div 
        ref={terminalRef}
        className={cn(
          "font-mono text-sm p-4 whitespace-pre-wrap h-64 overflow-y-auto",
          "transition-all duration-300 bg-white dark:bg-gray-950",
          isWaiting ? "opacity-50" : "opacity-100"
        )}
      >
        {output || (
          <span className="text-gray-400 italic">
            Your program output will appear here after running the code.
          </span>
        )}
      </div>
    </div>
  );
};

export default Terminal;
