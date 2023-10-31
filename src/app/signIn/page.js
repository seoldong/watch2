export default function SignInPage() {


    
    return (
        <>
            <form method="post">
                <input
                    type="text"
                    name="id"
                    placeholder="id"
                    autoComplete='username' />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete='current-password' />
            </form>
        </>
    )
}