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

        var header = this.#table.insertRow(0);
        header.insertCell(0).innerHTML = "timestamp";
        header.insertCell(1).innerHTML = "data";

        for (var i = 0; i < 10; i++){
            this.timestamps.push(i);
            this.data.push(i / 2);
        }

        this.displayTable({lookfor: null});

        this.#filterForm.addEventListener("submit", (event) => {
            console.log(this.#filterForm["lookfor"]);
            //this.displayTable({ lookfor: this.#filterForm["lookfor"].innerHTML });
            this.resetTable();
            //await new Promise(r => setTimeout(r, 2000));
            event.preventDefault();
        });
    }

    resetTable() {
        for (var i = 0; i < this.#table.rows.length; i++){
            this.#table.deleteRow(-1);
        }
    }

    addRow(timestamp, data) {
        var row = this.#table.insertRow(-1);
        row.insertCell(0).innerHTML = timestamp;
        row.insertCell(1).innerHTML = data;
    }

    displayTable(filters) {
        this.resetTable();
        for (var i = 0; i < this.timestamps.length; i++){
            if (filters.lookfor == null || filters.lookfor == this.data[i]) {
                this.addRow(this.timestamps[i], this.data[i]);  
            }
        }
    }
}