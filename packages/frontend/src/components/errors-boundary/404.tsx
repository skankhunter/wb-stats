import { Result, Button } from "antd";
import { useHistory } from "react-router";

export const Page404 = () => {
   const history = useHistory();
   return (
      <Result
         status="404"
         title="404"
         subTitle="Такой страницы не существует"
         extra={
            <Button type="primary" onClick={() => history.goBack()}>
               Назад
            </Button>
         }
      />
   );
};
