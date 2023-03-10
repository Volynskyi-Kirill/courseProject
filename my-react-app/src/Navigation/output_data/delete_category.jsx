import { useState } from "react";
import { ListReact } from "../../helper/react_list";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { textAlign } from "@mui/system";

function DeleteCategory(props) {
  const { isDelete, salesData, updateSalesData } = props;

  const [valueOption, setValueOption] = useState();
  const [valueOptionTovar, setValueOptionTovar] = useState();
  const [optionPhone, setOptionPhone] = useState();
  const [optionItem, setOptionItem] = useState();

  const salesManagers = Array.from(
    new Set(salesData.map((item) => item.salesManager))
  );

  const allProducts = Array.from(
    new Set(salesData.map((item) => item.nameTovar))
  );

  const allNumberPhone = Array.from(
    new Set(salesData.map((item) => item.phone))
  );

  const allItem = Array.from(new Set(salesData.map((item) => item.item)));

  const allManager = ListReact(salesManagers);

  const allTovar = ListReact(allProducts);

  const JSX_AllPhone = ListReact(allNumberPhone);

  const JSX_AllItem = ListReact(allItem);

  const onChangeValueOption = (event) => {
    const option = event.target.value;
    setValueOption(option);

    event.preventDefault();
    updateSalesData(
      salesData.filter((recorder) => recorder.salesManager !== option)
    );
    if (allManager.length === 1) {
      updateSalesData(
        salesData.filter(
          (recorder) => recorder.salesManager !== salesManagers[0]
        )
      );
    }
  };

  const onChangeValueTovar = (event) => {
    const option = event.target.value;
    setValueOptionTovar(option);

    event.preventDefault();
    updateSalesData(
      salesData.filter((recorder) => recorder.nameTovar !== option)
    );
    if (allTovar.length === 1) {
      updateSalesData(
        salesData.filter((recorder) => recorder.nameTovar !== allProducts[0])
      );
    }
  };

  const onChangeValuePhone = (event) => {
    const option = event.target.value;
    setOptionPhone(option);

    event.preventDefault();
    updateSalesData(salesData.filter((recorder) => recorder.phone !== option));
    if (JSX_AllPhone.length === 1) {
      updateSalesData(
        salesData.filter((recorder) => recorder.phone !== allNumberPhone[0])
      );
    }
  };

  const onChangeValueItem = (event) => {
    const option = event.target.value;
    setOptionItem(option);

    event.preventDefault();
    updateSalesData(
      salesData.filter((recorder) => recorder.item !== Number(option))
    );
    if (JSX_AllItem.length === 1) {
      updateSalesData(
        salesData.filter((recorder) => recorder.item !== allItem[0])
      );
    }
  };

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          p: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }

  if (isDelete) {
    return (
      // <div className="container-form-delete">

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: -30,
          mb: 10,
        }}
      >
        <h2>?????????????? ??????????????????</h2>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
            // mt: -30,
            // mb: 10,
          }}
        >
          <Box sx={{ minWidth: 200, pr: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                ???? ????????????????????
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueOption}
                label="???? ????????????????????"
                onChange={onChangeValueOption}
              >
                {allManager}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 220, pr: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">???? ??????????????</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueOptionTovar}
                label="???? ??????????????"
                onChange={onChangeValueTovar}
              >
                {allTovar}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 220, pr: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                ???? ?????????????? ????????????????
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optionPhone}
                label="???? ?????????????? ????????????????"
                onChange={onChangeValuePhone}
              >
                {JSX_AllPhone}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200, pr: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                ???? ?????????????? ????????????
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optionItem}
                label="???? ?????????????? ????????????"
                onChange={onChangeValueItem}
              >
                {JSX_AllItem}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      // </div>
    );
  }
  return null;
}

export { DeleteCategory };
