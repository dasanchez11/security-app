import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../CustomButton/CustomButton'

const AuthStateItem = ({ title, value }) => (
  <div className="text-sm">
    <p className="font-bold mb-2">{title}</p>
    <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">
      <code className="break-all">{value}</code>
    </pre>
  </div>
);

const AuthDebugger = () => {
  const authContext = useContext(AuthContext);
  const {
    token,
    expiresAt,
    userInfo
  } = authContext.authState;
  return (
    <section className="rounded-lg shadow bg-white p-4">
      <div className="mb-2">
        <AuthStateItem title="Token" value={token} />
      </div>
        <CustomButton className='p-8' name='Get New Token' onClick={authContext.getNewToken}/>
      <div className="mb-2">
        <AuthStateItem title="Expiry" value={expiresAt} />
      </div>
      <div className="mb-2">
        <AuthStateItem
          title="User Info"
          value={JSON.stringify(userInfo, null, 2)}
        />
      </div>
    </section>
  );
};

export default AuthDebugger;