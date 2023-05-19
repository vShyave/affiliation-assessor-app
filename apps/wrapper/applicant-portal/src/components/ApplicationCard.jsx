import React from   'react';
import { Card, Button } from './index';

const ApplicationCard = (props) => {
    return  (
        <Card moreClass="flex flex-col border-gray-100 m-3 gap-3 w-[300px] border-[1px] drop-shadow">
            <div className='text-xl font-medium'>{props.application.form_name}</div>
            <div className='text-sm'>Submitted on: {props.application.submitted_on}</div>
            <div className='text-sm'> <span className='text-xs text-green-500 p-1 rounded-md' style={{backgroundColor: '#eee' }}>Status: {props.application.review_status}</span></div>
            
            <div className='flex'>
                <Button moreClass="text-primary-500 font-bold uppercase border-gray-500 text-primary-400" style={{backgroundColor: '#fff' }} text="View Application " onClick={props.onView ? () => props.onView(props.application.form_id) : null}></Button>
            </div>
        </Card>
    )
}

export default ApplicationCard;