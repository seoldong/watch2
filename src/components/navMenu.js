'use client'

import CurrentTime from '../components/CurrentTime';
import { useState } from 'react';
import SignState from './signState';
import { ShowMenuContext } from '../lib/showMenuContext';


function NavMenu() {
    const [showMenu, setShowMenu] = useState(true);

    return (
        <>
            <div
                className={`h-full w-full flex justify-between items-center
                2xl:text-2xl
                xl:text-2xl
                lg:text-2xl
                md:text-xl
                ${showMenu ? `sm:hidden` : `sm:flex` } sm:text-3xl sm:h-screen sm:w-screen sm:absolute sm:justify-center sm:items-center sm:flex-col sm:top-0 sm:left-0 sm:bg-slate-400 sm:text-white`
                }
            >

                <div
                    className='flex items-center
                    sm:flex-col-reverse
                    '
                >
                    <a
                        className={`ml-20 mr-10 p-2 border-b border-gray-700 hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
                  md:ml-10 md:mr-5
                  sm:border-white sm:m-10
                  `
                        }
                        href={'/'}
                        onClick={() => setShowMenu(false)}
                    >
                        <p> H O M E </p>
                    </a>
                    <div
                        className='p-2 border-b border-gray-700 hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
                  sm:border-white sm:m-10
                  '
                    >
                        <CurrentTime />
                    </div>
                </div>
                <ShowMenuContext.Provider value={{ showMenu, setShowMenu }}>
                    <SignState />
                </ShowMenuContext.Provider>

                <div
                    className='hidden p-2 border-b border-gray-700 hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
                sm:border-white sm:m-10 sm:flex sm:justify-end'
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {showMenu ? <p>M E N U</p> : <p>C L O S E</p>}
                </div>

            </div>
            <div
                className='hidden
                sm:h-full sm:w-full sm:flex sm:justify-center sm:items-center
                '
            >
                <button
                    className='p-2 text-2xl border-b border-gray-700 hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer'
                    onClick={() => setShowMenu(false)}
                >M E N U</button>
            </div>

        </>
    )
}

export default NavMenu