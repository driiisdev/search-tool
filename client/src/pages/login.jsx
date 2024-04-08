import { useState } from 'react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      window.location.href = 'http://localhost:8000/api/v1/auth/facebook';
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default Login;
