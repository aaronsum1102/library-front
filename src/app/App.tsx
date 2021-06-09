import React from 'react';

import { useAuth } from './hooks';

export const App: React.FC = () => {
  const { user, sendSignInLink, isSignInWithEmailLink, signIn, signOut } = useAuth();

  const email = window.localStorage.getItem('emailForSignIn');

  if (isSignInWithEmailLink) {
    if (email) {
      signIn(email);
      return (
        <div>
          <p>Verifying...</p>
        </div>
      );
    }
  }

  if (!isSignInWithEmailLink && !user) {
    return (
      <div>
        <p>Continue with email</p>
        <button onClick={() => sendSignInLink('sumsx03@gmail.com')}>singn in</button>
      </div>
    );
  }

  return (
    <div>
      <p>Hello {user?.email}</p>
      <button onClick={() => signOut()}>singn out</button>
    </div>
  );
};
