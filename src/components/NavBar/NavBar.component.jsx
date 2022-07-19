

import React from 'react';
import AvatarDropdown from '../AvatarDropdown/AvatarDropdown.component';
import { BsArrowRight } from 'react-icons/bs';

const SearchInput = () => (
    <div className="flex">
        <input
            className="py-2 px-4 border  border-gray-300 rounded-full focus:outline-none w-32 sm:w-64"
            placeholder="Search"
        />
        <button className="rounded-full bg-gradient px-4 ml-2 text-white flex items-center text-xs focus:outline-none shadow-lg">
            <span className='text-Main font-bold text-xl'>
                <BsArrowRight />
            </span>
        </button>
    </div>
);

const Navbar = () => {
    return (
        <nav className="flex justify-between px-4">
            <div className="">
                <SearchInput />
            </div>
            <div className="">
                <AvatarDropdown />
            </div>
        </nav>
    );
};

export default Navbar;