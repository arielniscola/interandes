import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Datepicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker value={value} onChange={onChange} />
    </LocalizationProvider>
  );
}

export default Datepicker;
