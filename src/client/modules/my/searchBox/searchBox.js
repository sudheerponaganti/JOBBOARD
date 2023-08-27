import LightningElementWithBootstrap from '../../lib/lightningElementWithBootstrap'
import {api} from 'lwc'
export default class SearchBox extends LightningElementWithBootstrap {
 _searchFields ={};
    @api 
    get searchFields(){
     return this._searchFields;
    }

    set searchFields(data){
     this._searchFields = JSON.parse(JSON.stringify(data))
    }
    changeHandler(event){
          const {name, value, checked} = event.target;
          if(name === "fulltime"){
            this.searchFields[name] = checked;
          }else{
            this.searchFields[name] = value;
          }
          
          
    }

    searchHandler(){
        const evt = new CustomEvent("filtersearch",{
           detail : this.searchFields
        });
        this.dispatchEvent(evt);
    }
}
