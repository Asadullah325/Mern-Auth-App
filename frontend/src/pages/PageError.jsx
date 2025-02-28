import React from 'react'

const PageError = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-200">
        <h1 className="text-9xl text-center font-bold mb-4 text-red-500">404</h1>
        <h1 className="text-3xl text-center font-bold mb-4 text-red-500">Page Not Found</h1>
        <p className="text-gray-600 text-center">Sorry, the page you are looking for could not be found.</p>
    </div>
    </>
  )
}

export default PageError