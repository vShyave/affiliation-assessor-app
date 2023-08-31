import React, { useContext, useState } from "react";
import {
  getAllRegulatorDeviceId,
  getApplicantDeviceId,
  getRejectApplicant,
  registerEvent,
  sendEmailNotification,
  sendPushNotification,
  updateFormStatus,
} from "../../api";
import { ContextAPI } from "../../utils/ContextAPI";
import { getCookie, getLocalTimeInISOFormat } from "../../utils";

import { Button } from "../../components";

function RejectNocModal({
  closeRejectModal,
  setRejectStatus,
  formId,
  instituteId,
  instituteName,
}) {
  const userDetails = getCookie("userData");

  const user_details = userDetails?.userRepresentation;

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const [comment, setComment] = useState("");
  const { setSpinner, setToast } = useContext(ContextAPI);

  const handleRejectApplicant = async () => {
    if (comment.length === 0) {
      // console.log("enter something");
    } else {
      const postData = {
        form_id: formId,
        remarks: comment,
        date: new Date().toISOString().substring(0, 10),
      };
      try {
        setSpinner(true);
        const res = await getRejectApplicant(postData);
        console.log("remarks",res)
        const rejectedRemarks = res?.data?.update_form_submissions?.returning[0]?.remarks
        const formStatus =
          res?.data?.update_form_submissions?.returning[0]?.form_status;
        setRejectStatus(formStatus === "Rejected" ? true : false);
        registerEvent({
          created_date: getLocalTimeInISOFormat(),
          entity_id: formId.toString(),
          entity_type: "form",
          event_name: "Rejected",
          remarks: `${user_details?.firstName} ${user_details?.lastName} has rejected the form because ${rejectedRemarks}!`,
          // remarks: rejectedRemarks
        });

        updateFormStatus({
          form_id: formId * 1,
          form_status: "Rejected",
        });
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "The form is rejected!",
          toastType: "success",
        }));
        closeRejectModal(false);

        //applicant push notification
        const applicantRes = await getApplicantDeviceId({
          institute_id: instituteId,
        });
        // if (applicantRes?.data) {
        //   let tempIds = JSON.parse(
        //     applicantRes?.data?.institutes[0]?.institute_pocs[0]?.device_id
        //   );
        //   sendPushNotification({
        //     title: "Application Termination",
        //     body: `We regret to inform you that your application has been terminated. We appreciate your interest and encourage you to consider applying in the future.`,
        //     deviceToken: tempIds,
        //     userId:
        //       applicantRes?.data?.institutes[0]?.institute_pocs[0]?.user_id,
        //   });
        // }

        //regulator push notification
        // const regAPIRes = await getAllRegulatorDeviceId();
        // let regDeviceIds = [];
        // regAPIRes?.data?.regulator?.forEach((item) => {
        //   let tempIds = JSON.parse(item.device_id);
        //   if (tempIds.length) {
        //     regDeviceIds.push();
        //   }
        // });

        // console.log("regulator device ids-", regDeviceIds);
        // sendPushNotification({
        //   title: "Application Termination",
        //   body: `Please be informed that the application ${instituteName}'s form has been terminated. Kindly update the records accordingly.`,
        //   deviceToken: regDeviceIds,
        //   userId: "34061b3d-dc9f-41c4-94da-405306175430",
        // });

        //email notify
        const emailData = {
          recipientEmail: [`${applicantRes?.data?.institutes[0]?.email}`],
          emailSubject: `Granting NOC/Affiliation to ${applicantRes?.data?.institutes[0]?.name}`,
          emailBody: `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Your Email Title</title><link href='https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&display=swap' rel='stylesheet'></head><body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'><table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 20px; text-align: center; background-color: #F5F5F5;'><img src='https://regulator.upsmfac.org/images/upsmf.png' alt='Logo' style='max-width: 360px;'></td></tr></table><table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 36px;'><p style='color: #555555; font-size: 18px; font-family: 'Mulish', Arial, sans-serif;'>Dear ${applicantRes?.data?.institutes[0]?.name},</p><p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'>We hope this email finds you well. We are writing to kindly request the resubmission of your application for the affiliation process. We apologize for any inconvenience caused, but it appears that there was an issue with the initial submission, and we did not receive the full information for proceeding to next steps.</p><p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'>We kindly request that you resubmit your application using the following steps:
        <p>1. Please find your returned application in the application inbox.</p>
        <p>2. You can open the returned application to view the returning officer's comment. The comments will help you to understand the gaps and bridge them.</p>
        <p>3. You can resubmit the returned application after you are done with making the required changes. Please ensure to keep saving the application as draft while you progress.</p></p><p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'>We understand that this may require some additional effort on your part, and we sincerely appreciate your cooperation. Rest assured that we will treat your resubmitted application with the utmost attention and consideration during our evaluation process.</p><p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'>If you have any questions or need further clarification regarding the resubmission process, please do not hesitate to reach out to our support executives at <Contact Details>. We are here to assist you and provide any necessary guidance.</p><p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'></p>Please note that the deadline for resubmitting your application is <deadline date>. Applications received after this date may not be considered for the current affiliation process.<p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'></p>We look forward to receiving your updated application.<p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'>Thank you for your time and continued interest in getting affiliated from our organization.</p></td></tr></table></body></html>`,
        };

        sendEmailNotification(emailData);
      } catch (error) {
        console.log(error);
      } finally {
        setSpinner(false);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex justify-center p-4 rounded-xl shadow-xl border border-gray-400 bg-gray-100 w-[580px] h-[300px]">
          <div className="flex flex-col gap-4">
            <div className="title flex font-bold">
              <h1>Reason for rejection</h1>
            </div>
            <div className="body">
              <textarea
                onChange={handleChange}
                placeholder="Write here"
                className="border w-[520px] h-[160px] p-2 rounded-xl resize-none"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="footer flex flex-row justify-between">
              <button
                onClick={() => {
                  closeRejectModal(false);
                }}
                className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                Close
              </button>
              <button
                onClick={handleRejectApplicant}
                className={`${
                  comment
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                } border w-[140px] h-[40px] font-medium rounded-[4px] `}
                disabled={!comment ? true : false}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RejectNocModal;
