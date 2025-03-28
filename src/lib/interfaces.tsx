import Input from "@/components/ui/input";
import RadioGroup from "@/components/ui/radio/radioGroup";
import { Select, SelectOption } from "@/components/ui/select";

export interface CustomComponents {
    input?: typeof Input;
    password?: typeof Input;
    select?: typeof Select
    selectOption?: typeof SelectOption;
    radio?: typeof RadioGroup;
    radioItem?: typeof RadioGroup;
}