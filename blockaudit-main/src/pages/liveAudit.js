import dynamic from 'next/dynamic';

const DynamicExampleAudit = dynamic(() => import('./liveAuditContent'), { ssr: false });

export default DynamicExampleAudit;
