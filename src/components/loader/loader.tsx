import loaderStyles from './loader.module.css';
import logo from '../../images/logo.png'
import {FC} from "react";

const Loader: FC = () => {
  return(
    <div className={loaderStyles.loader}>
      <img src={logo} alt='' title ='' className={loaderStyles.spinner} />
    </div>
  );
}

export default Loader;
