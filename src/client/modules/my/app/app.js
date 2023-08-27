import LightningElementWithBootstrap from '../../lib/lightningElementWithBootstrap'
// const JOOBLE_API_KEY = '93f7130a-e8f8-4c01-a905-5862085353ae'
// const JOOBLE_URL = 'https://jooble.org/api/'
const ADZUNE_URL = 'https://api.adzuna.com/v1/api/jobs/in/search/'
const ADZUNE_APP_Id = '6c0342d1'
const ADZUNE_APP_KEY = 'a0c22c0b827312afb3fe66aa6c15b3a0'
export default class App extends LightningElementWithBootstrap {
    title_only = '';
    location = '';
    numberOfPages = 1;
    results_per_page = 50;
    full_time = 0;
    fulltime= false;
    part_time= 0;
    selectedJob = false;
     jobs = [];
     searchFields = {
        description : this.title_only,
        location : this.location,
        fulltime : this.fulltime
    }
    isJobBoardLoading = true;
    isJobBoardError = false;
    isJobBoardResult= false;
    connectedCallback(){
        this.fetchJobs();
    }

    fetchJobs() {

        // fetch for Jooble Api
        /* const url = `${JOOBLE_URL}${JOOBLE_API_KEY}`;
         fetch(url, {
             method: "POST",
            headers: {
              "Content-Type": "application/json"
                     },
            body: JSON.stringify({
                  keywords: this.description,
                   location: this.location
                     })
          }).then(response=> response.json())
          .then(result => console.log(result))
          .catch(error => console.error(error)) */

        let url = `${ADZUNE_URL}${this.numberOfPages}?app_id=${ADZUNE_APP_Id}&app_key=${ADZUNE_APP_KEY}`;

        if (this.results_per_page) {
            url = `${url}&results_per_page=${this.results_per_page}`
        }
        if (this.title_only) {
            url = `${url}&title_only=${this.title_only}`
        }
        if (this.location) {
            url = `${url}&location0=${this.location}`
        }
        if(this.full_time){
            url = `${url}&full_time=${this.full_time}`
        }
        if(this.part_time){
            url = `${url}&part_time=${this.part_time}`
        }
        // console.log(url);
        fetch(url, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                this.jobs = data.results;
                this.isJobBoardError = false; 
                this.isJobBoardLoading = false;
                this.isJobBoardResult= true;
                
             })
            .catch(() =>{ 
                this.isJobBoardLoading = false;
                this.isJobBoardResult= false;
                this.isJobBoardError = true;  
            })
    }


    selectedJobHandler(event){
      this.selectedJob = event.detail;
    }
    backToJobHandler(){
        this.selectedJob = false;
        this.searchFields = {...this.searchFields, "description" : this.title_only, "location" : this.location, "fulltime": this.fulltime};
        //  console.log(this.searchFields);
    }

    searchHandler(event){
        this.title_only = event.detail.description;
        this.location = event.detail.location;
        this.full_time = event.detail.fulltime === true ? 1 : 0;
        this.part_time = event.detail.fulltime === false ? 1 : 0;
        this.fulltime= event.detail.fulltime;
        this.isJobBoardLoading = true;
        this.isJobBoardResult= false;
        this.isJobBoardError = false;
        this.fetchJobs();
    }

    backHandler(){
        this.title_only = '';
        this.location = '';
        this.full_time = 0;
        this.part_time = 0;
        this.isJobBoardLoading = true;
        this.isJobBoardResult= false;
        this.isJobBoardError = false;
        this.fetchJobs();
    }

}

