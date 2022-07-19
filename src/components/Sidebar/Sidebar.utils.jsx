import { AiOutlineDashboard, AiOutlinePieChart,AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineIdentification,HiOutlineUsers } from 'react-icons/hi'
import { BsKanban } from 'react-icons/bs'



const navItems = [
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: AiOutlineDashboard,
      allowedRoles: ['user','admin']
    },
    {
      label: 'Inventory',
      path: 'inventory',
      icon: AiOutlinePieChart,
      allowedRoles: ['admin']
    },
    {
      label: 'Account',
      path: 'account',
      icon: HiOutlineIdentification,
      allowedRoles: ['user','admin'] 
    },
    {
      label: 'Settings',
      path: 'settings',
      icon: AiOutlineSetting,
      allowedRoles: ['user','admin']
    },
    {
      label: 'Users',
      path: 'users',
      icon: HiOutlineUsers,
      allowedRoles: ['admin']
    },
    {
      label: 'Kanban',
      path: 'Kanban',
      icon: BsKanban,
      allowedRoles: ['admin','user']
    }
  ];

  export default navItems