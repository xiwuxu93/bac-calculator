import dynamic from 'next/dynamic';

const MarkdownContent = dynamic(() => import('./MarkdownContentComponent'), {
  ssr: true,
});

export default MarkdownContent;
