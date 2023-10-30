import dynamic from 'next/dynamic';

const DynamicExampleAudit = dynamic(() => import('./exampleAuditContent'), { ssr: false });

export default DynamicExampleAudit;
