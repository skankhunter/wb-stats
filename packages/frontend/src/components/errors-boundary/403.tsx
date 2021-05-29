import { Result, Button } from "antd";
import { useHistory } from "react-router";

export const Page403 = () => {
   const history = useHistory();
   return (
      <Result
         status="403"
         title="403"
         subTitle="У Вас недостаточно прав для этого раздела"
         extra={
            <Button type="primary" onClick={() => history.push('/')}>
               На главную
            </Button>
         }
      />
   );
};
