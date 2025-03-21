import Input from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export interface CustomComponents {
    input?: typeof Input;
    password?: typeof Input;
    select?: typeof Select
}