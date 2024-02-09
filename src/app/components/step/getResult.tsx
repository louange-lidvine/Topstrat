import React, { useState } from 'react';

interface PromptGetProps {
  title: string;
}

const PromptGet: React.FC<PromptGetProps> = ({ title }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const getStaticPrompts = (category: string): string[] => {
    switch (category.toLowerCase()) {
      case 'vision':
        return [
          'Vision Prompt 1: Longer Version with More Details about the Vision of the Project',
          'Vision Prompt 2: Another Longer Version Explaining the Vision in Depth',
          'Vision Prompt 3: Elaborate Description of the Vision and Its Significance',
        ];
      case 'mission':
        return [
          'Mission Prompt 1: Elaborate Description of the Mission Statement and Its Importance',
          'Mission Prompt 2: Detailed Explanation of the Mission Goals and Objectives',
          'Mission Prompt 3: In-Depth Overview of the Mission and Its Impact',
        ];
      case 'log frames':
        return [
          'Logframe Prompt 1: Comprehensive Logframe Details for Effective Project Management',
          'Logframe Prompt 2: In-Depth Explanation of Logical Framework and Its Components',
          'Logframe Prompt 3: Detailed Logframe Analysis for Project Success',
        ];
      case 'goals':
        return [
          'Goals Prompt 1: Clear and Specific Project Goals for Achievement',
          'Goals Prompt 2: Elaboration on the Strategic Goals and Their Alignment',
          'Goals Prompt 3: In-Depth Overview of the Project Goals and Their Significance',
        ];
      case 'objectives':
        return [
          'Objectives Prompt 1: Detailed and Measurable Objectives for Project Success',
          'Objectives Prompt 2: Explanation of Aligned Objectives with Organizational Mission',
          'Objectives Prompt 3: In-Depth Overview of Project Objectives and Their Impact',
        ];
      case 'implementation strategies':
        return [
          'Implementation Strategies Prompt 1: Comprehensive Plans for Project Execution',
          'Implementation Strategies Prompt 2: Detailed Strategies for Achieving Organizational Goals',
          'Implementation Strategies Prompt 3: In-Depth Overview of Project Implementation Strategies',
        ];
      default:
        return [];
    }
  };
  
  const prompts = getStaticPrompts(title);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  const handleBackButtonClick = () => {
    setSelectedPrompt(null);
  };

  return (
    <div>
      <h1 className='text-xl font-bold text-center text-blue-default'>{title} Prompts</h1>
      {selectedPrompt ? (
        <div>
          <h2 className='text-md font-md mt-4'>Selected Prompt: {selectedPrompt}</h2>
          <button onClick={handleBackButtonClick} className='text-blue-default font-bold mt-4'>
            Back
          </button>
        </div>
      ) : (
        <ul>
          {prompts.map((prompt, index) => (
            <li key={index} onClick={() => handlePromptClick(prompt)} style={{ cursor: 'pointer' }} className='w-100 border h-20 m-5 rounded-md'>
              {`${prompt.slice(0, 70)}...`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PromptGet;
