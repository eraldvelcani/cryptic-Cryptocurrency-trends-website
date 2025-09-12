import { ClipLoader } from 'react-spinners';

const customCSS = {
    display: 'block',
    margin: '0 auto'
}

const Spinner = ({color = 'blue', size = '150px'}) => {
    return ( 
        <div>
            <ClipLoader 
                color={color}
                size={size}
                cssOverride={customCSS}
                aria-label='Loading...'
            />
        </div>
     );
}
 
export default Spinner;