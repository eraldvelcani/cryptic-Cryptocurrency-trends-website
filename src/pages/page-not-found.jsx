import { Link } from "react-router";

const PageNotFound = () => {
    return ( 
        // <div className="w-screen h-screen flex flex-col items-center justify-center text-white bg-gray-900">
        //     <h1 className="text-6xl mb-6">Error 404</h1>  
        //     <p className="text-lg mb-6">Page Not Found</p>
        //     <Link to="/" className="no-underline text-sky-500 font-bold">Return</Link>
        // </div>
        <div style={styling.container}>
            <h1 style={styling.title}>Error 404</h1>
            <p style={styling.message}>Page Not Found</p>
            <Link to='/' style={styling.link}>Return</Link>
        </div>
     );
}
 
const styling = {
    container: {
        textAlign: 'center',
        padding: '80px 20px',
        color: 'white'
    },

    title: {
        fontSize: '70px',
        marginBottom: '20px'
    },

    message: {
        fontSize: '30px',
        marginBottom: '30px'
    },

    link: {
        fontSize: '20px',
        textDecoration: 'none',
        color: '#34a4eb',
        fontWeight: 'bold'
    }
};

export default PageNotFound;