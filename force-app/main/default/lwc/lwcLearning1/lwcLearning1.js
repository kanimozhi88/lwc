import { LightningElement, track } from 'lwc';

export default class LwcLearning1 extends LightningElement {
name = "LWC";
@track obj={
city:'mdu',
age:12
}
changeHandler(event){
    this.name = event.target.value;
}
trackHandler(event)
{
this.obj= {...this.obj,"city":event.target.value}
}
}