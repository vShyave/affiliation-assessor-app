import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const Accordion = ({headText, number}) => {
    return (
        <div className="border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-800">
            <h2 className="mb-0 bg-primary text-white" id={`heading${number}`}>
                <button className="group relative flex w-full items-center border-0 py-4 px-5 text-left text-base transition text-white focus:outline-none" type="button" data-te-collapse-init data-te-target={`#collapse${number}`} aria-expanded="true" aria-controls={`collapse${number}`}>
                    {headText}
                    <span className="ml-auto h-5 w-5 shrink-0 rotate-[-135deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                        <FontAwesomeIcon icon={faPlus} className="text-1xl lg:text-4xl text-white" />
                    </span>
                </button>
            </h2>
            <div id={`collapse${number}`} className="!visible" data-te-collapse-item data-te-collapse-show aria-labelledby={`heading${number}`} data-te-parent="#accordionExample">
                <div className="py-4 px-5">
                    <strong>This is the first item's accordion body.</strong> It is
                    shown by default, until the collapse plugin adds the appropriate
                    classes that we use to style each element. These classes control
                    the overall appearance, as well as the showing and hiding via CSS
                    transitions. You can modify any of this with custom CSS or
                    overriding our default variables. It's also worth noting that just
                    about any HTML can go within the <code>.accordion-body</code>,
                    though the transition does limit overflow.
                </div>
            </div>
        </div>
    );
};

export default Accordion;