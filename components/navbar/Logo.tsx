import React from 'react'
import Link from 'next/link';
import { Button } from '../ui/button';
import { AiOutlineCloud } from "react-icons/ai";

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <AiOutlineCloud className='w-6 h-6' />
      </Link>
    </Button>
  );
}

export default Logo