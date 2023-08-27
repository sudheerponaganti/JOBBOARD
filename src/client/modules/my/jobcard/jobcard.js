import LightningElementWithBootstrap from '../../lib/lightningElementWithBootstrap'
import {api} from "lwc"
import { dateFormatter } from '../../utils/utils';
export default class Jobcard extends LightningElementWithBootstrap {
  @api job= {};
  
  get formattedDate(){
    return dateFormatter(this.job.created);
  }
  get contractType(){
      return this.job.contract_time === "full_time" ? "Full Time" : "Contract";
  }

viewDetailHandler(){
    let evt = new CustomEvent('selected', {
       detail : this.job
    })
    this.dispatchEvent(evt);
}

}