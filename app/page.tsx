import React from 'react'
import CreateProperty from '../app/reservation/pay/page'
import { SignedOut, SignedIn, SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';


function HomePage() {
  return (
    <div>
      <h1 className='text-3xl'>Luxury Short Term Rentals Apartments</h1>

      <SignedOut>
      <p className='py-20'>To pay for your reservation you must be logged in</p>
      </SignedOut>

      <SignedIn>
        <CreateProperty />
      </SignedIn>
      
    </div>
    
  )
}

export default HomePage
