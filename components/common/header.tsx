import Link from 'next/link';
import { FileText } from 'lucide-react';
export default function Header() {      
    return  <nav className="container flex flex-row justify-between items-center py-2 lg:px-7 mx-auto">
        <div className='flex items-center space-x-2 lg:space-x-4'>
            <Link href="/" className='flex  items-center gap-1 lg:gap-2 shrink-0'>
                <FileText className='w-5 h-5 lg:w-8 lg:h-8 text-grey-900 hover:rotate-12 transform transition duration-200 ease-in-out'/>
                <span className='text-lg lg:text-2xl font-bold'>Summaire</span>
            </Link>
        </div>
        <div>
            <Link href="/#pricing" >Pricing</Link>
        </div>
        <div>
            <Link href="/signin">Sign-in</Link>
        </div>
    </nav>
}