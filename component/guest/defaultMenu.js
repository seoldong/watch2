'use client'

import { useState } from 'react';
import { getSetTime } from '../../logic/getTime';
import GuestSleep from './sleep';
import GuestBreakfast from './breakfast';
import GuestLunch from './lunch';
import GuestDinner from './dinner';
import GuestTomorrowMid from './tomorrowMid';

export default function DefaultMenu() {

  let menuList = [
    // { name: 'tomorrowMid', timeSettings: getSetTime(1, 0, 0, 0, 0) },
    { name: 'sleep', timeSettings: getSetTime(0, 23, 0, 0, 0) },
    { name: 'breakfast', timeSettings: getSetTime(0, 7, 30, 0, 0) },
    { name: 'lunch', timeSettings: getSetTime(0, 12, 0, 0, 0) },
    { name: 'dinner', timeSettings: getSetTime(0, 18, 0, 0, 0) },
  ]

  const [menus, setMenu] = useState(menuList);
  const [selectedTimeName, setSelectedTimeName] = useState('tomorrowMid');

  return (
    <>
      <div>
        <DisplayMenu
          timeName={{ selectedTimeName, setSelectedTimeName }}
          menuArr={{ menus, setMenu }} />
      </div>
      <div>
        <MenuListBtn
          timeName={{ selectedTimeName, setSelectedTimeName }}
          menuArr={{ menus, setMenu }} />
      </div>
    </>
  )
}


function MenuListBtn({ timeName }) {
  return (
    <>
      <ul>
        <li><input
          onClick={(e) => timeName.setSelectedTimeName(e.target.value)}
          type='button'
          value={'tomorrowMid'} /></li>
        <li><input
          onClick={(e) => timeName.setSelectedTimeName(e.target.value)}
          type='button'
          value={'sleep'} /></li>
        <li><input
          onClick={(e) => timeName.setSelectedTimeName(e.target.value)}
          type='button'
          value={'breakfast'} /></li>
        <li><input
          onClick={(e) => timeName.setSelectedTimeName(e.target.value)}
          type='button'
          value={'lunch'} /></li>
        <li><input
          onClick={(e) => timeName.setSelectedTimeName(e.target.value)}
          type='button'
          value={'dinner'} /></li>
      </ul>
    </>
  )
}

function DisplayMenu({ timeName, menuArr }) {
  switch (timeName.selectedTimeName) {
    case 'tomorrowMid':
      return <div><GuestTomorrowMid /></div>
    case 'sleep':
      return <div><GuestSleep
        menuArr={menuArr}
        timeName={timeName} /></div>
    case 'breakfast':
      return <div><GuestBreakfast
        menuArr={menuArr}
        timeName={timeName} /></div>
    case 'lunch':
      return <div><GuestLunch
        menuArr={menuArr}
        timeName={timeName} /></div>
    case 'dinner':
      return <div><GuestDinner
        menuArr={menuArr}
        timeName={timeName} /></div>
    default:
      return <div><GuestTomorrowMid /></div>
  }

}