const { default: Footer } = require("./Footer")
const { default: Navbar } = require("./Navbar")

const Layout = ({children}) => {

    return (
        <div className="content">
            <Navbar />
            {children}
            
            <Footer />

        </div>
        );

}

export default Layout