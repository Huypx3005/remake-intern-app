import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useState, useRef, useCallback, useEffect } from "react";

import styles from "./Table.module.css";

const Table = ({ headers, data, handleClickUpdate, handleClickDelete }) => {
  const [visibleData, setVisibleData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setVisibleData(data.slice(0, 10));
  }, [data]);

  const handleScroll = useCallback(() => {
    if (
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight &&
      visibleData.length != data.length // Stop update when render all data
    ) {
      const currentLength = visibleData.length;
      const newData = data.slice(currentLength, currentLength + 10);
      setVisibleData((prevData) => [...prevData, ...newData]);
    }
  }, [visibleData]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      <table className={styles["table"]}>
        <thead className={styles["table-heading"]}>
          <tr>
            {headers.map((header) => (
              <th className={styles["th"]} scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item) => (
            <tr key={item.id} className={styles["table-row"]}>
              {/* ... Your existing code ... */}
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>
                <div className={styles["actions"]}>
                  <span className={styles["icon"]}>
                    <AiFillEdit onClick={() => handleClickUpdate(item.id)} />
                  </span>
                  <span className={styles["icon"]}>
                    <AiFillDelete onClick={() => handleClickDelete(item.id)} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
