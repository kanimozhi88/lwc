import { LightningElement,wire,track  } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import fetchOpportunity from "@salesforce/apex/DisplayDataInDatatable.fetchOpportunity";
import updateOpportunityStage from "@salesforce/apex/DisplayDataInDatatable.updateOpportunityStage";


const columns = [
    { label: 'Opportunity name', fieldName: 'Name', type: 'text' },
    {
        label: 'Amount',
        fieldName: 'Amount',
        type: 'currency'
    },
    { label: 'Stage', fieldName: 'StageName', type: 'text' },
    { label: 'Closed Date', fieldName: 'CloseDate', type: 'date' },
];
export default class DisplayOppDatatable extends LightningElement {


@track searchText = ''
@track opportunity
columns = columns
selectedOpp = []
selectedRows = []
isLoading = true
@track refreshedData = []


// Fetching the opportunity list
@wire(fetchOpportunity,{searchText:'$searchText'})
wiredOpportunity(result){
// putting all the result to one variable for refresh 
    this.refreshedData = result 
    if(result.data){
// opportunity variable will contain the data that we are recieving
        this.opportunity = result.data
    }
    else if(result.error){
        console.log('Error fetching opportunities',error)
    }
}




// handle behing onchange for search box
handleChange(event){
this.searchText = event.target.value
}
// to handle the records that we are selecting
handleRowSelection(event){
    this.selectedOpp = [...event.detail.selectedRows]
}


handleClick(){
     if(this.selectedOpp.length == 0){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please select atleast one opportunity',
                    variant: 'error'
                })
            );
        }
else{
  for (let i = 0; i < this.selectedOpp.length; i++) 
  {
    this.selectedRows.push(this.selectedOpp[i].Id)  
  }
     updateOpportunityStage({selectedOppIds: this.selectedRows}).then(() => {
                refreshApex(this.refreshedData)
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Opportunity updated successfully',
                        variant: 'success'
                    })
                );
               
            })
            .catch((error) => {
                console.log(error)
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.statusText + '-' + error.message,
                        variant: 'error'
                    })
                );
            })
}
}


}