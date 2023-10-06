import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import styles from "./Table.module.css";

const Table = ({ headers, data, handleClickUpdate, handleClickDelete }) => {
  return (
    <table className={styles["table"]}>
      <thead className={styles["table-heading"]}>
        <tr>
          {headers.map((header) => {
            return (
              <th className={styles["th"]} scope="col" key={header}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item) => {
            return (
              <tr key={item.id} className={styles["table-row"]}>
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
                      <AiFillDelete
                        onClick={() => handleClickDelete(item.id)}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
