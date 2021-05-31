import axios from "axios";
const CancelToken = axios.CancelToken;
import { v4 as uuidv4 } from 'uuid';

export default function(inp, options) {
    var sessionToken = null;
    var currentFocus;
    var cancelRequest;
    var cancelPlaceRequest;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", async function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if(!sessionToken) sessionToken = uuidv4();
        if(cancelRequest) cancelRequest();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        const center = options.component._map.getCenter();
        const res = await axios.get('https://rsapi.goong.io/Place/Autocomplete', {
          cancelToken: new CancelToken(function executor(c) {
              cancelRequest = c;
          }),
          params: {
            session_token: sessionToken,
            api_key: options.apiKey,
            input: this.value,
            location: `${center.lat},${center.lng}`
          }
        });
        res.data.predictions.map(pre =>{
          b = document.createElement("DIV");
          b.innerHTML = `<strong>${pre.structured_formatting.main_text}</strong>`;
          b.innerHTML += `<br/>${pre.structured_formatting.secondary_text}`
          b.addEventListener("click", function(e) {
              closeAllLists();
              openPlace(pre.place_id);
          });
          a.appendChild(b);
        });
    });
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    async function openPlace(placeId) {
      if(cancelPlaceRequest) cancelPlaceRequest();
      const res = await axios.get('https://rsapi.goong.io/Place/Detail', {
        cancelToken: new CancelToken(function executor(c) {
            cancelPlaceRequest = c;
        }),
        params: {
          session_token: sessionToken,
          api_key: options.apiKey,
          place_id: placeId
        }
      });
      sessionToken = null;

      options.component.onSearch(res.data.result);
      options.component.flyTo({
        name: res.data.result.name,
        description: res.data.result.formatted_address,
        fixOffset: 0,
        lngLat: [res.data.result.geometry.location.lng,res.data.result.geometry.location.lat] 
      });
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}
