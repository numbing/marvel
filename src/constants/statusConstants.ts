// Redux async status constants
export const STATUS_IDLE = 'idle' as const;
export const STATUS_LOADING = 'loading' as const;
export const STATUS_SUCCEEDED = 'succeeded' as const;
export const STATUS_FAILED = 'failed' as const;

// Type for status values
export type AsyncStatus = typeof STATUS_IDLE | typeof STATUS_LOADING | typeof STATUS_SUCCEEDED | typeof STATUS_FAILED;
