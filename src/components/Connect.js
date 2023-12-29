'use client'

import Link from 'next/link';
import { useState } from 'react';


function Connect() {
    const [iconBtn, setIconBtn] = useState(true);

    return (<>
        {iconBtn ?
            <IconOn icon={{ iconBtn, setIconBtn }} /> :
            <IconOff icon={{ iconBtn, setIconBtn }} />
        }
    </>
    )
}

export default Connect;


function IconOn({ icon }) {
    return (
        <div
            className='p-2 flex justiry-center text-slate-500 border-b border-slate-500  hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
            
            '
            onClick={() => icon.setIconBtn(!icon.iconBtn)}
        >
            <p>C O N T A C T</p>
        </div>
    )
}

function IconOff({ icon }) {
    return (
        <div
            className='flex justify-between items-center
            
            '
        >
            <div
                className='p-2 mx-10 flex text-slate-500 border-b border-slate-500  hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
                sm:mx-5
                '
                onClick={() => icon.setIconBtn(!icon.iconBtn)}
            >
                <p>C L O S E</p>
            </div>
            <div
                className='p-2 mx-10 text-slate-500 border-b border-slate-500  hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
                sm:mx-5
                '
            >
                <a href="mailto:spaceBacteria@gmail.com">spaceBacteria@gmail.com</a>
            </div>
            <Link href={'https://google.com'} target='blank'>
                <div
                    className='p-2 mx-10 text-slate-500 border-b border-slate-500  hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
                    sm:mx-5
                    '
                >
                    <p>W E B</p>
                </div>
            </Link>
        </div>
    )
}
