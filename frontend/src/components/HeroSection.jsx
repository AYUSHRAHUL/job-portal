import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='text-center w-full overflow-x-hidden px-4'>
            <div className='flex flex-col gap-5 my-10 max-w-4xl mx-auto'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    India’s #1 Career Launchpad
                </span>
                <h1 className='text-3xl md:text-5xl font-bold'>
                    Discover, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-sm md:text-base'>
                    Empower your career journey with top-notch opportunities, curated listings, and lightning-fast hiring. <br />
                    All tailored to your preferences—right here.
                </p>
                <div className='flex w-full max-w-md mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-2'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
