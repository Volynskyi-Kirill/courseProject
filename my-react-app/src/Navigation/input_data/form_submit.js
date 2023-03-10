import { DEFAULT } from "../../const/const";

function FormSubmit(dataInput, setDataInput, salesData, updateSalesData) {
  const isDuplicate = salesData.find(
    (sale) =>
      sale.dateSale === dataInput.dateSale &&
      sale.salesManager === dataInput.salesManager &&
      sale.nameTovar === dataInput.nameTovar &&
      sale.amountTovar === dataInput.amountTovar &&
      sale.priceOne === dataInput.priceOne &&
      sale.pay === dataInput.pay &&
      sale.fioClient === dataInput.fioClient &&
      sale.phone === dataInput.phone
  );

  if (!isDuplicate) {
    updateSalesData([...salesData, dataInput]);
    // setDataInput.map((setData) => {
    //   setData(DEFAULT.VALUE);
    // });
  } else {
    alert("Уже есть такая запись!");
  }
}

export { FormSubmit };