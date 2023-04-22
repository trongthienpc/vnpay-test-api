import { useState } from "react";
import QRCode from "qrcode.react";
import md5 from "md5";
import axios from "axios";
import ProductSelect from "./ProductSelect";

const generateRandomNumber = () => {
  const now = new Date();
  const randomNumber = now.getTime();
  return randomNumber;
};

const formatDate = (date) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}`;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function App() {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [orderId, setOrderId] = useState(generateRandomNumber());
  const [amount, setAmount] = useState(125000);
  const [productId, setProductId] = useState("");
  const [txnId, setTxnId] = useState("");
  const [expDate, setExpDate] = useState(formatDate(addDays(new Date(), 3)));
  const tipAndFee = "";

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      appId: import.meta.env.VITE_appId,
      merchantName: import.meta.env.VITE_merchantName,
      serviceCode: import.meta.env.VITE_serviceCode,
      countryCode: import.meta.env.VITE_countryCode,
      merchantCode: import.meta.env.VITE_merchantCode,
      terminalId: import.meta.env.VITE_terminalId,
      payType: import.meta.env.VITE_payType,
      billNumber: orderId,
      amount: amount,
      ccy: import.meta.env.VITE_ccy,
      expDate: expDate,
      masterMerCode: import.meta.env.VITE_masterMerCode,
      merchantType: import.meta.env.VITE_merchantType,
      checksum: md5(
        import.meta.env.VITE_appId +
          "|" +
          import.meta.env.merchantName +
          "|" +
          import.meta.env.VITE_serviceCode +
          "|" +
          import.meta.env.VITE_countryCode +
          "|" +
          import.meta.env.VITE_masterMerCode +
          "|" +
          import.meta.env.VITE_merchantType +
          "|" +
          import.meta.env.VITE_merchantCode +
          "|" +
          import.meta.env.VITE_terminalId +
          "|" +
          import.meta.env.VITE_payType +
          "|" +
          productId +
          "|" +
          txnId +
          "|" +
          amount +
          "|" +
          tipAndFee +
          "|" +
          import.meta.env.VITE_ccy +
          expDate +
          "|" +
          import.meta.env.VITE_secretKey
      ),
    };
    console.log("data :>> ", data);
    const data1 = {
      appId: "MERCHANT",
      merchantName: "PHUONGCHAU",
      serviceCode: "03",
      countryCode: "VN",
      masterMerCode: "A000000775",
      merchantType: "4513",
      merchantCode: "1800651309ABC",
      payloadFormat: null,
      terminalId: "BVPCHAU1",
      payType: "03",
      productId: "",
      productName: null,
      imageName: null,
      txnId: "ND03427/0618",
      amount: "1",
      tipAndFee: "",
      ccy: "704",
      expDate: "1807070935",
      desc: null,
      checksum: "5db4dec8edc58674084837e552774afd",
      merchantCity: null,
      merchantCC: null,
      fixedFee: null,
      percentageFee: null,
      pinCode: null,
      mobile: null,
      billNumber: "ND03427/0618",
      creator: null,
      consumerID: null,
      purpose: "",
    };

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    try {
      const response = await axios.post(
        "http://14.160.87.123:18080/QRCreateAPIRestV2/rest/CreateQrcodeApi/createQrcode",
        JSON.stringify(data1),
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      response.setHeader("Access-Control-Allow-Origin", "*");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>QR Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <ProductSelect
            products={[
              { productId: 1, name: "Product 1" },
              { productId: 2, name: "Product 2" },
              { productId: 3, name: "Product 3" },
            ]}
            selectedProductId={selectedProductId}
            onProductChange={(event) =>
              setSelectedProductId(event.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="orderId" className="form-label">
            Order ID
          </label>
          <input
            type="text"
            className="form-control"
            id="orderId"
            value={orderId}
            onChange={handleOrderIdChange}
            readOnly
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              step="10"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="expDate" className="form-label">
            Expired date
          </label>
          <input
            type="text"
            className="form-control"
            id="expDate"
            value={expDate}
            required
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate QR Code
        </button>
      </form>
      <div className="mt-5">
        {orderId && amount && (
          <QRCode
            value={`00020101021226310010A00000077501131800651309ABC520445135303704540115802VN5910PHUONGCHAU6003HCM62460112ND03427/06180314PHUONGCHAU QR10708BVPCHAU16304B4DE`}
          />
        )}
      </div>
    </div>
  );
}

export default App;
