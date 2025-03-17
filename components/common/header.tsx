import NavLink from '@/components/common/nav-link';
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
export default function Header() { 
    const isLoggedIn = false;
    return  <nav className="container flex flex-row justify-between items-center py-2 lg:px-7 mx-auto">
        <div className='flex items-center space-x-2 lg:space-x-4 lg:flex-1'>
            <NavLink href="/" className='flex  items-center gap-1 lg:gap-2 shrink-0'>
                <FileText className='w-5 h-5 lg:w-8 lg:h-8 text-grey-900 hover:rotate-12 transform transition duration-200 ease-in-out'/>
                <span className='text-lg lg:text-2xl font-bold'>Summaire</span>
            </NavLink>
        </div>
        <div className='flex gap-4 lg:gap-12 lg:flex-1 lg:justify-center space-x-4 lg:space-x-6'>
            <NavLink href="/#pricing" >Pricing</NavLink>
            {isLoggedIn ? <NavLink href="/dashboard" >Your Summaries</NavLink> : null}
        </div>
        <div className='flex lg:justify-end lg:flex-1 lg:space-x-4'>
            {/*             
            if(isLoggedIn){
                <div>    
                    <Link href="/upload">Upload a PDF</Link>
                </div>
            }else{
                <div>
                    <Link href="/signin">Sign-up</Link>
                </div>
            } */}
            {isLoggedIn ?(
                <div>
                    <NavLink href="/upload">Upload a PDF</NavLink>
                    <div>Pro</div>
                    <Button>User</Button>
                </div>):
                <div>
                    <NavLink href="/signin">Sign-in</NavLink>
                </div> 
            }
                
        </div>
    </nav>
}