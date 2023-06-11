import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

import JsPDF from "jspdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { Card, Button } from "./../../components";

import NocModal from "./NocModal";
import StatusLogModal from "./StatusLogModal";
import RejectNocModal from "./RejectNocModal";
import Sidebar from "../../components/Sidebar";

import { getFormData } from "../../api";
import { getPrefillXML } from "./../../api/formApi";
import Toast from "../../components/Toast";

// const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;
const ENKETO_URL = "http://localhost:8065/";

export default function ApplicationPage({
  closeModal,
  closeRejectModal,
  closeStatusModal,
  closeCertificateModal,
}) {
  const reportTemplateRef = useRef(null);
  const [rejectModel, setRejectModel] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openStatusModel, setOpenStatusModel] = useState(false);
  const [encodedFormURI, setEncodedFormURI] = useState("");
  let { formName, formId } = useParams();
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

  const userId = "427d473d-d8ea-4bb3-b317-f230f1c9b2f7";
  const formSpec = {
    skipOnSuccessMessage: true,
    prefill: {},
    submissionURL: "",
    name: formName,
    successCheck: "async (formData) => { return true; }",
    onSuccess: {
      notificationMessage: "Form submitted successfully",
      sideEffect: "async (formData) => { console.log(formData); }",
    },
    onFailure: {
      message: "Form submission failed",
      sideEffect: "async (formData) => { console.log(formData); }",
      next: {
        type: "url",
        id: "google",
      },
    },
  };

  const fetchFormData = async () => {
    const postData = { form_id: formId };
    const res = await getFormData(postData);
    const formData = res.data.form_submissions[0];
    let formURI = await getPrefillXML(
      `${formData?.form_name}`,
      "",
      formData.form_data,
      formData.imageUrls
    );
    setEncodedFormURI(formURI);
  };

  const handleGeneratePdf = async () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");

    var iframe = document.getElementById("enketo_form_preview");
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    const formElem = innerDoc.querySelector("form");

    let innerHTML = innerDoc.getElementsByTagName("html")[0].innerHTML;
    innerHTML = innerHTML.replace(/label/g, "div");
    innerHTML = innerHTML.replace(/span/g, "div");
    const pdfBlobOutput = await handleHtml2Canvas(innerHTML);
    // console.log("innerHTML - ", innerHTML);

    var wrapper = document.createElement("div");
    wrapper.innerHTML = innerHTML;

    console.log("wrapper - ", wrapper);
    console.log("formElem - ", formElem);

    // var url = window.URL || window.webkitURL;
    // const link = url.createObjectURL(pdfBlobOutput);
    // var a = document.createElement("a");
    // a.setAttribute("download", "sample.pdf");
    // a.setAttribute("href", link);
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    doc.html(wrapper, {
      async callback(doc) {
        await doc.save("document");
      },
    });

    // let canvas = await html2canvas(innerDoc.body, {});

    // // Convert the iframe into a PNG image using canvas.
    // let imgData = canvas.toDataURL("image/png");

    // // Create a PDF document and add the image as a page.
    // const doc = new JsPDF({
    //   format: "a4",
    //   unit: "mm",
    // });
    // doc.addImage(imgData, "PNG", 0, 0, 210, 297);

    // // Get the file as blob output.
    // let blob = doc.output("blob");
    // console.log("blob - ", blob);

    // html2canvas(
    //   document
    //     .getElementById("enketo_form_preview")
    //     .contentWindow.document.querySelector("form")
    // ).then((canvas) => {
    //   let base64image = canvas.toDataURL("image/png");
    //   console.log(base64image);
    //   let pdf = new jsPDF("p", "px", [1600, 1131]);
    //   pdf.addImage(base64image, "PNG", 15, 15, 1110, 360);
    //   pdf.save("enketo-form.pdf");
    // });

    // var script = innerDoc.createElement("script");
    // script.append(`
    //   window.onload = function() {
    //     document.getElementById("enketo_form_preview").addEventListener('click', function() {
    //       const text = document.getElementById('form-title').innerText;
    //       alert(text);
    //     })
    //   }
    // `);
    // innerDoc.documentElement.appendChild(script);

    // html2canvas(innerDoc, {
    //   onrendered: function (canvas) {
    //     document.body.appendChild(canvas);
    //   },
    // });
  };

  const handleHtml2Canvas = async (htmlString) => {
    let iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
    let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.body.innerHTML = htmlString;

    console.log("iframeDoc - ", iframeDoc.body);

    let canvas = await html2canvas(iframeDoc.body, {});

    // Convert the iframe into a PNG image using canvas.
    let imgData = canvas.toDataURL("image/png");

    // Create a PDF document and add the image as a page.
    const doc = new JsPDF({
      format: "a4",
      unit: "mm",
    });
    doc.addImage(imgData, "PNG", 0, 0, 210, 297);

    // Get the file as blob output.
    let blob = doc.output("blob");
    console.log("blob - ", blob);

    // Remove the iframe from the document when the file is generated.
    document.body.removeChild(iframe);

    return blob;
  };

  const testPDF = async () => {
    let htmlString =
      "<!DOCTYPE html><html><body><p><b>This text is bold</b></p><p><i>This text is italic</i></p><p>This is<sub> subscript</sub> and <sup>superscript</sup></p></body></html>";
    handleHtml2Canvas(htmlString);

    var url = window.URL || window.webkitURL;
    // const link = url.createObjectURL(pdfBlobOutput);
    // var a = document.createElement("a");
    // a.setAttribute("download", "sample.pdf");
    // a.setAttribute("href", link);
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  };

  const handlePrintPdf = () => {
    const URL = `${ENKETO_URL}preview?formSpec=${encodeURI(
      JSON.stringify(formSpec)
    )}&xform=${encodedFormURI}&userId=${userId}`;
    var strWindowFeatures = "fullscreen=1,channelmode=1,status=1,resizable=1";
    var win = window.open(URL, "_blank", strWindowFeatures);

    // const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    console.log("win.document - ", win);

    let targetNode = win.document.getElementsByTagName("form");
    const interval = setInterval(() => {
      targetNode = win.document.getElementsByTagName("form");
      console.log("targetNode - ", targetNode);
    }, 1000);
    console.log("targetNode - ", targetNode);
    const config = { attributes: true, childList: true, subtree: true };

    // if (targetNode) {
    clearInterval(interval);
    // }

    // const callback = (mutationList, observer) => {
    //   for (const mutation of mutationList) {
    //     if (mutation.type === "childList") {
    //       console.log("A child node has been added or removed");
    //     } else if (mutation.type === "attributes") {
    //       console.log(`The ${mutation.attributeName} attribute was modified`);
    //     }
    //   }
    // };

    // const observer = new MutationObserver(callback);
    // if (targetNode) {
    //   observer.observe(targetNode, config);
    //   observer.disconnect();
    // }

    // console.log("win - ", win);
    // win.onload = function () {
    //   console.log("out win.document.readyState - ", win.document.readyState);
    //   if (win.document.readyState === "complete") {
    //     console.log("win.document.readyState - ", win.document.readyState);
    //     // win.print();
    //   }
    // };
  };

  useEffect(() => {
    fetchFormData();
    // testPDF();
  }, []);

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <div className="flex flex-col gap-12">
        <div className="flex flex-row">
          <div className="flex grow justify-start items-center">
            <h1 className="text-2xl font-bold uppercase">
              {formName.split("_").join(" ")}
            </h1>
          </div>
          <div className="flex grow gap-4 justify-end items-center">
            <button
              onClick={() => setRejectModel(true)}
              className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 bg-white text-gray-500 w-[140px] h-[40px] font-medium rounded-[4px]"
            >
              Reject{" "}
              <span>
                <AiOutlineClose />
              </span>{" "}
            </button>
            <button
              onClick={() => setOpenModel(true)}
              className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
            >
              Approve{" "}
              <span>
                <AiOutlineCheck />
              </span>
            </button>
            <div className="inline-block h-[40px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50"></div>
            <button
              onClick={() => setOpenStatusModel(true)}
              className="border border-gray-500 text-blue-600 bg-gray-100 w-[140px] h-[40px] font-medium rounded-[4px]"
            >
              View status log
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex w-[30%]">
            <Sidebar />
          </div>
          <div className="flex w-full flex-col gap-4">
            <Card
              moreClass="flex flex-col shadow-md border border-[#F5F5F5] gap-4"
              styles={{ backgroundColor: "#F5F5F5" }}
            >
              <div
                className="p-1 flex justify-center border border-[#D9D9D9] rounded-[4px]"
                style={{ backgroundColor: "#EBEBEB" }}
              >
                <h4 className="text-secondary font-medium">
                  Status: Inspection completed
                </h4>
              </div>
            </Card>
            <Card moreClass="shadow-md">
              <div ref={reportTemplateRef}>
                <iframe
                  id="enketo_form_preview"
                  title="form"
                  src={`${ENKETO_URL}preview?formSpec=${encodeURI(
                    JSON.stringify(formSpec)
                  )}&xform=${encodedFormURI}&userId=${userId}`}
                  style={{ minHeight: "100vh", width: "100%" }}
                  className="iframe-enketo"
                />
              </div>
            </Card>
            <button className="button" onClick={handlePrintPdf}>
              Generate PDF
            </button>
          </div>
        </div>
      </div>
      {openModel && <NocModal closeModal={setOpenModel} setToast={setToast} />}
      {rejectModel && (
        <RejectNocModal closeRejectModal={setRejectModel} setToast={setToast} />
      )}
      {/* {openCertificateModel && <IssueCertificateModal closeCertificateModal={setOpenCertificateModel}/>} */}
      {openStatusModel && (
        <StatusLogModal closeStatusModal={setOpenStatusModel} />
      )}
    </>
  );
}
