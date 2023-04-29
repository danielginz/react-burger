export const ErrorFallback = ({ error }) => (
    <div>
        <p>Something went wrong...</p>
        {error.message && <span>Here's the error: {error.message}</span>}
    </div>
);
export default ErrorFallback;