import styles from "./styles.module.scss";
import Timer from "./timer-widget/timer";
import Notes from "./Notes/notes";
import Tasks from "./Tasks/tasks";
import Select from "react-select";
import { useState } from "react";
import blank from "./images/blank.svg";
import { url } from "./images/logolink";

const options = [
  { value: "Timer", label: "Work Timer" },
  { value: "Notes", label: "Notes" },
  { value: "Tasks", label: "Tasks" }
];

function App() {
  const [selectValue, setSelectValue] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timerVisible, setTimerVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);

  const handleChange = (e) => {
    const newSelectedOptions = [...selectedOptions, e?.value];
    setSelectedOptions(newSelectedOptions);
    setSelectValue(e);
    setVisibility(e);
  };

  const setVisibility = (e) => {
    if (e?.value === "Timer") setTimerVisible(true);
    if (e?.value === "Tasks") setTasksVisible(true);
    if (e?.value === "Notes") setNotesVisible(true);
  };
  return (
    <div className={styles.App}>
      <div className={styles.navbar}>
        <img src={url} height="50px" width="100px" alt="logo" />
        <div className={styles.dropdown}>
          <Select
            options={options.filter(
              (option) => !selectedOptions.includes(option.value)
            )}
            onChange={handleChange}
            value={selectValue}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null
            }}
            placeholder={
              <div className={styles.placeholderText}>+ Add Widget </div>
            }
          />
        </div>
      </div>
      {!timerVisible && !notesVisible && !tasksVisible && (
        <img className={styles.emptyPage} src={blank} alt="empty page" />
      )}
      {timerVisible && (
        <Timer
          visibility={setTimerVisible}
          dropDownOption={{ selectedOptions, setSelectedOptions }}
        />
      )}
      {notesVisible && (
        <Notes
          visibility={setNotesVisible}
          dropDownOption={{ selectedOptions, setSelectedOptions }}
        />
      )}
      {tasksVisible && (
        <Tasks
          visibility={setTasksVisible}
          dropDownOption={{ selectedOptions, setSelectedOptions }}
        />
      )}
    </div>
  );
}

export default App;
