
import React, { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import Terminal from '@/components/Terminal';
import ExampleSelector, { EXAMPLES, Example } from '@/components/ExampleSelector';
import { CodeExecutionService } from '@/components/PythonExecutionService';
import InputDialog from '@/components/InputDialog';
import Navbar from '@/components/Navbar';
import ConsoleToolbar from '@/components/ConsoleToolbar';
import CodeEditorHelp from '@/components/CodeEditorHelp';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [code, setCode] = useState<string>(EXAMPLES[0].code);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [needsInput, setNeedsInput] = useState<boolean>(false);
  const [codeToRun, setCodeToRun] = useState<string>('');
  const [successfulRun, setSuccessfulRun] = useState<boolean>(false);
  const { toast } = useToast();

  const handleExampleSelect = (example: Example) => {
    setCode(example.code);
    toast({
      title: `Loaded: ${example.name}`,
      description: example.description,
    });
  };

  const handleRunCode = async (code: string) => {
    setIsRunning(true);
    setOutput('');
    
    // Check if the code uses input()
    if (code.includes('input(')) {
      setCodeToRun(code);
      setNeedsInput(true);
    } else {
      try {
        const result = await CodeExecutionService.executeCode(code);
        setOutput(result.output);
        
        if (result.success) {
          setSuccessfulRun(true);
          setTimeout(() => setSuccessfulRun(false), 2000);
        } else if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error running code:", error);
        toast({
          title: "Error",
          description: "Failed to run the code",
          variant: "destructive"
        });
      }
    }
    
    setIsRunning(false);
  };

  const handleInputSubmit = async (input: string) => {
    if (!codeToRun) return;
    
    setIsRunning(true);
    try {
      const result = await CodeExecutionService.executeCode(codeToRun, input);
      setOutput(result.output);
      
      if (result.success) {
        setSuccessfulRun(true);
        setTimeout(() => setSuccessfulRun(false), 2000);
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error running code with input:", error);
      toast({
        title: "Error",
        description: "Failed to run the code",
        variant: "destructive"
      });
    }
    setIsRunning(false);
  };

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Code Playground</h1>
            <CodeEditorHelp />
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Write, run and experiment with code. Select an example to get started or write your own code!
            </p>
          </div>
          
          <ExampleSelector onSelect={handleExampleSelect} />
          
          <div className="flex-1 flex flex-col">
            <CodeEditor 
              initialCode={code} 
              onRun={handleRunCode} 
              showTerminal={showTerminal} 
              toggleTerminal={toggleTerminal} 
              isRunning={isRunning}
              successfulRun={successfulRun}
            />
            
            <Terminal 
              output={output} 
              isVisible={showTerminal} 
              isWaiting={isRunning} 
            />
            
            {showTerminal && output && (
              <ConsoleToolbar onClear={clearOutput} output={output} />
            )}
          </div>
          
          <InputDialog 
            open={needsInput} 
            onClose={() => setNeedsInput(false)} 
            onSubmit={handleInputSubmit} 
          />
        </div>
      </div>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            CodeLab - A fun coding editor for programmers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
