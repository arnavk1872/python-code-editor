
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Example {
  id: string;
  name: string;
  description: string;
  code: string;
}

export const EXAMPLES: Example[] = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Your first program!',
    code: '# Your first program\nprint("Hello, World!")\n'
  },
  {
    id: 'variables',
    name: 'Variables',
    description: 'Learn how to use variables',
    code: '# Variables\nname = "Alex"\nage = 12\n\nprint("Hello, my name is " + name + "!")\nprint("I am " + str(age) + " years old.")\n'
  },
  {
    id: 'input-example',
    name: 'User Input',
    description: 'Get input from the user',
    code: '# Getting input from the user\nname = input("What\\\'s your name? ")\nprint("Hello, " + name + "! Nice to meet you!")\n'
  },
  {
    id: 'math',
    name: 'Math Operations',
    description: 'Basic math operations',
    code: '# Math operations\n\na = 5\nb = 3\n\nsum_result = a + b\ndiff_result = a - b\nmult_result = a * b\ndiv_result = a / b\n\nprint("Addition:", sum_result)\nprint("Subtraction:", diff_result)\nprint("Multiplication:", mult_result)\nprint("Division:", div_result)\n'
  },
  {
    id: 'conditionals',
    name: 'If Statements',
    description: 'Making decisions in code',
    code: '# If statements for decision making\n\nage = int(input("How old are you? "))\n\nif age < 13:\n    print("You\\\'re a kid!")\nelif age < 20:\n    print("You\\\'re a teenager!")\nelse:\n    print("You\\\'re an adult!")\n'
  },
  {
    id: 'loops',
    name: 'Loops',
    description: 'Repeat code with loops',
    code: '# Loops\n\n# For loop with a range\nprint("Counting from 1 to 5:")\nfor i in range(1, 6):\n    print(i)\n\n# While loop\nprint("\\nCountdown:")\ncountdown = 3\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\nprint("Blast off!")\n'
  },
  {
    id: 'lists',
    name: 'Lists',
    description: 'Working with collections',
    code: '# Working with lists\n\n# Create a list of fruits\nfruits = ["apple", "banana", "orange", "grape"]\n\n# Print the whole list\nprint("My fruit list:", fruits)\n\n# Access individual items\nprint("First fruit:", fruits[0])\nprint("Last fruit:", fruits[-1])\n\n# Add an item\nfruits.append("mango")\nprint("Added a fruit:", fruits)\n\n# Loop through the list\nprint("\\nAll my fruits:")\nfor fruit in fruits:\n    print("- " + fruit)\n'
  },
  {
    id: 'functions',
    name: 'Functions',
    description: 'Create reusable code blocks',
    code: '# Functions\n\n# Define a function to greet someone\ndef greet(name):\n    return "Hello, " + name + "!"\n\n# Define a function to calculate area of a rectangle\ndef calculate_area(length, width):\n    return length * width\n\n# Call the functions\nprint(greet("Alex"))\nprint(greet("Sam"))\n\nrectangle1_area = calculate_area(5, 10)\nprint("Area of rectangle:", rectangle1_area)\n'
  },
  {
    id: 'guessing-game',
    name: 'Number Guessing Game',
    description: 'Simple number guessing game',
    code: '# Number Guessing Game\nimport random\n\n# Generate a random number between 1 and 10\nsecret_number = random.randint(1, 10)\n\nprint("I\\\'m thinking of a number between 1 and 10.")\n\n# Give the player 3 tries\nfor attempt in range(3):\n    guess = int(input("Guess #" + str(attempt + 1) + ": "))\n    \n    if guess == secret_number:\n        print("You got it! The number was", secret_number)\n        break\n    elif guess < secret_number:\n        print("Too low!")\n    else:\n        print("Too high!")\nelse:  # This runs if the loop completes without a break\n    print("Game over! The number was", secret_number)\n'
  },
];

interface ExampleSelectorProps {
  onSelect: (example: Example) => void;
}

const ExampleSelector: React.FC<ExampleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="mb-4">
      <div className="mb-2">
        <label htmlFor="example-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Choose an example:
        </label>
        <Select onValueChange={(value) => {
          const example = EXAMPLES.find(ex => ex.id === value);
          if (example) onSelect(example);
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an example" />
          </SelectTrigger>
          <SelectContent>
            {EXAMPLES.map(example => (
              <SelectItem key={example.id} value={example.id}>
                {example.name} - {example.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExampleSelector;
