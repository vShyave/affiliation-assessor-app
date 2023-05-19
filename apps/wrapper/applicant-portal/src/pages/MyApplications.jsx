import React, {useEffect, useState}  from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, ApplicationCard, FormCard } from '../components';
import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute';
import { applicationService, formService } from '../services';


const MyApplications = () => {
    const [loadingApplications, setLoadingApplications] = useState(false);
    const [loadingForms, setLoadingForms] = useState(false);
    const [applications, setApplications]  =  useState([])
    const [availableForms, setAvailableForms] = useState([]);

    useEffect(() => {
        getApplications();
        getAvailableForms();
      }, []);


    const getApplications= async () => {
        setLoadingApplications(true);

        const applicationsResponse = await applicationService.getData();
        if(applicationsResponse?.data?.form_submissions) {
            setApplications(applicationsResponse?.data?.form_submissions);
        }
        setLoadingApplications(false);
    }

    const getAvailableForms= async () => {
        setLoadingForms(true);
        const requestPayoad = {instituteId: 11};   
        const formsResponse = await formService.getData(requestPayoad);
        if(formsResponse?.data?.courses) {
            setAvailableForms(formsResponse?.data?.courses);
        }
        setLoadingForms(false);
    }

    return (
        <>
            <div className="h-[48px] bg-white drop-shadow-sm">
                <div className='container mx-auto px-3 py-3'>
                    <div className='text-primary-400 font-bold'>My Application</div>
                </div>
            </div>

            <div className='container mx-auto py-12 px-3 min-h-[40vh]'>
                <div className='flex flex-col gap-3'>
                    <div className='text-xl font-semibold'>My Applications</div>
                    {!loadingApplications && applications.length === 0 && <div className='text-sm'>There is no active applications. Select one from the below list to apply.</div>}
                    {!loadingApplications && applications.length > 0 && (
                        <div className='flex flex-wrap'>
                        {
                            applications.map((application) => (
                                <ApplicationCard application={application} />
                            ))
                        }
                    </div>
                    )}
                </div>
            </div>

            <div className='bg-white drop-shadow-sm'>
                <div className='container mx-auto px-3 py-6'>
                    <div className="flex flex-col gap-5">
                        <div className='flex flex-row'>
                            <div className='flex grow'>
                                <div className='flex flex-col gap-3'>
                                    <div className='text-xl font-semibold'>Application form</div>
                                    {!loadingForms && availableForms.length === 0 && <div className='text-sm'>There is no form available</div>}
                                    {!loadingForms && availableForms.length > 0 && <div className='text-sm'>These are the available forms for you to apply. Click on any of them to start filling</div>}
                                </div>
                            </div>
                            <div className='flex items-center'>
                            {!loadingForms && availableForms.length > 0 && <Link to={APPLICANT_ROUTE_MAP.dashboardModule.all_applications}>
                                    <Button moreClass="text-primary-500 font-bold uppercase border-gray-500" style={{backgroundColor: '#fff', border: '1px solid #d1d5db' }} text="See all"></Button>
                                </Link>
                            }   
                            </div>
                        </div>
                        {!loadingForms && availableForms.length > 0 &&  (
                            <div className='flex flex-wrap'>
                                {
                                    availableForms.map((form, index) => (
                                        <FormCard form={form} key={index}/>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyApplications
