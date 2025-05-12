'use client';

import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';

// Dynamically import the ToastContainer from react-toastify
const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false, loading: () => null },
);

const ToastClient: React.FC = () => {
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      )}
    </>
  );
};

export default ToastClient;
