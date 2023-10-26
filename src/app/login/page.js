import { getSetTime } from '../../../logic/getTime';

export default function LoginPage() {

    // const initMenu = 'tomorrowMid';
    // const [selectedMenu, setSelectedMenu] = useState(initMenu);

    // const initSleepTime = getSetTime(0, 23, 0, 0, 0);
    // const [sleepState, setSleepState] = useState(initSleepTime)

    // const initBreakfast = getSetTime(0, 7, 30, 0, 0);
    // const [breakfastState, setBreakfastState] = useState(initBreakfast);

    // const initLunch = getSetTime(0, 12, 0, 0, 0);
    // const [lunchState, setLunchState] = useState(initLunch);

    // const initDinner = getSetTime(0, 18, 0, 0, 0);
    // const [dinnerState, setDinnerState] = useState(initDinner);

    const initUserData = {
        initSelectedMenu: 'tomorrowMid',
        initSleepState: getSetTime(0, 23, 0, 0, 0),
        initBreakfastState: getSetTime(0, 7, 30, 0, 0),
        initLunchState: getSetTime(0, 12, 0, 0, 0),
        initDinnerState: getSetTime(0, 18, 0, 0, 0),
    }

    let userData = {
        selectedMenu: 0,
        sleepState: 0,
        breakfastState: 0,
        lunchState: 0,
        dinnerState: 0,
    }

    






    return (
        <>
            login
        </>
    )
}