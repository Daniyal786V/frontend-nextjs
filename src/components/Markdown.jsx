import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, RefreshCw, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import axios from 'axios';

const MarkdownRenderer2 = ({ tt }) => {
  const refresh = async () => {
    // Refresh logic can be implemented here
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tt).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Markdown content has been copied to the clipboard."
      });
    }).catch((error) => {
      console.error("Failed to copy: ", error);
    });
  };

  return (
    <div className="w-full h-full overflow-hidden bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          table: ({ node, ...props }) => (
            <table className="min-w-full divide-y divide-gray-800 border border-gray-300 dark:border-gray-700" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-6 py-3 bg-gray-900 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border border-gray-300 dark:border-gray-700" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-500 dark:text-blue-400 underline" {...props} />
          ),
        }}
      >
        {tt}
      </ReactMarkdown>
      <div className='mt-2 flex items-center gap-2 text-gray-700 dark:text-gray-300'>
        <RefreshCw onClick={refresh} className='w-4 cursor-pointer opacity-80 hover:text-blue-700 dark:hover:text-blue-400' />
        <ThumbsDownIcon className='w-4 cursor-pointer opacity-80 hover:text-red-700 dark:hover:text-red-400' />
        <ThumbsUpIcon className='w-4 cursor-pointer opacity-80 hover:text-green-700 dark:hover:text-green-400' />
        <Copy onClick={copyToClipboard} className='w-4 cursor-pointer opacity-80 hover:text-blue-700 dark:hover:text-blue-400' />
      </div>
    </div>
  );
};

export default MarkdownRenderer2;
