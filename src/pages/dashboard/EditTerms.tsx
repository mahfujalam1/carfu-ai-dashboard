import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bold, Italic, Underline, Link as LinkIcon, List, ListOrdered, Type, Save } from 'lucide-react';

const EditTermsPage = () => {
  const navigate = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(`
    <h2>Terms & Conditions</h2>
    <p>By using our services, you agree to these terms.</p>
  `);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = () => {
    if (editorRef.current) {
      console.log('Saving terms:', editorRef.current.innerHTML);
    }
    navigate('/terms');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Terms & Conditions</h2>
        <p className="text-gray-500 text-sm">Manage Terms & Conditions content</p>
      </div>

      <div className="bg-[#1A1C1E] rounded-lg border border-gray-800/50 shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
        {/* Editor Header */}
        <div className="p-4 flex justify-between items-center bg-[#121417]/50 border-b border-gray-800/50">
          <h3 className="text-sm font-semibold text-gray-300">Terms & Conditions Content</h3>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 rounded-lg flex items-center gap-2 text-xs"
          >
            <Save className="w-4 h-4" />
            Save Content
          </Button>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2 flex items-center gap-1 border-b border-gray-800/30 bg-[#121417]/30">
          <div className="flex items-center gap-1 px-2 border-r border-gray-800/50 mr-2">
            <span className="text-xs text-gray-400 mr-2">Normal</span>
            <div className="w-px h-4 bg-gray-800" />
          </div>

          <button onClick={() => execCommand('bold')} className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
            <Bold className="w-4 h-4" />
          </button>
          <button onClick={() => execCommand('italic')} className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
            <Italic className="w-4 h-4" />
          </button>
          <button onClick={() => execCommand('underline')} className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
            <Underline className="w-4 h-4" />
          </button>
          <button onClick={() => execCommand('createLink', prompt('URL:') || '')} className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
            <LinkIcon className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-gray-800 mx-2" />

          <button onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
            <List className="w-4 h-4" />
          </button>
          <button onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-gray-800 mx-2" />

          <button onClick={() => execCommand('removeFormat')} className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
            <Type className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div
            ref={editorRef}
            contentEditable
            className="w-full h-full min-h-[400px] outline-none text-gray-300 leading-relaxed font-sans prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTermsPage;
