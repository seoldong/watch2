import Control from '../../../components/Control';

export default function DefaultLayout({ children }) {
    return (
        <div>
            <div>
                {children}
            </div>
            <div>
                <Control />
            </div>
        </div>
    )
}