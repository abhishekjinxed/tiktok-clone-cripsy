import 'styles/normalize.css'
import 'styles/globals.css'
import useVH from 'hooks/useVH'
import { usePageLoading } from '../scripts/usePageLoading';

function MyApp ({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
  
  useVH()
    
  return (
    <>
     <Component {...pageProps} />
      {/* {isPageLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Component {...pageProps} />
      )} */}
    </>
   );
  
  
  
}

export default MyApp
