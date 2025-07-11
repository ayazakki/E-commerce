import React from 'react'
import Style from "./Footer.module.css"

export default function Footer() {
  return <>
    <div className='bg-neutral-100 dark:bg-neutral-500/20 mt-16 py-8 px-9'>
      <h4 className='text-2xl text-gray-600 dark:text-gray-300'>Get the FreshCart app</h4>
      <p className='text-gray-500 my-3 dark:text-gray-400'>We will send you a link, open it on your phone to download the app.</p>
      <div className="mb-6 flex items-center justify-center flex-col sm:flex-row">
        <input type="email" id="email" class="focus:border-gray-200 focus:ring-gray-200 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-50 dark:placeholder-gray-400 dark:text-white " placeholder="Email..."  />
      <button type="button" class=" mt-4 sm:mt-0 block me-auto ms-0 sm:ms-4 text-emerald-600 dark:text-white px-1.5 border-emerald-600 border-2 bg-white-600 hover:bg-emerald-700 hover:text-white cursor-pointer transition-colors duration-200 font-medium rounded-lg text-sm w-40 py-2 sm:me-2  dark:bg-green-600 dark:hover:bg-green-600">Share App Link</button>
      </div>
      <hr className='text-neutral-300 mb-5' />
      <div className="flex  justify-between flex-col md:flex-row">
      <div className='mb-5 md:mb-0'>
      <span className='text-neutral-600 me-3 dark:text-gray-400'>Payment partners:</span>
      <i className="fa-brands fa-amazon-pay me-2 hover:text-emerald-700 transition-colors duration-300"></i>
      <i className="fa-brands fa-paypal me-2 hover:text-emerald-700 transition-colors duration-300"></i>
      <i className="fa-brands fa-cc-mastercard me-2 hover:text-emerald-700 transition-colors duration-300"></i>
      </div>
      <div className='flex sm:items-center flex-col sm:flex-row'>
        <span className='text-neutral-600 me-3 mb-4 sm:mb-0 dark:text-gray-400'>Get deliveries with FreshCard:</span>
        <div>
          <button className='text-[10px] me-3 py-1.5 px-2.5 cursor-pointer bg-gray-800 text-white border-2 border-gray-800 rounded-lg'> <i className="fa-brands fa-apple fa-2xl me-1"></i>App Store</button>
        <button className='text-[10px] me-3 py-1.5 px-2.5 cursor-pointer bg-gray-800 text-white border-2 border-gray-800 rounded-lg'> <i class="fa-brands fa-google-play"></i>Google play</button>
        </div>
      </div>
      </div>
    </div>

   
  </>
  
}
