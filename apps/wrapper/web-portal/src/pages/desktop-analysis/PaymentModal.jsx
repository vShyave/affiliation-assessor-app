import { Label, Button } from "../../components";
import { readableDate } from "../../utils/common";

const PaymentModal = ({ modalDetails, setViewPaymentModal }) => {
  const { paymentDetails } = modalDetails;

  return (
    <div>
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm z-[999]">
        <div className="flex flex-col bg-white rounded-xl shadow-xl border border-gray-400 w-[600px] h-[480px] p-8 gap-8">
          <section>
            <div className="flex flex-col justify-between w-full">
              <div className="font-bold text-2xl text-center mb-8">
                Payment Details
              </div>

              <div
                className={`flex flex-col gap-3 min-h-[272px] max-h-[320px] overflow-y-auto`}
              >
                <div className="flex flex-col bg-gray-100 p-8 rounded-[4px] gap-8">
                  <div className="flex flex-row gap-4">
                    <div className="flex-1 flex-col">
                      <Label text="Institute name"></Label>
                      <div className="text-lg">
                        {paymentDetails?.collegeName || "NA"}
                      </div>
                    </div>
                    <div className="flex-1 flex-col">
                      <Label text="Application Type"></Label>
                      <div className="text-lg">
                        {paymentDetails?.applicationType || "NA"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex-1 flex-col">
                      <Label text="Amount"></Label>
                      <div className="text-lg">
                        <span>&#8377;</span> {`${paymentDetails?.amount}`?.split(".")[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (`${paymentDetails?.amount}`?.split(".")[1] ? ("."+`${paymentDetails?.amount}`?.split(".")[1]): "") || "NA"}
                      </div>
                    </div>
                    <div className="flex-1 flex-col">
                      <Label text="Date"></Label>
                      <div className="text-lg">
                        {readableDate(paymentDetails?.dateTime) || "NA"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex-1 flex-col flex-grow">
                      <Label text="Transaction Id"></Label>
                      <div className="text-lg">
                        {paymentDetails?.transactionId || "NA"}
                      </div>
                    </div>
                    <div className="flex-1 flex-col">
                      <Label text="Payment Status"></Label>
                      <div className="text-lg">
                        {paymentDetails?.paymentStatus || "NA"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer>
            <div className="footer flex flex-row gap-4 justify-end">
              <Button
                onClick={() => {
                  setViewPaymentModal((prevState) => ({
                    ...prevState,
                    flag: false,
                  }));
                }}
                moreClass="border border-gray-200 bg-white text-blue-600 w-[120px]"
                text="Close"
              ></Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
