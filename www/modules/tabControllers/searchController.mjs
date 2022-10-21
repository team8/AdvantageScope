import { TableController } from "./tableController.mjs";

export class testTab{
    #content = null;
    #table = null;
    #tableContainer = null;
    #filterForm = null;

    timestamps = [];
    data = [];
    
    constructor(content) {
        this.#content = content;
        console.log(content.children);
        this.#tableContainer = content.getElementsByClassName("test-table-container")[0];
        this.#table = this.#tableContainer.getElementsByClassName("test-table")[0];
        this.#filterForm = this.#content.getElementsByClassName("filters-container")[0];
        console.log(this.#filterForm.children);
        console.log((this.#table.nodeName));

        this.resetTable();

        for (var i = 0; i < 10; i++){
            this.timestamps.push(i);
            this.data.push((i/2).toString());
        }

        this.displayTable({lookfor: null});

        this.#filterForm.addEventListener("submit", (event) => {
            var input = this.#filterForm["lookfor"].value;
            console.log(input);
            this.resetTable();
            if (input.length == 0) {
                this.displayTable({ lookfor: null });
            } else {
                this.displayTable({ lookfor: input });
            }
            //await new Promise(r => setTimeout(r, 2000));
            event.preventDefault();
        });
    }

    resetTable() {
        this.#table.innerHTML = "";
        var row = this.#table.insertRow(0);
        row.insertCell(0).innerHTML = "timestamp";
        row.insertCell(1).innerHTML = "data";
    }

    addRow(timestamp, data) {
        var row = this.#table.insertRow(-1);
        row.insertCell(0).innerHTML = timestamp;
        row.insertCell(1).innerHTML = data;
    }

    displayTable(filters) {
        this.resetTable();
        console.log(filters);
        for (var i = 0; i < this.timestamps.length; i++){
            //console.log(i);
            if (filters.lookfor == null || filters.lookfor == this.data[i]) {
                //console.log("add");
                this.addRow(this.timestamps[i], this.data[i]);  
            }
        }
    }
}