import dynamic from 'next/dynamic';

const DynamicExampleAudit = dynamic(() => import('./pageContent'), { ssr: false });

export default DynamicExampleAudit;
