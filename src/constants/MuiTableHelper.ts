export function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: any, orderBy: any) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array: any, comparator: any) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}


export const pickColor = (color_picker: any, color_picker_wrapper: any) => {
  color_picker.onChange = function () {
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  };
  color_picker_wrapper.style.backgroundColor = color_picker.value;
};

export const handleRequestSort = (
  event: any,
  property: any,
  setOrder: any,
  setOrderBy: any,
  order: any,
  orderBy: any
) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

export const handleSelectAllClick = (event: any, rows: any, setSelected: any) => {
  if (event.target.checked) {
    const newSelecteds = rows.map((n: any) => n.id);

    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

export const handleClick = (event: any, name: any, selected: any, setSelected: any) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [] as any;

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelected(newSelected);
};

export const handleChangePage = (event: any, newPage: any, setPage: any) => {
  setPage(newPage);
};

export const handleChangeRowsPerPage = (event: any, setRowsPerPag: any, setPage: any) => {
  setRowsPerPag(parseInt(event.target.value, 10));
  setPage(0);
};

export const isSelected = (name: any, selected: any) => selected.indexOf(name) !== -1;

export const emptyRows = (page: any, rowsPerPage: any, rows: any) => {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
};
/********** UPLOAD IMAGE FUNCTIONS START *********/
const convertBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export async function handleChangeImage(e: any, setLoader: any, setImage: any, imageUpload: any) {
  setLoader(true);
  setImage(URL.createObjectURL(e.target.files[0]));
  let base64 = [] as any;
  base64 = await convertBase64(e.target.files[0]);
  base64 = base64.split(",")[1];
  const imageObj = {
    name: e.target.files[0].name,
    contentType: e.target.files[0].type,
    file: base64,
  };
  const data = await imageUpload(imageObj);
  setImage(data.url);
  setLoader(false);
}

