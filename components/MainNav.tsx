"use client"
import { User } from '@/hooks/useCurrentUser';
import { usePathname,useRouter } from 'next/navigation';
import {useEffect,useState} from 'react';
import { Input } from './ui/input';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import {Smile,Package,Star,LogOut} from "lucide-react"

type MainNavProps = {
    user:User
};

const MainNav:React.FC<MainNavProps> = ({user}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const router=useRouter()
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
     const logout = () => {
      localStorage.removeItem('token');
    };
    const handleLogout=()=>{
      logout();
      window.location.href = '/auth';
    }
    const handleProfle=()=>{
      if(pathname.includes(`/${user?.id}/${user?.displayName}`)) return;
      else router.push(`/${user?.id}/${user?.displayName}`)
    }
    return (
        <nav className='hidden md:flex mx-6  justify-between items-center space-x-4 lg:space-x-6 w-full'> 
            <div className='hidden lg:block w-full'>
              <Input type='search' placeholder='Search' />
            </div>
            <Menubar className='w-full'>
            <MenubarMenu>
              <MenubarTrigger className='hover:cursor-pointer hover:text-red-600 hover:underline text-lg'>{user.displayName} &apos;s Profile</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className='hover:underline cursor-pointer' onClick={handleProfle}><Smile className='mr-2'/> Manage My Account</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer'><Star className='mr-2'/>My Reviews</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer'><Package className='mr-2'/>My Orders</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer' onClick={handleLogout}><LogOut className='mr-2'/>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </nav>
    )
}
export default MainNav;