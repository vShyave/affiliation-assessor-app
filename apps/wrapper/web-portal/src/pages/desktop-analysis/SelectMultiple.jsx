import Select from "react-select";

const formOptions = [
  { value: "form_1", label: "Form name 1" },
  { value: "form_2", label: "Form name 2" },
  { value: "form_3", label: "Form name 3" },
  { value: "form_4", label: "Form name 4" },
  { value: "form_5", label: "Form name 5" },
  { value: "form_6", label: "Form name 6" },
 
];

export default function MultiSelect() {
  return (
    <div className="mx-auto w-full text-xl">
      <Select
        defaultValue={[formOptions[0], formOptions[2]]}
        isMulti
        name="colors"
        options={formOptions}
        className=" w-full"
        classNamePrefix="select"
      />
    </div>
  );
}