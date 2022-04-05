import { forwardRef, useEffect } from "react";

import './NotesArea.css'

const NotesArea = forwardRef((props, ref) => {
  const notesChangeHandler = () => {
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  useEffect(() => {
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  })

  return (
    <div className="notes">
      <textarea
        placeholder="Notes"
        defaultValue={props.notes}
        onChange={notesChangeHandler}
        ref={ref}
      ></textarea>
    </div>
  );
});

export default NotesArea;