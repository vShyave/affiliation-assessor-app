

export class FormController {

    /* formSpec = {
      "submissionURL": "http://esamwad.samagra.io/api/v4/form/submit",
      "name": "SampleForm",
      "messageOnSubmit": "Form submitted successfully",
      "messageOnFailure": "Form submission failed",
      "isSuccess": "async (formData) => { console.log(formData); }",
      "onFormSuccess": "async (formData) => { console.log(formData); }",
      "onFormFailure": "async (formData) => { console.log(formData); }",
      "nextFormOnSuccess": "formID2",
      "nextFormOnFailure": "formID3"
    }
    */

    

    constructor( formSpec ) {
        /* Valid States:
            INITIALIZED
            FORM_SUCCESS
            FORM_FAILURE
            ON_SUBMIT_SUCCESS
            ON_SUBMIT_FAILURE
            ON_FORM_SUCCESS_COMPLETED
            ON_FORM_FAILURE_COMPLETED
        */
        this._state = 'INITIALIZED';
        this._message = '';
        this.formSpec = formSpec;
        this._parser = new DOMParser();
        
        this.formSpec.isSuccessExecute = () => this.executeMethod( this.formSpec.isSuccess );
        this.formSpec.onFormSuccessExecute = () => this.executeMethod( this.formSpec.onFormSuccess );
        this.formSpec.onFormFailureExecute = () => this.executeMethod( this.formSpec.onFormFailure );
    }

    async executeMethod( functionString ) {
        // execute method string
        if ( functionString ) {
            //TODO: fix this with a sandbox
            return eval( functionString )( this.formData );
        }else {
            throw new Error( 'No function string provided' );
        }
    }

    get state() {
        return this._state;
    }

    async processForm( formData ) {
        console.log( { formData } );
        const doc = this._parser.parseFromString( formData, 'text/xml' );
        this.formData = doc;
        if ( await this.formSpec.isSuccessExecute() === true ) {
            this._state = 'FORM_SUCCESS';
            this._onFormSuccessData = await this.formSpec.onFormSuccessExecute();
            console.log( this._onFormFailureData );
            this._state = 'ON_FORM_SUCCESS_COMPLETED';
            this.nextForm = this.formSpec.nextFormOnSuccess;
            this._message = this.formSpec.messageOnSuccess;
        } else {
            this._state = 'FORM_FAILURE';
            this._onFormFailureData = this.formSpec.onFormFailureExecute();
            this._state = 'ON_FORM_FAILURE_COMPLETED';
            this.nextForm = this.formSpec.nextFormOnFailure;
            this._message = this.formSpec.messageOnFailure;
        }

        return Promise.resolve( {
            state: this._state,
            status: this._state.includes( 'FAILURE' ) ? 'failure' : 'success',
            message: this._message,
            nextForm: this.nextForm,
            onFormSuccessData: this._onFormSuccessData,
            onFormFailureData: this._onFormFailureData
        } );
    }

    async broadcastFormData( ) { 
        // broadcast form data to parent window
        window.parent.postMessage( JSON.stringify( {
            nextForm: this.nextForm,
            formData: this.formData,
            onFormSuccessData: this._onFormSuccessData,
            onFormFailureData: this._onFormFailureData,
            state: this._state
        } ), '*' );
    }

    async submit() {
        // submit form data to server
        const response = await fetch( this.formSpec.submissionURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( this.formData )
        } );
        const data = await response.json();
        if ( data.status === 'success' ) {
            this._state = 'ON_SUBMIT_SUCCESS';
        }else {
            this._state = 'ON_SUBMIT_FAILURE';
        }

        return data;
    }
}
