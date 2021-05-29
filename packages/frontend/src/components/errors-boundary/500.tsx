import { Result, Button } from "antd";
import { useHistory } from "react-router";

export const Page500 = () => {
   const history = useHistory();
   return (
      <Result
         status="500"
         title="500"
         subTitle="Проблемы с сервером, попробуйте, пожалуйста, позже"
         extra={
            <Button type="primary" onClick={() => history.push('/')}>
               На главную
            </Button>
         }
      />
   );
};
