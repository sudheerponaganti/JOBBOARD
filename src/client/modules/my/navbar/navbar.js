import LightningElementWithBootstrap from '../../lib/lightningElementWithBootstrap'
import {api} from "lwc"
export default class Navbar extends LightningElementWithBootstrap {
 @api showBtn = false;
    backtoJobsHandler(){
        let evt = new CustomEvent('back')
         this.dispatchEvent(evt);
    }
}
