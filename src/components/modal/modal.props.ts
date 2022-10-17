import { ReactNode } from "react";

export interface IModal {
    title?:string;
    onClose:() => void;
    children:ReactNode;
}