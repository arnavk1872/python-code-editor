// This service calls the backend API to execute code

export interface ExecutionResult {
  output: string;
  error: string | null;
  success: boolean;
}

export class CodeExecutionService {
  private static readonly API_URL = 'http://localhost:5000/api/execute';

  /**
   * Executes code by sending it to the backend API
   * @param code The code to execute
   * @param input Optional user input for the code
   * @returns Promise with execution result
   */
  static async executeCode(code: string, input?: string): Promise<ExecutionResult> {
    console.log("Sending code to backend for execution:", code);
    
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          input: input || ''
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const result = await response.json();
      return {
        output: result.output || '',
        error: result.error,
        success: result.success
      };
    } catch (err) {
      console.error("Error executing code:", err);
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Failed to connect to the code execution service',
        success: false
      };
    }
  }
}

// Export the class with the original name for backward compatibility
export const PythonExecutionService = CodeExecutionService;
