import formStyles from './form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC, FormEventHandler} from "react";

interface IForm {
  title?: string,
  actionName?: string,
  onFormSubmit?: FormEventHandler<HTMLFormElement>,
  children: React.ReactNode
  //children: JSX.Element
}

const Form: FC<IForm> = (props) => {
  return(
    <form className={formStyles.form_container} autoComplete="on" onSubmit={props.onFormSubmit}>
      {props.title &&
        <label className="text text_type_main-medium">
          {props.title}
        </label>
      }
      {props.children}
      {
        props.actionName &&
          <Button type="primary" size="medium" htmlType="button" >
            {props.actionName}
          </Button>
        }
    </form>
  );
}

export default Form;
