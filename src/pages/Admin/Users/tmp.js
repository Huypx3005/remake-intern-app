switch (selectedGender) {
  case "name":
    filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(inputName.toLowerCase())
    );
    setTableData(filteredData);
    break;
  case "gender":
    filteredData = data.filter((item) =>
      item.gender.toLowerCase().includes(inputName.toLowerCase())
    );
    setTableData(filteredData);
    break;
  case "age":
    if (inputAgeFrom && !inputAgeTo) {
      filteredData = data.filter(
        (item) => Number(item.age) >= Number(inputAgeFrom)
      );
      setTableData(filteredData);
    } else if (inputAgeTo && !inputAgeFrom) {
      filteredData = data.filter(
        (item) => Number(item.age) <= Number(inputAgeTo)
      );
      setTableData(filteredData);
    } else {
      filteredData = data.filter(
        (item) =>
          Number(item.age) >= Number(inputAgeFrom) &&
          Number(item.age) <= Number(inputAgeTo)
      );
      setTableData(filteredData);
    }
    break;
  default:
    break;
}