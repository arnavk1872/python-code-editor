
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Save, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode?: string;
  onRun: (code: string) => void;
  showTerminal: boolean;
  toggleTerminal: () => void;
  isRunning: boolean;
  successfulRun: boolean;
}

declare global {
  interface Window {
    CodeMirror: {
      (element: HTMLElement, options: Record<string, unknown>): CodeMirrorEditor;
    };
  }
}

interface CodeMirrorEditor {
  getValue(): string;
  on(event: string, callback: () => void): void;
  somethingSelected(): boolean;
  indentSelection(mode: string): void;
  replaceSelection(text: string, mode?: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode = '# Write your code here!\nprint("Hello, World!")', 
  onRun, 
  showTerminal, 
  toggleTerminal, 
  isRunning,
  successfulRun
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const cmRef = useRef<CodeMirrorEditor | null>(null);
  const { toast } = useToast();
  
  // Initialize CodeMirror
  useEffect(() => {
    if (editorRef.current && window.CodeMirror) {
      const codeMirror = window.CodeMirror(editorRef.current, {
        value: initialCode,
        mode: 'python',  // Keep python mode for syntax highlighting
        theme: 'default',
        lineNumbers: true,
        indentUnit: 4,
        smartIndent: true,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: {
          'Tab': function(cm: CodeMirrorEditor) {
            if (cm.somethingSelected()) {
              cm.indentSelection('add');
            } else {
              cm.replaceSelection('    ', 'end');
            }
          }
        }
      });

      cmRef.current = codeMirror;
      
      // Add custom styling
      codeMirror.on("change", () => {
        // Simple auto-save functionality could be added here
      });
    }
    
    return () => {
      if (cmRef.current) {
        // Cleanup if needed
      }
    };
  }, [initialCode]);

  const handleRunCode = () => {
    if (cmRef.current) {
      const code = cmRef.current.getValue();
      onRun(code);
      
      // If terminal is not showing, show it
      if (!showTerminal) {
        toggleTerminal();
      }
    }
  };

  const handleSaveCode = () => {
    if (cmRef.current) {
      const code = cmRef.current.getValue();
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'code.py';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Code Saved!",
        description: "Your code has been downloaded as a file.",
      });
    }
  };

  return (
    <div className={cn(
      "border rounded-t-lg overflow-hidden flex flex-col flex-1 transition-all",
      successfulRun ? "animate-pulse-success" : ""
    )}>
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-sm font-medium">Code Editor</span>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTerminal}
            className="flex items-center gap-1 bg-white hover:bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            <Terminal className="h-4 w-4" />
            <span>{showTerminal ? 'Hide' : 'Show'} Terminal</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSaveCode}
            className="flex items-center gap-1 bg-white hover:bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
          <Button 
            onClick={handleRunCode} 
            disabled={isRunning}
            className="flex items-center gap-1 bg-codegreen hover:bg-green-600 text-white"
          >
            <Play className="h-4 w-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden" ref={editorRef} />
    </div>
  );
};

export default CodeEditor;
