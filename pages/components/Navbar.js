import Link from 'next/link';

const Navbar = () => { //here you can add pages, it automatically should update whole system
    return (
        <nav>
            <div className="logo">
                <h1>KoalaManager</h1>
            </div>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
            <Link href="/manager">
                <a>Manager</a>
            </Link>
        </nav>
    );
}

export default Navbar;