import React from "react";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { ActionButton } from "./button";
import { DeleteCategory } from "./delete_category";
import { useSalesData } from "../../helper/use_sales_data";
import { ListOptionDeleteContext } from "../../context/list_delete";
import "./edit-data.css";

function OutputData(props) {
  const { isDelete, isEdit, optionSort, isRequest } = props;

  const [listOptionDelete, setListOptionDelete] = useState(null);

  let salesData = useSelector((store) => store.dataSales.salesData);
  const sortingData = useSelector((store) => store.sort.sortingData);
  const requestData = useSelector((store) => store.request.requestData);

  if (optionSort) {
    salesData = sortingData;
  } else if (listOptionDelete) {
    salesData = listOptionDelete;
  } else if (isRequest) {
    if (requestData.length) {
      salesData = requestData;
    }
  }

  const updateSalesData = useSalesData();

  const tableData = useMemo(
    () =>
      salesData.map((item, index) => (
        <tr key={index}>
          <td className="alignment-number">{item.item}</td>
          <td className="centered">{item.dateSale}</td>
          <td>{item.salesManager}</td>
          <td>{item.nameTovar}</td>
          <td className="alignment">{item.amountTovar}</td>
          <td className="alignment">{item.priceOne}</td>
          <td className="alignment-pay">{item.pay}</td>
          <td>{item.fioClient}</td>
          <td className="centered">{item.phone}</td>
          <td className="button-action">
            <ActionButton
              key={index}
              isDelete={isDelete}
              item={item}
              salesData={salesData}
              updateSalesData={updateSalesData}
              isEdit={isEdit}
              setListOptionDelete={setListOptionDelete}
              listOptionDelete={listOptionDelete}
            />
          </td>
        </tr>
      )),
    [salesData, isDelete, isEdit]
  );

  if (salesData.length) {
    return (
      <section id="outputData">
        <ListOptionDeleteContext.Provider value={setListOptionDelete}>
          <DeleteCategory
            isDelete={isDelete}
            salesData={salesData}
            updateSalesData={updateSalesData}
          />
        </ListOptionDeleteContext.Provider>
        <div className="scrol">
          <table>
            <caption>Дані продажу</caption>
            <thead>
              <tr>
                <th>№ п/п</th>
                <th>Дата продажу</th>
                <th>Менеджер з продажу</th>
                <th>Назва товару</th>
                <th>кількість товару</th>
                <th>ціна за одиницю</th>
                <th>сума до сплати</th>
                <th>ПІБ Клієнта</th>
                <th>номер телефону клієнта</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
      </section>
    );
  }
  return (
    <section id="outputData">
      <h1>Спочатку введіть дані!</h1>
    </section>
  );
}

export { OutputData };
