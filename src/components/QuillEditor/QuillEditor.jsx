import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./QuillEditor.module.css";

const QuillEditor = ({ value, onChange }) => {
  return <div className={styles["ql-editor"]}>
    <ReactQuill theme="snow" value={value} onChange={onChange} />
  </div>;
};

export default QuillEditor;
