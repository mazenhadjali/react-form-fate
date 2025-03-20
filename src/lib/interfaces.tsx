import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";


export interface CustomComponents {
    input?: typeof Input;
    password?: typeof Input;
    checkbox?: typeof Checkbox;
    select?: typeof Select;
    radioGroup?: typeof RadioGroup;
}