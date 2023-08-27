import LightningElementWithBootstrap from '../../lib/lightningElementWithBootstrap'
import { api } from "lwc"
import { dateFormatter } from '../../utils/utils';
export default class JobDescription extends LightningElementWithBootstrap {
    @api selectedJob = {}

    get formattedDate() {
        return dateFormatter(this.selectedJob.created);
    }
    get contractType() {
        return this.selectedJob.contract_time === "full_time" ? "Full Time" : "Contract";
    }
    
    /* get formatDescriptionHeading() {
         return this.selectedJob.description.split(':')[0];
     } */

    get formattedDescription() {
        return this.selectedJob.description.split('.');
    }

}
