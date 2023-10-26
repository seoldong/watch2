export default function DefaultMenu({ menu }) {

    function menuState(e) {
        menu.setSelectedMenu(e.target.value);
    }

    return (
        <>
            <button onClick={(e) => menuState(e)} value={'tomorrowMid'}> tomorrow midnight </button >
            <button onClick={(e) => menuState(e)} value={'sleep'}> sleep </button >
            <button onClick={(e) => menuState(e)} value={'breakfast'}> breakfast </button >
            <button onClick={(e) => menuState(e)} value={'lunch'}> lunch </button >
            <button onClick={(e) => menuState(e)} value={'dinner'}> dinner </button >
        </>
    )
}

