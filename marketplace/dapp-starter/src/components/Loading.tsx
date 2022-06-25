import React from 'react';


const Loading = () => {
  return (
    <main>
      <section>
        <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
          <div className='text-xl text-gray-400 animate-pulse'>
            Loading...
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;
