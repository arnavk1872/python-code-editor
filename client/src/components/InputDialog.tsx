
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InputDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: string) => void;
}

const InputDialog: React.FC<InputDialogProps> = ({ open, onClose, onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    onSubmit(input);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Program Input</DialogTitle>
          <DialogDescription>
            Your program is asking for input. Enter the values below.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            placeholder="Enter input values here (one per line if multiple values needed)"
            className="resize-none font-mono h-32"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Input</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
