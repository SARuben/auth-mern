import { Bars } from "react-loader-spinner";
function Spinner() {
  return (
     <div>
        <Bars
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
    </div>
  )    
} 
export default Spinner; 


