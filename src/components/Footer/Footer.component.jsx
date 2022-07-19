import React, { useState } from 'react';
import AuthDebugger from '../AuthDebugger/AuthDebugger.component';
import CustomButton from '../CustomButton/CustomButton'

const Footer = () => {
  const [showAuthDebugger, setShowAuthDebugger] = useState(
    false
  );
  return (
    <footer className="p-6">
      <div className="ml-2">
        <div onClick={() =>
              setShowAuthDebugger(!showAuthDebugger)
            }>
          <CustomButton
            name="Credentials"
          />

        </div>
      </div>
      <div className="mt-4">
        {showAuthDebugger && <AuthDebugger />}
      </div>
    </footer>
  );
};

export default Footer;