import React, { ReactNode } from "react";
import { Typography } from "antd";

import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

type Props = {
   title: ReactNode | string;
   description?: ReactNode | string;
   hint?: ReactNode | string;
};

export const Option: React.FC<Props> = (props) => {
   const { title, description, hint, children } = props;
   return (
      <article className={styles.option}>
         {title && <Title level={4}>{title}</Title>}
         {description && <Paragraph>{description}</Paragraph>}
         {hint && <span className={styles.hint}>{hint}</span>}
         {children}
      </article>
   );
};
