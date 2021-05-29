import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../services/auth.service";
import styles from "./styles.module.css";

export const isLoadingHoc = (
   WrappedComponenet: React.FC,
   loadingMessage: string
) => {
   function HOC(props) {
      const auth = useAuth();

      useEffect(() => {
         if (!auth.loading) {
            setLoading(false);
         }
      }, [auth.loading]);

      const [isLoading, setLoading] = useState(true);
      const setLoadingState = (isComponentLoading: boolean) => {
         setLoading(isComponentLoading);
      };

      return (
         <>
            {isLoading ? (
               <div className={styles.spin_wrapper}>
                  <Spin size="large" tip={loadingMessage} />
               </div>
            ) : (
               <WrappedComponenet {...props} setLoading={setLoadingState} />
            )}
         </>
      );
   }

   return HOC;
};
export default isLoadingHoc;
