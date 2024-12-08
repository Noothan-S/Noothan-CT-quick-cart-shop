import { Dispatch, SetStateAction } from "react";

export interface IUpdateUserProps {
  metadata: {
    email: string;
    setIsPassed: Dispatch<
      SetStateAction<
        | false
        | {
            email: string;
            role: "CUSTOMER" | "VENDOR";
          }
      >
    >;
  };
}
