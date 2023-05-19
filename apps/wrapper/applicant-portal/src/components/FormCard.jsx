import React from   'react';
import { Card, Button } from './index';

const FormCard = (props) => {
    return  (
        <Card moreClass="flex flex-col border-gray-100 m-3 gap-3 w-[300px] border-[1px] drop-shadow">
            <div className='text-xl font-medium'>{props.form.course_name}</div>
            <div className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, quibusdam?</div>
            <div className='flex'>
                <Button moreClass="text-primary-500 font-bold uppercase border-gray-500 text-primary-400" style={{backgroundColor: '#fff' }} text="Apply"></Button>
            </div>
        </Card>
    )
}

export default FormCard;